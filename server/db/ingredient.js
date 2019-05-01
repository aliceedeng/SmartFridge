const database = require('../services/database.js');

const baseQuery =
 `select *
  from ingredients`;

/*
 * Returns the input descriptions (i.e. natural text descriptions) of ingredients
 * associated with a particular recipe
 */
async function ridIngredients(rid) {
  let query = `SELECT INPUT FROM INGREDIENTS WHERE RID = '` + rid + `'`;
  const result = await database.simpleExecute(query, {});

  return result.rows.map(row => row.INPUT);
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

async function getByName(name) {
  let query = `SELECT name FROM USDA WHERE name LIKE '` + name + `%'`;

  console.log(query);

  const result = await database.simpleExecute(query, {});
  
return result.rows;
}

module.exports.ridIngredients = ridIngredients;
module.exports.find = find;
module.exports.getByName = getByName;
