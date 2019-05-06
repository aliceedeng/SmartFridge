import
{
    RECIPE_ADD,
    BOOK_CLEAR,
    RECIPE_REMOVE,
    UPDATE_SEARCH_FILTER,
    UPDATE_SEARCH_FUZZY
} from '../constants/actionType';

import { NONE_FILTER } from '../constants/searchFilters';

// fridge consists of contents array
let initialState = {
    contents: [],
    summary: {
        calories: 0,
        sugar: 0,
        protein: 0,
        cholesterol: 0,
        sodium: 0
    },
    searchFilter: NONE_FILTER,
    searchFuzzy: false
};

const updateSummary = function(contents) {
    let newSummary = {
        calories: 0,
        sugar: 0,
        protein: 0,
        cholesterol: 0,
        sodium: 0
    };
    if (contents.length === 0) {
        return newSummary;
    }
    console.log(contents);
    for (let i = 0; i < contents.length; i++) {
        newSummary.calories += contents[i].calories;
        newSummary.sugar += contents[i].sugar;
        newSummary.protein += contents[i].protein;
        newSummary.cholesterol += contents[i].cholesterol;
        newSummary.sodium += contents[i].sodium;
    }
    console.log(newSummary);
    console.log(contents.length);
    newSummary.calories = newSummary.calories / contents.length;
    newSummary.protein = newSummary.protein / contents.length;
    newSummary.sugar = newSummary.sugar / contents.length;
    newSummary.cholesterol = newSummary.cholesterol / contents.length;
    newSummary.sodium = newSummary.sodium / contents.length;

    return newSummary;
}
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
    let newContents;

    switch (action.type) {
        case UPDATE_SEARCH_FUZZY:
            newState = Object.assign({}, state, {
                searchFuzzy: action.data
            });

            return newState;

        case UPDATE_SEARCH_FILTER:
            newState = Object.assign({}, state, {
                searchFilter: action.data
            });

            return newState;

        case RECIPE_ADD:
            newContents = [...state.contents, action.data]
            newState = Object.assign({}, state, {
                contents: newContents,
                summary: updateSummary(newContents)
            });

            return newState;

        case RECIPE_REMOVE:
            index = state.contents.map((ingredient) => (ingredient.rid)).indexOf(action.data);
            if (index !== -1) {
                newContents = [...state.contents.slice(0, index), ...state.contents.slice(index + 1)]
                newState = Object.assign({}, state, {
                    contents: newContents,
                    summary: updateSummary(newContents)
                });
            } else {
                newState = Object.assign({}, state);
            }

            return newState;

        case BOOK_CLEAR:
            newState = Object.assign({}, state, {
                contents: [],
                summary: updateSummary([])
            });

            return newState;

        default:
            return state;
    }
}