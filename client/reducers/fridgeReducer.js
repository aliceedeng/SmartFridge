import {
    INGREDIENT_ADD,
    FRIDGE_CLEAR,
    INGREDIENT_REMOVE
} from '../constants/actionType';

// fridge consists of contents array
let initialState = {
    contents: []
};

 /**
 * Reducer for ingredients fridge
 *
 * INGREDIENT_ADD : adds an ingredient with the given id and name (stored in action.data) to fridge contents
 * INGREDIENT_REMOVE: removes an ingredient with the given id (stored as action.data)
 * CLEAR_FRIDGE: empties fridge and replaces it with []
 *
 */
export default function (state, action) {
    state = state || initialState;
    let newState;
    let index;

    switch (action.type) {
        case INGREDIENT_ADD:
            newState = Object.assign({}, state, {
                contents: [...state.contents, action.data]
            });

            return newState;

        case INGREDIENT_REMOVE:
            index = state.contents.map((ingredient) => (ingredient.id)).indexOf(action.data);
            if (index !== -1) {
                newState = Object.assign({}, state, {
                    contents: [
                        ...state.contents.slice(0, index),
                        ...state.contents.slice(index + 1)
                        ]
                });
            } else {
                newState = Object.assign({}, state);
            }

            return newState;

        case FRIDGE_CLEAR:
            newState = Object.assign({}, state, {
                contents: []
            });

            return newState;

        default:
            return state;
    }
}