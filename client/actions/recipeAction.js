import
{
    RECIPE_ADD,
    RECIPE_REMOVE,
    BOOK_CLEAR,
    UPDATE_SEARCH_FILTER,
    UPDATE_SEARCH_FUZZY
} from '../constants/actionType';


// action for adding recipe to the cookbook
export function addRecipe(data) {
    let trueData = Object.assign({}, data, {
        calories: parseFloat(data.calories),
        sugar: parseFloat(data.sugar),
        cholesterol: parseFloat(data.cholesterol),
        protein: parseFloat(data.protein),
        sodium: parseFloat(data.sodium)
    });
    console.log(trueData);
    return {
        type: RECIPE_ADD,
        data: trueData
    };
}

// updates the search filter to the filter given
// by data -- expects a single string
export function updateSearchFilter(data) {
    return {
        type: UPDATE_SEARCH_FILTER,
        data: data
    }
}

// updates fuzzy string matching to be the opposite of
// its current value
export function updateSearchFuzzy(newValue) {
    return {
        type: UPDATE_SEARCH_FUZZY,
        data: newValue
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
