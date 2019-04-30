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
  let query = `SELECT Title, dbms_lob.substr(INSTRUCTIONS,2000,1), dbms_lob.substr(INSTRUCTIONS,2000,2001) FROM RECIPES WHERE Title LIKE '` + name + `%'`;

  const result = await database.simpleExecute(query, {});
  return result.rows;
}

// this doesn't work for some reason
async function getByIngredientsOr(id) {
  let query = `SELECT *
               FROM INGREDIENTS
               WHERE ROWNUM <= 2`;

   console.log(query);

   const result = await database.simpleExecute(query, {});
   return result.rows;
}

async function getHighProtein() {
  let query = `SELECT DISTINCT(Title)
                FROM
                RECIPES r
                WHERE RID IN
                (SELECT RID FROM INGREDIENTS i
                NATURAL JOIN
                (SELECT USDA_ID, PROTEIN
                FROM USDA) u
                WHERE u.PROTEIN > 10)
                AND ROWNUM <= 10`;
  console.log(query);

  const result = await database.simpleExecute(query, {});
  return result.rows;
}

async function getRandom() {
  var query = `SELECT * FROM RECIPES WHERE ROWNUM = 1`;

  const result = await database.simpleExecute(query, {});
  return result.rows;
}

module.exports.find = find;
module.exports.getByName = getByName;
module.exports.getByIngredientsOr = getByIngredientsOr;
module.exports.getHighProtein = getHighProtein;
module.exports.getRandom = getRandom;
