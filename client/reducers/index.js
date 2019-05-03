import {combineReducers} from 'redux';
import {connectRouter} from 'connected-react-router';
import {reducer as formReducer} from 'redux-form';
import fridgeReducer from './fridgeReducer';

// Import custom components

const appReducer = (history) => combineReducers({
    router: connectRouter(history),
    form: formReducer,  // ← redux-form
    fridge: fridgeReducer,
});

const rootReducer = (state, action) => {
    return appReducer(state, action);
};

export default rootReducer;
