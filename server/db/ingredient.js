const database = require('../services/database.js');

const baseQuery =
 `select *
  from ingredients`;

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

module.exports.find = find;
module.exports.getByName = getByName;
