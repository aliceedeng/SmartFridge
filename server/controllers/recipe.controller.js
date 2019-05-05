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


const factUtils = require('../utils/factUtils.js');

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
  } else if (type === 'sortedOr') {
    return await recipe.getMostRelevantByIngredients(id);
  }
}

// computes nutrition facts associated with a given set of recipes
// specifically computes: cholesterol, sugar, calories, protein, sodium
// associated with each recipe id
// returns array of objects with keys (rid, cholesterol, sugar, calories, protein, sodium)
// TODO: May be edited to check whether recipe facts for each recipe
// TODO: have been computed previously and uploads them to a table
// if not...
export async function getFacts(req, res, next) {
    try {
        if (!req.query.id) {
            res.status(404).end();
        }
        let id = req.query.id;
        if (!Array.isArray(id)) {
            id = [id];
        }
        // TODO: Add previous computation check here
        let recipes = {};
        let ingredients = await ingredient.computeFacts(id);
        console.log(ingredients);
        // iterate over returned ingredient array
        for (let i = 0; i < ingredients.length; i++) {
            const ingredient = ingredients[i];
            // add the current recipe to the recipes object if it's not there
            if (!(ingredient.RID in recipes)) {
                recipes[ingredient.RID] = factUtils.initializeFacts(ingredient.RID);
            }
            // update recipe facts with current ingredient if current ingredient isn't -1
            if (ingredient.USDA_ID !== -1) {
                const multiplier = factUtils.getMultiplier(ingredient);
                console.log(multiplier);
                // iterate over facts
                for (let j = 0; j < factUtils.upperFacts.length; j++) {
                    let val;
                    if (ingredient[factUtils.upperFacts[j]]) {
                        val = ingredient[factUtils.upperFacts[j]] * multiplier;
                    } else {
                        val = 0;
                    }
                    recipes[ingredient.RID][factUtils.lowerFacts[j]] += val;
                }
            }
        }
        recipes = Object.values(recipes);
        // TODO: ADD FACTS TABLE UPDATE HERE
        res.status(200).json(recipes);
    } catch (err) {
        next(err);
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
        let rows = await getByIngredients('or', req.query.id);

        //get unique elements
        let rowSet = new Set()

        //console.log(rows);
        for(let item of rows) {
          //console.log(item)
          rowSet.add(item)
        }

        //rows.forEach((item) => rowSet.add(item));
        rows = Array.from(rowSet)

        console.log("hi");

        res.status(200).json(rows);
    } else {
      res.status(404).end();
    }
  } catch (err) {
    next(err);
  }
}

//given a list of ingredient ids, returns all recipes
//that match the most ingredients
export async function getMostRelevantByIngredients(req, res, next) {
  try {
    if (req.query.id) {
        let rows = await getByIngredients('sortedOr', req.query.id);

        //get unique elements
        //let rowSet = new Set()

        //console.log(rows);
        //for(let item of rows) {
          //console.log(item)
          //rowSet.add(item)
        //}

        //rows.forEach((item) => rowSet.add(item));
        //rows = Array.from(rowSet)

        console.log("hi");

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
