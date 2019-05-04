import
{
    RECIPE_ADD,
    RECIPE_REMOVE,
    BOOK_CLEAR
} from '../constants/actionType';


// action for adding recipe to the cookbook
export function recipeAdd(data) {
    return {
        type: RECIPE_ADD,
        data: data
    };
}

// action for clearing the entire recipe.contents array
export function clearBook() {
    return {
        type: BOOK_CLEAR
    };
}

// action for removing recipe from the store
// expects id to be an integer giving the ingredient id
// of the ingredient to be removed
export function removeRecipe(id) {
    return {
        type: RECIPE_REMOVE,
        data: id
    };
}

