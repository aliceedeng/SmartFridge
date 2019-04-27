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

module.exports.find = find;
