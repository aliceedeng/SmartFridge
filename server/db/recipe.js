const database = require('../services/database.js');

const baseQuery =
 `SELECT *
  FROM RECIPES
  WHERE RID = 'rmK12Uau.ntP510KeImX506H6Mr6jTu' OR RID = '5ZpZE8hSVdPk2ZXo1mZTyoPWJRSCPSm'
  `;

async function find(context) {
  let query = baseQuery;
  const binds = {};

  const result = await database.simpleExecute(query, binds);

  return result.rows;
}

async function getByName(name) {
  let query = `SELECT Title, dbms_lob.substr(INSTRUCTIONS,10000,1) FROM RECIPES WHERE Title LIKE '` + name + `%'`;

  console.log(query);

  const result = await database.simpleExecute(query, {});
  return result.rows;
}

module.exports.find = find;
module.exports.getByName = getByName;
