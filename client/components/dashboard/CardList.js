import React from 'react';
import RecipeCard from './RecipeCard.js';
import IngredientCard from './IngredientCard.js';
import Grid from '@material-ui/core/Grid';

const styles = {
  card: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
};



// Generates a list of ingredients or recipe cards from the result of a recipe or ingredient query
// Recieves component key-value pairs as an object, containing:
//  resultsData: data output by associated search query
//  ingredient: boolean giving whether this is a list of ingredients (assumed recipes if not)
const CardList = ({ resultsData, ingredient } ) => {
  let cardsArray;
  if (ingredient) {
      cardsArray = resultsData.map((ingredient, index) => (
          <IngredientCard key={index}
                          name={ingredient.NAME}
                          id={ingredient.ID}
          />
    ));
  } else {
      cardsArray = resultsData.map((recipe, index) => (
          <RecipeCard key={index} title={recipe.TITLE} rid={recipe.RID} picLink={recipe.PICTURE_LINK}/>
      ));

     
  }

  return (
      <Grid container spacing={24}>
        {cardsArray}
      </Grid>
    


  );
};


export default CardList;
