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

// route for retrieving recipes by anding ingredient ids
router.route('/exclude')
  .get(recipes.getByIngredientsAnd);

router.route('/protein/:name')
  .get(recipes.getHighProtein);

router.route('/sugar/:name')
  .get(recipes.getLowSugar);

router.route('/random/')
  .get(recipes.getRandom);

// use this for recipe
router.route('/allbyname/')
  .get(recipes.getAllRecipeNames);

export default router;
