import { combineReducers } from 'redux';
import loginReducer from "./loginReducer";
import { patentReducer } from "./patentReducer";
import { auctionReducer } from "./auctionReducer";
import { biddingReducer } from "./biddingReducer";
import { modalReducer } from "./modalReducer";

const mergeReducers = combineReducers({
    login: loginReducer,
    patent: patentReducer,
    auction: auctionReducer,
    bidding: biddingReducer,
    modal: modalReducer
});

export default mergeReducers;