// NOTE: WHENEVER SELECTING INGREDIENT BY NAME FROM USDA--TRIM BEFORE RETURNING
const database = require('../services/database.js');
const sqlString  = require('../utils/sqlString.js');

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

// return all nutrition facts associated with a set of recipes
async function computeFacts(rid) {
  const ridList = sqlString.strString(rid);
  let query = `SELECT TRIM(I.RID) AS RID, I.QTY AS QTY, TRIM(I.UNIT) AS UNIT, U.CAL AS CALORIES, ` +
      `U.HWT_1 AS GP1, U.HWT_2 AS GP2, TRIM(U.HOUSE_2) AS AM2, TRIM(U.HOUSE_1) AS AM1, ` +
      `U.PROTEIN AS PROTEIN, U.SUGAR AS SUGAR, U.SODIUM AS SODIUM, U.CHOLESTEROL AS CHOLESTEROL ` +
      `FROM (SELECT RID, USDA_ID, QTY, UNIT FROM INGREDIENTS WHERE RID IN ` + ridList + `) I NATURAL JOIN ` +
      `USDA U`;
  console.log(query);
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
module.exports.computeFacts = computeFacts;
