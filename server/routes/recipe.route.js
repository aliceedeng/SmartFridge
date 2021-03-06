import express from 'express';
require('dotenv').config();

const router = express.Router();
const recipes = require('../controllers/recipe.controller.js');

router.route('/rid/:rid')
   .get(recipes.getById);

router.route('/name/:name')
  .get(recipes.getByName);

router.route('/include')
  .get(recipes.getByIngredientsOr);

// get recipe nutrition facts -- not functional yet
// expects id query (may be multiple)
router.route('/facts')
	.get(recipes.getFacts);

router.route('/relevant')
	.get(recipes.getMostRelevantByIngredients);

router.route('/normrelevant')
    .get(recipes.getMostRelevantNormalizedByIngredients);

// route for retrieving recipes by anding ingredient ids
router.route('/exclude')
    .get(recipes.getByIngredientsAnd);

router.route('/protein/:name')
  .get(recipes.getHighProtein);

router.route('/cholesterol/:name')
    .get(recipes.getLowCholesterol);

router.route('/sugar/:name')
  .get(recipes.getLowSugar);

router.route('/calories/:name')
    .get(recipes.getLowCalories);

router.route('/sodium/:name')
    .get(recipes.getLowSodium);

router.route('/random/')
  .get(recipes.getRandom);

export default router;
