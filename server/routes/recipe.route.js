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

router.route('/relevant')
	.get(recipes.getMostRelevantByIngredients);

// route for retrieving recipes by anding ingredient ids
router.route('/exclude')
    .get(recipes.getByIngredientsAnd);

router.route('/protein/')
  .get(recipes.getHighProtein);

router.route('/random/')
  .get(recipes.getRandom);

export default router;
