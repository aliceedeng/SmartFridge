import Fuse from 'fuse.js';

const recipe = require('../db/recipe.js');
const ingredient  = require('../db/ingredient.js');

const fuseOptions = {
    shouldSort: true,
    tokenize: true, // not sure about this one
    findAllMatches: false, // not sure about this one
    threshold: 1.0,
    location: 1,
    distance: 1000,
    maxPatternLength: 64,
    minMatchCharLength: 1,
    keys: [
        'Title'
    ]
};
const fuzzy = true;
const getAll = true;


// ALL SHOULD BE UPDATED TO HAVE CONSISTENT EMPTY RETURN BEHAVIOR

// returns an object representing recipe contents associated with a specific RID
// SHOULD BE UPDATED TO RETURN USDA_IDs associated with each ingredient for fridge matching
export async function getById(req, res, next) {
  try {
    const ings = await ingredient.ridIngredients(req.params.rid);
    const instructions = await recipe.instructions(req.params.rid);
    const output = {
        ingredients: ings,
        instructions: instructions
    };
    if (!req.params.rid) {
        res.status(404).end();
    }
    else {
      res.status(200).json(output);
    }
  } catch (err) {
    next(err);
  }
}

// gets a recipe by name (recipes that start with a particular string)
// SHOULD BE CONVERTED TO FUZZY MATCHING
export async function getByName(req, res, next) {
  try {
    let name = req.params.name;
    const len = parseInt(req.query.len);
    name = name.toLowerCase();
    let rows = [];
    if (getAll) {
        rows = await recipe.getAll();
    } else {
        rows = await recipe.getByName(name, len);
    }
    if (fuzzy) {
        const fuseObj = new Fuse(rows, fuseOptions);
        rows = fuseObj.search(name);
    }
    if (rows.length > len) {
        rows = rows.slice(0, len);
    }

    if (req.params.name) {
      if (rows.length === 1) {
          res.status(200).json(rows[0]);
      }
      res.status(200).json(rows);
    } else {
      res.status(404).end();
    }
  } catch (err) {
    next(err);
  }
}

// helper function for controllers that manage
// searching by ingredient (intersection or union)
// interfaces with recipe database
async function getByIngredients(type, id) {
  if (!Array.isArray(id)) {
      id = [id];
  }
  if (type === 'and') {
    return await recipe.getByIngredientsAnd(id);
  } else if (type === 'or') {
    return await recipe.getByIngredientsOr(id);
  }
}

// given a list of ingredient ids, return all recipes that contain
// all ingredients
export async function getByIngredientsAnd(req, res, next) {
    try {
        if (req.query.id) {
            const rows = await getByIngredients('and', req.query.id);
            res.status(200).json(rows);
        } else {
            res.status(404).end();
        }
    } catch (err) {
        next(err);
    }
}

// given a list of ingredient ids, returns all recipes that
// contain at least 1 ingredient
export async function getByIngredientsOr(req, res, next) {
  try {
    if (req.query.id) {
        const rows = await getByIngredients('or', req.query.id);
        res.status(200).json(rows);
    } else {
      res.status(404).end();
    }
  } catch (err) {
    next(err);
  }
}

export async function getHighProtein(req, res, next) {
  try {
    const rows = await recipe.getHighProtein();
    res.status(200).json(rows);
  } catch (err) {
    next(err);
  }
}

export async function getRandom(req, res, next) {
  try {
    const rows = await recipe.getRandom();
    res.status(200).json(rows);
  } catch (err) {
    next(err);
  }
}
