// NOTE: WHENEVER SELECTING INGREDIENT BY NAME FROM USDA--TRIM BEFORE RETURNING
const database = require('../services/database.js');

const baseQuery =
 `select *
  from ingredients`;

/*
 * Returns the input descriptions (i.e. natural text descriptions) of ingredients
 * associated with a particular recipe
 */
async function ridIngredients(rid) {
  let query = `SELECT INPUT, USDA_ID FROM INGREDIENTS WHERE RID = '` + rid + `'`;
  const result = await database.simpleExecute(query, {});

  return result.rows;
}

async function find(context) {
  let query = baseQuery;
  const binds = {};

  if (context.id) {
    binds.ingredient_id = context.id;

    query += `\nwhere id = :ingredient_id`;
  }

  const result = await database.simpleExecute(query, binds);

  return result.rows;
}

/*
 * Gets all ingredients (names and ids) from usda table
 */
async function getAll() {
  let query = `SELECT TRIM(name) AS name, USDA_ID AS id FROM USDA`;
  const result = await database.simpleExecute(query, {});

  return result.rows;
}

// Gets nutrition facts associated with a specific ingredient id from usda table
// specifically returns CAL (in food calories), protein (in grams), sodium (in mg), sugar (grams) per 100grams
// chosterol (mg)
async function getFacts(id) {
    let query = `SELECT CAL, PROTEIN, SUGAR, SODIUM, CHOLESTEROL FROM USDA WHERE USDA_ID=` + id;
    const result = await database.simpleExecute(query, {});

    return result.rows;
}
// Returns ingredients (names and usda_id) that contain a given substring
// from the usda ingredient table
async function getByName(name) {
  let query = `SELECT TRIM(name) AS name, USDA_ID AS id FROM USDA WHERE name LIKE '%` + name + `%'`;

  const result = await database.simpleExecute(query, {});
  
return result.rows;
}

module.exports.getFacts = getFacts;
module.exports.getAll = getAll;
module.exports.ridIngredients = ridIngredients;
module.exports.find = find;
module.exports.getByName = getByName;
