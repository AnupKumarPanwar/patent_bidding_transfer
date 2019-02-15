import {SORT_PATENTS, GET_PATENTS, SHOW_AUCTION, PATENT_AUCTION} from "./PatentActionTypes";

export const getPatentAction = (patents) => {
  console.log("PAtents " + patents)
  return {
    type : GET_PATENTS,
    patents : patents
  }
} 

export const sortPatentAction = (ascending, patents) => {
  return {
    type : SORT_PATENTS, 
    ascending : !ascending,
    patents
  }
}

export const showAuctionAction = (visibleAuction, transferAuction) => {
  return {
    type : SHOW_AUCTION,
    visibleAuction : !visibleAuction,
    transferAuction : false
  }
}

export const patentAuctionAction = (serverResponse) => {
  return {
    type : PATENT_AUCTION,
    auctionResponse : serverResponse.status
  }
}
