const database = require('../services/database.js');
const sqlString = require('../utils/sqlString.js');

const baseQuery =
 `SELECT *
  FROM RECIPES
  WHERE RID = 'rmK12Uau.ntP510KeImX506H6Mr6jTu' OR RID = '5ZpZE8hSVdPk2ZXo1mZTyoPWJRSCPSm'
  `;


  String.prototype.replaceAll = function(search, replacement) {
      var target = this;
      return target.replace(new RegExp(search, 'g'), replacement);
  };


/*
 * Get instructions associated with a given recipe rid
 * REQUIRES update for long form instructions--questions to answer
 * 1. How to identify when multiple globs are required for an instruction set
 * 2. How to combine them (1 is hard 2 is easy)
 *
 * Ultimately, should return instructions as string, rather than array of objects
 */
async function instructions(rid) {
    let query = `SELECT dbms_lob.substr(INSTRUCTIONS,2000,1) AS instructions
    FROM RECIPES
    WHERE RID='` + rid + `'`;
    const result = await database.simpleExecute(query);

    return result.rows[0].INSTRUCTIONS;
}

async function find(context) {
  let query = baseQuery;
  const binds = {};

  const result = await database.simpleExecute(query, binds);

  return result.rows;
}

/*
 * Gets all recipes (names and ids) from recipe
 */
async function getAll() {
  let query = `SELECT Title, RID FROM RECIPES`;
  const result = await database.simpleExecute(query, {});

  return result.rows;
}

async function getAllRecipeNames() {
  let query = `SELECT DISTINCT TRIM(Title) AS Title FROM RECIPES`;
  const result = await database.simpleExecute(query, {});
  return result.rows;
}


const wrapRecipeQueryWithImages =function(subquery) {
    let query = `SELECT Q.TITLE AS TITLE, Q.RID AS RID, Z.LINK AS PICTURE_LINK FROM `;
    let subqueryWrapped = `(` + subquery + `) Q`;
    query += subqueryWrapped;
    query = query + ` LEFT JOIN IMAGES Z ON Z.RID = Q.RID`;

    return query;
}

// original query: let query = `SELECT Title, dbms_lob.substr(INSTRUCTIONS,2000,1),` +
//   `dbms_lob.substr(INSTRUCTIONS,2000,2001) FROM RECIPES WHERE Title LIKE '` + name + `%'` +
//   ` AND ROWNUM <= ` + count;
//   ` AND ROWNUM <= ` + count;
//   SELECT Title, RID, PICTURE_LINK FROM RECIPES WHERE Title LIKE 'Chocolate%' AND ROWNUM <= 20
async function getByName(name, count) {
    let fixName = name.replaceAll(`'`, `''`);
    let subquery = `SELECT Title, RID FROM RECIPES WHERE Title LIKE '` + fixName + `%'` +
    ` AND ROWNUM <= ` + count;
    let query = wrapRecipeQueryWithImages(subquery);
    // console.log(query);
    const result = await database.simpleExecute(query, {});

    return result.rows;
}

// gets string that matches specific ingredient
const ingredientMatchString = function(id) {
    let query = `SELECT RID FROM INGREDIENTS WHERE USDA_ID=` + id;

    return query;
}

// gets recipes that contain all ingredients in a list of ingredient ids
// benchmark current performance
async function getByIngredientsAnd(id) {
    let subquery = '';
    for (let i = 0; i < id.length; i++) {
        subquery += ingredientMatchString(id[i]);
        if (i < id.length - 1) {
            subquery += ` INTERSECT `;
        }
    }
    let outerSubquery = `SELECT R.RID, R.TITLE, R.PICTURE_LINK FROM RECIPES R WHERE R.RID IN (` + subquery + `)`;
    let query = wrapRecipeQueryWithImages(outerSubquery);
    const result = await database.simpleExecute(query, {});
    // console.log(query);

    return result.rows;
}


// query ingredients by OR, sort ingredients by the count
// of how many ingredients matched

