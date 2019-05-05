import {
    INGREDIENT_ADD,
    INGREDIENT_REMOVE,
    FRIDGE_CLEAR,
    UPDATE_SEARCH_TYPE
} from '../constants/actionType';

// action for adding an ingredient to the store
// expects data to be an object with data.id giving ingredient id
// and data.name giving ingredient name

export function addIngredient(data) {
    return {
        type: INGREDIENT_ADD,
        data: data
    };
}

// action for clearing the entire fridge.contents array
export function clearFridge() {
    return {
        type: FRIDGE_CLEAR
    };
}

// action for removing ingredient from the store
// expects id to be an integer giving the ingredient id
// of the ingredient to be removed
export function removeIngredient(id) {
    return {
        type: INGREDIENT_REMOVE,
        data: id
    };
}


// change the search type to new search type
// given by data argument
// expects a string of new search type ('or', 'and', 'sortedOr')
export function updateSearchType(newType) {
    return {
        type: UPDATE_SEARCH_TYPE,
        data: newType
    };
}
