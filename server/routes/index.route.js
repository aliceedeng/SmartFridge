import express from 'express';
import ingredientRoutes from './ingredient.route';
import recipeRoutes from './recipe.route';

const router = express.Router();

router.use('/ingredient/', ingredientRoutes);
router.use('/recipe/', recipeRoutes);

export default router;
