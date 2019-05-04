const recipe = require('../db/recipe.js');
const ingredient  = require('../db/ingredient.js');

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

export async function getByName(req, res, next) {
  try {
    var len = parseInt(req.query.len);
    var name = req.params.name;

    const rows = await recipe.getByName(name, len);

    if (req.params.id) {
      if (rows.length === 1) {
        res.status(200).json(rows[0]);
      } else {
        res.status(404).end();
      }
    } else {
      res.status(200).json(rows);
    }
  } catch (err) {
    next(err);
  }
}

// given a list of ingredient ids, returns all recipes that
// contain at least 1 ingredient
export async function getByIngredientsOr(req, res, next) {
  try {
    let id = req.query.id;
    if (!Array.isArray(id)) {
      id = [id];
    }
    const rows = await recipe.getByIngredientsOr(id);

    if (req.params.id) {
      if (rows.length === 1) {
        res.status(200).json(rows[0]);
      } else {
        res.status(404).end();
      }
    } else {
      res.status(200).json(rows);
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
