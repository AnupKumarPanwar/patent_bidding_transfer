import {
  CHANGE_BID_FORM,
  CHANGE_BID_AMOUNT,
  POST_BID_ACTION,
  UPDATE_AUCTIONS_STATE,
  CHANGE_AUCTION_DETAILS,
  CHANGE_SUBMIT_BUTTON_STATE
} from "../actions/bidding/BiddingActionTypes";
import {
  CardActions
} from "react-md";

const initialState = {
  bidFormState: false,
  bidAmount: null,
  auctions: [],
  auctionSelectedIndex: 0,
  biddingSubmitButtonState: false
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
      alert(action.value.data.message);
      return {
        ...state
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
    case CHANGE_SUBMIT_BUTTON_STATE:
      return {
        ...state,
        biddingSubmitButtonState: action.biddingSubmitButtonState
      }
    default:
      return {
        ...state
      }
  }
}