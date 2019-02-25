import {combineReducers} from 'redux';
import loginReducer from "./loginReducer";
import {patentReducer} from "./patentReducer";
import {auctionReducer} from "./auctionReducer";
import {biddingReducer} from "./biddingReducer";

const mergeReducers = combineReducers({
    login : loginReducer, 
    patent : patentReducer,
    auction : auctionReducer,
    bidding : biddingReducer
});

export default mergeReducers;