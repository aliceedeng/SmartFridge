import express from 'express';
require('dotenv').config();

const router = express.Router();
const ingredients = require('../controllers/ingredient.controller.js');

router.route('/:id?')
  .get(ingredients.get)

router.route('/name/:name')
  .get(ingredients.getByName)

export default router;
