import Fuse from 'fuse.js';

const ingredient = require('../db/ingredient.js');

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
        'NAME'
    ]
};
const fuzzy = true;
const getAll = true;


/*
 * Deprecated maybe in place of getFacts?
 */
export async function get(req, res, next) {
  try {
    const context = {};

    context.id = parseInt(req.params.id, 10);

    const rows = await ingredient.find(context);

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

/*
 * Returns a json object containing nutritional facts for a single
 * ingredient given the id of that ingredient
 *
 * NOTE: SHOULD BE UPDATED TO HANDLE NO-MATCH SEARCHES APPROPRIATELY
 */
export async function getFacts(req, res, next) {
  try {
    let id = req.params.id;
    id = parseInt(id);
    const facts = await ingredient.getFacts(id);
    if (facts.length !== 0) {
      res.status(200).json(facts[0]);
    } else {
      res.status(404).end();
    }
  } catch (err) {
    next(err);
  }
}
/*
 * Returns array of ingredients as {'name', 'USDA_ID'} objects
 *
 * Should be updated to handle no-match searches appropriately
 */
export async function getByName(req, res, next) {
  try {
    let name = req.params.name;
    const len = parseInt(req.query.len);
    name = name.toLowerCase();
    let rows = [];
    if (getAll) {
        rows = await ingredient.getAll();
    } else {
        rows = await ingredient.getByName(name);
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
