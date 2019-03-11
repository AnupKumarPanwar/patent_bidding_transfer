import service from "../../services/biddingService";
import auctionService from "../../services/patentService";
import {postBidAction, updateAuctionsState} from "../actions/bidding/BiddingActions";

import {changeBiddingSubmitState} from "../actions/bidding/BiddingActions";

// TODO apply catch also, for each.
export const submitBid = (data) => {
  return (dispatch) => {
    service.submitBid(data).then(res => {
      dispatch(changeBiddingSubmitState(false));
      return dispatch(postBidAction(res))
    })
  }
}

export const getAuctions = (data) => {
  return (dispatch) => {
    auctionService.getActiveAuctions(data).then(res=>{
      return dispatch(updateAuctionsState(res.data));
    })
  }
}