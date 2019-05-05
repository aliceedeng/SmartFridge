import
{
    RECIPE_ADD,
    BOOK_CLEAR,
    RECIPE_REMOVE
} from '../constants/actionType';

// fridge consists of contents array
let initialState = {
    contents: []
};

/**
 * Reducer for ingredients fridge
 *
 * RECIPE_ADD : adds a recipe with the given id and name (stored in action.data) to cookbook contents
 * RECIPE_REMOVE: removes a recipe with the given id (stored as action.data)
 * BOOK_CLEAR: empties cookbook and replaces it with []
 *
 */
export default function (state, action) {
    state = state || initialState;
    let newState;
    let index;

    switch (action.type) {
        case RECIPE_ADD:
            newState = Object.assign({}, state, {
                contents: [...state.contents, action.data]
            });

            return newState;

        case RECIPE_REMOVE:
            index = state.contents.map((ingredient) => (ingredient.rid)).indexOf(action.data);
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

        case BOOK_CLEAR:
            newState = Object.assign({}, state, {
                contents: []
            });

            return newState;

        default:
            return state;
    }
}