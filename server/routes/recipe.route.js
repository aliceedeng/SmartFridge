import express from 'express';
require('dotenv').config();

const router = express.Router();
const recipes = require('../controllers/recipe.controller.js');

router.route('/rid/:rid')
   .get(recipes.getById)

router.route('/name/:name')
  .get(recipes.getByName)

// this doesn't work yet
router.route('/include/:id')
  .get(recipes.getByIngredientsOr)

router.route('/protein/')
  .get(recipes.getHighProtein)

router.route('/random/')
  .get(recipes.getRandom)

export default router;
