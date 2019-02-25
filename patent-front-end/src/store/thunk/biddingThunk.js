import service from "../../services/biddingService";
import auctionService from "../../services/patentService";
import {postBidAction, updateAuctionsState} from "../actions/bidding/BiddingActions";

export const submitBid = (data) => {
  return (dispatch) => {
    service.submitBid(data).then(res => {
      return dispatch(postBidAction(res))
    })
  }
}

export const getAuctions = () => {
  return (dispatch) => {
    auctionService.getActiveAuctions().then(res=>{
      return dispatch(updateAuctionsState(res.data));
    })
  }
}