import { CHANGE_BID_FORM, CHANGE_BID_AMOUNT, POST_BID_ACTION, UPDATE_AUCTIONS_STATE, CHANGE_AUCTION_DETAILS } from "../actions/bidding/BiddingActionTypes";
import { CardActions } from "react-md";

const initialState = {
  bidFormState: false,
  bidAmount: null,
  auctions: [],
  auctionSelectedIndex: 0
}

export const biddingReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_BID_FORM:
      return {
        ...state,
        bidFormState: action.bidFormState,
        bidAmount: action.bidAmount

      }
    case CHANGE_BID_AMOUNT:
      return {
        ...state,
        bidAmount: action.bidAmount
      }
    case POST_BID_ACTION:
      return {
        ...state,
      }
    case UPDATE_AUCTIONS_STATE:
      return {
        ...state,
        auctions: action.auctions
      }
    case CHANGE_AUCTION_DETAILS:
      return {
        ...state,
        auctionSelectedIndex: action.auctionSelectedIndex,
      }
    default:
      return { ...state }
  }
}