import { CHANGE_BID_FORM,CHANGE_AUCTION_DETAILS ,CHANGE_BID_AMOUNT, POST_BID_ACTION, UPDATE_AUCTIONS_STATE, CHANGE_SUBMIT_BUTTON_STATE } from "./BiddingActionTypes";

export const changeBidFormState = (bidFormState, amount) => {
  return {
    type: CHANGE_BID_FORM,
    bidFormState: !bidFormState,
    bidAmount: amount
  }
}

export const changeBidAmount = (value) => {
  return {
    type: CHANGE_BID_AMOUNT,
    bidAmount: value
  }
}

export const postBidAction = (value) => {
  return {
    type : POST_BID_ACTION,
    value
  }
}

export const updateAuctionsState = (auctions) => {
  return {
    type : UPDATE_AUCTIONS_STATE,
    auctions : auctions
  }
}

export const changeAuctionDetails = (auctionSelectedIndex) => {
  
  return{
    type : CHANGE_AUCTION_DETAILS,
    auctionSelectedIndex,
  }
}

export const changeBiddingSubmitState = (biddingSubmitButtonState) => {
  return {
    type : CHANGE_SUBMIT_BUTTON_STATE,
    biddingSubmitButtonState 
  }
}