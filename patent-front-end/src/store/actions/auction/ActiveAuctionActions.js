import {ACTIVE_AUCTION_ACTION, CHANGE_SEL_AUCTION_INDEX} from "./ActiveAuctionActionsTypes";

export const getActiveAction = (activeAuctions) => {
  console.log("Auctions " + activeAuctions)
  return {
    type : ACTIVE_AUCTION_ACTION,
    auctions : activeAuctions
  }
} 

export const changeAuctionDetails = (auctionSelectedIndex) => {
  return{
    type : CHANGE_SEL_AUCTION_INDEX,
    auctionSelectedIndex
  }
}