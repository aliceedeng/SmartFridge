import {
    INGREDIENT_ADD,
    INGREDIENT_REMOVE,
    FRIDGE_CLEAR
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

