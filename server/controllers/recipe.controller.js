const recipe = require('../db/recipe.js');

export async function getById(req, res, next) {
  try {
    const context = {};

    context.id = parseInt(req.params.id, 10);

    const rows = await recipe.find(context);

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

export async function getByName(req, res, next) {
  try {
    var name = req.params.name;

    const rows = await recipe.getByName(name);

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

export async function getByIngredientsOr(req, res, next) {
  try {
    var id = req.params.id;

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
