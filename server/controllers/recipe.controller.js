const fuzzysort = require('fuzzysort');
const recipe = require('../db/recipe.js');
const ingredient  = require('../db/ingredient.js');
const factUtils = require('../utils/factUtils.js');

var allRecipeNames;

// ALL SHOULD BE UPDATED TO HAVE CONSISTENT EMPTY RETURN BEHAVIOR

// helper function to get recipe titles using fuzzy search
async function getRecipeTitlesFuzzy(name, length) {
    if (!allRecipeNames) {
        // we store this to make it more efficient for future queries
        allRecipeNames = await recipe.getAllRecipeNames();
    }

    var query_len = 2 * length;
    const options = {
        keys: ['TITLE'],
        limit: query_len, // TODO
        threshold: -10000
    }

    const desiredTitles = fuzzysort.go(name, allRecipeNames, options);

    return desiredTitles;
}

// returns an object representing recipe contents associated with a specific RID
// SHOULD BE UPDATED TO RETURN USDA_IDs associated with each ingredient for fridge matching
export async function getById(req, res, next) {
  try {
    const ings = await ingredient.ridIngredients(req.params.rid);
    const instructions = await recipe.instructions(req.params.rid);
    const output = {
        ingredients: ings,
        instructions: instructions
    };
    if (!req.params.rid) {
        res.status(404).end();
    }
    else {
        res.status(200).json(output);
    }
  } catch (err) {
    next(err);
  }
}

// gets a recipe by name (recipes that start with a particular string)
// SHOULD BE CONVERTED TO FUZZY MATCHING
export async function getByName(req, res, next) {
    try {
        if (req.params.name && req.query.len) {
            const len = parseInt(req.query.len);
            const name = req.params.name;
            var rows = [];
            if (req.query.fuzzy) {
                const desiredTitles = await getRecipeTitlesFuzzy(name, req.query.len);
                var searchLength = Math.min(desiredTitles.length, req.query.len);
                for (var i = 0; i < searchLength; i++) {
                    const thisRecipe = await recipe.getByName(desiredTitles[i][0].target, 1);
                    rows = rows.concat(thisRecipe);
                }
            } else {
                rows = await recipe.getByName(name, len);
            }
            res.status(200).json(rows);
        } else {
            res.status(404).end();
        }
    } catch (err) {
        next(err);
    }
}

// helper function for controllers that manage
// searching by ingredient (intersection or union)
// interfaces with recipe database
async function getByIngredients(type, id) {
  if (!Array.isArray(id)) {
      id = [id];
  }
  if (type === 'and') {
    return await recipe.getByIngredientsAnd(id);
  } else if (type === 'or') {
    return await recipe.getByIngredientsOr(id);
  } else if (type === 'sortedOr') {
    return await recipe.getMostRelevantByIngredients(id);
  } else if (type === 'normOr') {
      return await recipe.getMostRelevantNormalizedByIngredients(id);
  }
}

// computes nutrition facts associated with a given set of recipes
// specifically computes: cholesterol, sugar, calories, protein, sodium
// associated with each recipe id
// returns array of objects with keys (rid, cholesterol, sugar, calories, protein, sodium)
// TODO: May be edited to check whether recipe facts for each recipe
// TODO: have been computed previously and uploads them to a table
// if not...
export async function getFacts(req, res, next) {
    try {
        if (!req.query.id) {
            res.status(404).end();
        }
        let id = req.query.id;
        if (!Array.isArray(id)) {
            id = [id];
        }
        // TODO: Add previous computation check here
        let recipes = {};
        let ingredients = await ingredient.computeFacts(id);
        console.log(ingredients);
        // iterate over returned ingredient array
        for (let i = 0; i < ingredients.length; i++) {
            const ingredient = ingredients[i];
            // add the current recipe to the recipes object if it's not there
            if (!(ingredient.RID in recipes)) {
                recipes[ingredient.RID] = factUtils.initializeFacts(ingredient.RID);
            }
            // update recipe facts with current ingredient if current ingredient isn't -1
            if (ingredient.USDA_ID !== -1) {
                const multiplier = factUtils.getMultiplier(ingredient);
                console.log(multiplier);
                // iterate over facts
                for (let j = 0; j < factUtils.upperFacts.length; j++) {
                    let val;
                    if (ingredient[factUtils.upperFacts[j]]) {
                        val = ingredient[factUtils.upperFacts[j]] * multiplier;
                    } else {
                        val = 0;
                    }
                    recipes[ingredient.RID][factUtils.lowerFacts[j]] += val;
                }
            }
        }
        recipes = Object.values(recipes);
        // TODO: ADD FACTS TABLE UPDATE HERE
        res.status(200).json(recipes);
    } catch (err) {
        next(err);
    }
}

// given a list of ingredient ids, return all recipes that contain
// all ingredients
export async function getByIngredientsAnd(req, res, next) {
    try {
        if (req.query.id) {
            const rows = await getByIngredients('and', req.query.id);
            res.status(200).json(rows);
        } else {
            res.status(404).end();
        }
    } catch (err) {
        next(err);
    }
}

// given a list of ingredient ids, returns all recipes that
// contain at least 1 ingredient
export async function getByIngredientsOr(req, res, next) {
  try {
    if (req.query.id) {
        let rows = await getByIngredients('or', req.query.id);

        //get unique elements
        let rowSet = new Set()

        //console.log(rows);
        for(let item of rows) {
          //console.log(item)
          rowSet.add(item)
        }

        //rows.forEach((item) => rowSet.add(item));
        rows = Array.from(rowSet)

        console.log("hi");

        res.status(200).json(rows);
    } else {
      res.status(404).end();
    }
  } catch (err) {
    next(err);
  }
}

