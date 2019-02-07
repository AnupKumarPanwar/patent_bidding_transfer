import {combineReducers} from 'redux';
import loginReducer from "./loginReducer";

const mergeReducers = combineReducers({
    login : loginReducer
});

export default mergeReducers;