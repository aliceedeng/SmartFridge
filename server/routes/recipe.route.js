import express from 'express';
require('dotenv').config();

const router = express.Router();
const recipes = require('../controllers/recipe.controller.js');

router.route('/:id?')
  .get(recipes.getById)

router.route('/name/:name')
  .get(recipes.getByName)

export default router;