//given a list of ingredient ids, returns all recipes
//that match the most ingredients
export async function getMostRelevantByIngredients(req, res, next) {
  try {
    if (req.query.id) {
        let rows = await getByIngredients('sortedOr', req.query.id);

        res.status(200).json(rows);
    } else {
      res.status(404).end();
    }
  } catch (err) {
    next(err);
  }
}

//given a list of ingredient ids, returns all recipes
//that match the most ingredients
export async function getMostRelevantNormalizedByIngredients(req, res, next) {
    try {
        if (req.query.id) {
            let rows = await getByIngredients('normOr', req.query.id);

            res.status(200).json(rows);
        } else {
            res.status(404).end();
        }
    } catch (err) {
        next(err);
    }
}

/* FILTERED RECIPES */
export async function getHighProtein(req, res, next) {
  try {
    if (req.params.name && req.query.len) {
        const len = parseInt(req.query.len);
        const name = req.params.name;
        //const rows = await recipe.getExtremeNutrient(name, len, 'PROTEIN', 0.9, '>');
        var rows = [];
        if (req.query.fuzzy) {
            if (!allRecipeNames) {
                // we store this to make it more efficient for future queries
                allRecipeNames = await recipe.getAllRecipeNames();
            }

            var query_len = 2 * req.query.len;
            const options = {
                keys: ['TITLE'],
                limit: query_len, // TODO
                threshold: -10000
            }

            const desiredTitles = fuzzysort.go(name, allRecipeNames, options);
            var searchLength = Math.min(desiredTitles.length, req.query.len);
            for (var i = 0; i < searchLength; i++) {
                const thisRecipe = await recipe.getExtremeNutrient(desiredTitles[i][0].target, 1, 'PROTEIN', 0.9, '>');
                rows = rows.concat(thisRecipe);
            }
        } else {
            rows = await recipe.getExtremeNutrient(name, len, 'PROTEIN', 0.9, '>');
        }
        res.status(200).json(rows);
    } else {
        res.status(404).end();
    }
  } catch (err) {
    next(err);
  }
}

export async function getLowSodium(req, res, next) {
    try {
        if (req.params.name && req.query.len) {
            const len = parseInt(req.query.len);
            const name = req.params.name;
            var rows = [];
            if (req.query.fuzzy) {
                const desiredTitles = await getRecipeTitlesFuzzy(name, req.query.len);
                var searchLength = Math.min(desiredTitles.length, req.query.len);
                for (var i = 0; i < searchLength; i++) {
                    const thisRecipe = await recipe.getExtremeNutrient(desiredTitles[i][0].target, 1, 'SODIUM', 0.1, '<');
                    rows = rows.concat(thisRecipe);
                }
            } else {
                rows = await recipe.getExtremeNutrient(name, len, 'SODIUM', 0.1, '<');
            }
            res.status(200).json(rows);
        } else {
            res.status(404).end();
        }
    } catch (err) {
        next(err);
    }
}

export async function getLowCalories(req, res, next) {
    try {
        if (req.params.name && req.query.len) {
            const len = parseInt(req.query.len);
            const name = req.params.name;
            var rows = [];
            if (req.query.fuzzy) {
                const desiredTitles = await getRecipeTitlesFuzzy(name, req.query.len);
                var searchLength = Math.min(desiredTitles.length, req.query.len);
                for (var i = 0; i < searchLength; i++) {
                    const thisRecipe = await recipe.getExtremeNutrient(desiredTitles[i][0].target, 1, 'CAL', 0.1, '<');
                    rows = rows.concat(thisRecipe);
                }
            } else {
                rows = await recipe.getExtremeNutrient(name, len, 'CAL', 0.1, '<');
            }
            res.status(200).json(rows);
        } else {
            res.status(404).end();
        }
    } catch (err) {
        next(err);
    }
}

export async function getLowSugar(req, res, next) {
  try {
      if (req.params.name && req.query.len) {
          const len = parseInt(req.query.len);
          const name = req.params.name;
          var rows = [];
          if (req.query.fuzzy) {
              const desiredTitles = await getRecipeTitlesFuzzy(name, req.query.len);
              var searchLength = Math.min(desiredTitles.length, req.query.len);
              for (var i = 0; i < searchLength; i++) {
                  const thisRecipe = await recipe.getExtremeNutrient(desiredTitles[i][0].target, 1, 'SUGAR', 0.1, '<');
                  rows = rows.concat(thisRecipe);
              }
          } else {
              rows = await recipe.getExtremeNutrient(name, len, 'SUGAR', 0.1, '<');
          }
          res.status(200).json(rows);
      } else {
          res.status(404).end();
      }
  } catch (err) {
      next(err);
  }
}


export async function getLowCholesterol(req, res, next) {
  try {
      if (req.params.name && req.query.len) {
          const len = parseInt(req.query.len);
          const name = req.params.name;
          var rows = [];
          if (req.query.fuzzy) {
              const desiredTitles = await getRecipeTitlesFuzzy(name, req.query.len);
              var searchLength = Math.min(desiredTitles.length, req.query.len);
              for (var i = 0; i < searchLength; i++) {
                  const thisRecipe = await recipe.getExtremeNutrient(desiredTitles[i][0].target, 1, 'CHOLESTEROL', 0.1, '<');
                  rows = rows.concat(thisRecipe);
              }
          } else {
              rows = await recipe.getExtremeNutrient(name, len, 'CHOLESTEROL', 0.1, '<');
          }
          res.status(200).json(rows);
      } else {
          res.status(404).end();
      }
  } catch (err) {
      next(err);
  }
}

// returns a set of 50 random recipes
export async function getRandom(req, res, next) {
  try {
    const rows = await recipe.getRandom();
    res.status(200).json(rows);
  } catch (err) {
    next(err);
  }
}