async function getMostRelevantByIngredients(id) {
    let idString = '(';
    for (let i = 0; i < id.length; i++) {
        idString += id[i];
        if (i < (id.length - 1)) {
            idString += ', ';
        }
    }
    idString += ')';
    let subquery = `SELECT RID, P.TITLE FROM` +
    ` (SELECT RID, R.TITLE AS TITLE, R.PICTURE_LINK AS PICTURE_LINK, COUNT(RID) AS COUNT ` +
    `FROM INGREDIENTS I NATURAL JOIN RECIPES R ` +
    `WHERE I.USDA_ID IN` + idString + ' GROUP BY RID, R.TITLE, R.PICTURE_LINK ORDER BY COUNT DESC) P WHERE ROWNUM <=50';
    let query = wrapRecipeQueryWithImages(subquery);
    // console.log(query);
    const result = await database.simpleExecute(query, {});

    return result.rows;
}

// consider caching on first search with a specific fridge
// current variant --- query takes an average of 38 seconds
async function getByIngredientsOr(id) {
    const idString = sqlString.numString(id);
    let subquery = `SELECT RID, R.TITLE ` +
    `FROM INGREDIENTS I NATURAL JOIN RECIPES R ` +
    `WHERE I.USDA_ID IN` + idString + 'AND ROWNUM <=50';
    let query = wrapRecipeQueryWithImages(subquery);
    const result = await database.simpleExecute(query, {});

    return result.rows;
}

// gets recipes with at least one ingredient with high level of protein
async function getExtremeNutrient(name, count, nutrient, amount, direction) {
  let fixName = name.replaceAll(`'`, `''`);
  // console.log(fixName);
  let subquery = `SELECT Title, RID FROM
                  (SELECT DISTINCT Title, RID
                  FROM RECIPES r
                  WHERE RID IN
                  (SELECT RID FROM INGREDIENTS i
                  NATURAL JOIN
                  (SELECT USDA_ID, ` + nutrient + `
                  FROM USDA) u
                  WHERE u.` + nutrient + ` ` + direction + `
                  (SELECT PERCENTILE_CONT(` + amount + `) WITHIN GROUP
                   (order by PROTEIN) FROM USDA))
                  AND Title LIKE '` + fixName + `%')
                  WHERE ROWNUM <= ` + count;
  // console.log(subquery);
  let query = wrapRecipeQueryWithImages(subquery);
  const result = await database.simpleExecute(query, {});

  return result.rows;
}


// gets recipes with at least one ingredient with high level of protein
async function getLowSugar(name, count) {
  let subquery = `SELECT DISTINCT Title, RID
                  FROM
                  RECIPES r
                  WHERE RID IN
                  (SELECT RID FROM INGREDIENTS i
                  NATURAL JOIN
                  (SELECT USDA_ID, SUGAR
                  FROM USDA) u
                  WHERE u.SUGAR < 1)
                  AND ROWNUM <= 10`;
  let query = wrapRecipeQueryWithImages(subquery);
  const result = await database.simpleExecute(query, {});
  return result.rows;
}

// returns a set of 50 random recipes
async function getRandom() {
  let subquery = `SELECT RID, TITLE FROM   (SELECT RID, TITLE FROM recipes ORDER BY DBMS_RANDOM.VALUE)
    WHERE  rownum < 51`;
  let query = wrapRecipeQueryWithImages(subquery);
  // console.log(query);
  const result = await database.simpleExecute(query, {});

return result.rows;
}

module.exports.getByIngredientsAnd = getByIngredientsAnd;
module.exports.find = find;
module.exports.instructions = instructions;
module.exports.getByName = getByName;
module.exports.getByIngredientsOr = getByIngredientsOr;
module.exports.getExtremeNutrient = getExtremeNutrient;
module.exports.getLowSugar = getLowSugar;
module.exports.getRandom = getRandom;
module.exports.getMostRelevantByIngredients = getMostRelevantByIngredients;
module.exports.getAll = getAll;
module.exports.getAllRecipeNames = getAllRecipeNames;
