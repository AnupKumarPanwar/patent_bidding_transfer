import service from "../../services/biddingService";
import auctionService from "../../services/patentService";
import {postBidAction, updateAuctionsState} from "../actions/bidding/BiddingActions";
import { changeModal } from "../../store/actions/modal/ModalActions";

import {changeBiddingSubmitState} from "../actions/bidding/BiddingActions";

export const submitBid = (data) => {
  return (dispatch) => {
    service.submitBid(data).then(res => {
      dispatch(changeModal(true, 'Bid', res.data.message));
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