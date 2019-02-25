import {ACTIVE_AUCTION_ACTION, CHANGE_SEL_AUCTION_INDEX} from "../actions/auction/ActiveAuctionActionsTypes";

const initialState = {
  auctions : [],
  auctionSelectedIndex : 0,
}

export const auctionReducer = (state = initialState, action) => {
  switch(action.type){
    case ACTIVE_AUCTION_ACTION :
      return {
        ...state,
        auctions : action.auctions
      }

    case CHANGE_SEL_AUCTION_INDEX:
      return{
        ...state,
        auctionSelectedIndex : action.auctionSelectedIndex
      }

    default :
      return {
        ...state
      }
  }
}