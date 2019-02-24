import { CHANGE_BID_FORM, CHANGE_BID_AMOUNT } from "./BiddingActionTypes";

export const changeBidFormState = (bidFormState, amount) => {
  return {
    type: CHANGE_BID_FORM,
    bidFormState: !bidFormState, 
    bidAmount : amount
  }
}

export const changeBidAmount = (value) => {
  return {
    type: CHANGE_BID_AMOUNT,
    bidAmount: value
  }
}