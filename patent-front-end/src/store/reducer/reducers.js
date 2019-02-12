import {combineReducers} from 'redux';
import loginReducer from "./loginReducer";
import {patentReducer} from "./patentReducer";

const mergeReducers = combineReducers({
    login : loginReducer, 
    patent : patentReducer
});

export default mergeReducers;