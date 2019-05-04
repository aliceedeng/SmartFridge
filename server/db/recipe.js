const database = require('../services/database.js');

const baseQuery =
 `SELECT *
  FROM RECIPES
  WHERE RID = 'rmK12Uau.ntP510KeImX506H6Mr6jTu' OR RID = '5ZpZE8hSVdPk2ZXo1mZTyoPWJRSCPSm'
  `;

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


// original query: let query = `SELECT Title, dbms_lob.substr(INSTRUCTIONS,2000,1),` +
//   `dbms_lob.substr(INSTRUCTIONS,2000,2001) FROM RECIPES WHERE Title LIKE '` + name + `%'` +
//   ` AND ROWNUM <= ` + count;
//   ` AND ROWNUM <= ` + count;
//   BUG: UPDATE TO TRANSFORM PICTURE_LINK HASH TO TRUE PICTURE LINK
async function getByName(name, count) {
  let query = `SELECT Title, RID, PICTURE_LINK FROM RECIPES WHERE Title LIKE '` + name + `%'` +
   ` AND ROWNUM <= ` + count;

  const result = await database.simpleExecute(query, {});

return result.rows;
}
// consider caching on first search with a specific fridge
// this doesn't work for some reason
async function getByIngredientsOr(id) {
    let idString = '(';
    for (let i = 0; i < id.length; i++) {
        idString += `'` + id[i] + `'`;
        if (i < (id.length - 1)) {
            idString += ',';
        }
    }
    idString += ')';
    let query = `SELECT DISTINCT(R.RID, R.TITLE, R.PICTURE_LINK) ` +
    `FROM INGREDIENTS I NATURAL JOIN RECIPES R ` +
    `WHERE I.USDA_ID IN` + idString;

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
module.exports.instructions = instructions;
module.exports.getByName = getByName;
module.exports.getByIngredientsOr = getByIngredientsOr;
module.exports.getHighProtein = getHighProtein;
module.exports.getRandom = getRandom;
