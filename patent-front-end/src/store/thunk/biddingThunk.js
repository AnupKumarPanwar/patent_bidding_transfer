import service from "../../services/biddingService";
import auctionService from "../../services/patentService";
import {postBidAction, updateAuctionsState} from "../actions/bidding/BiddingActions";
import { changeModal } from "../../store/actions/modal/ModalActions";

// TODO apply catch also, for each.
export const submitBid = (data) => {
  return (dispatch) => {
    service.submitBid(data).then(res => {
      dispatch(changeModal(true, 'Bid', res.data.message));
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