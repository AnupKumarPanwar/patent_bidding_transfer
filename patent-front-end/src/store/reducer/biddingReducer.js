import { CHANGE_BID_FORM, CHANGE_BID_AMOUNT } from "../actions/bidding/BiddingActionTypes";

const initialState = {
  bidFormState: false,
  bidAmount: null
}

export const biddingReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_BID_FORM:
      return {
        ...state,
        bidFormState: action.bidFormState,
        bidAmount : action.bidAmount

      }

    case CHANGE_BID_AMOUNT:
      return {
        ...state,
        bidAmount: action.bidAmount
      }
    default:
      return { ...state }
  }
}