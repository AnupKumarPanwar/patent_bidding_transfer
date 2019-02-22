import {combineReducers} from 'redux';
import loginReducer from "./loginReducer";
import {patentReducer} from "./patentReducer";
import {auctionReducer} from "./auctionReducer";

const mergeReducers = combineReducers({
    login : loginReducer, 
    patent : patentReducer,
    auction : auctionReducer
});

export default mergeReducers;