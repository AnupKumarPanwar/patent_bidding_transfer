import {GET_PATENTS, SORT_PATENTS, SHOW_AUCTION, PATENT_AUCTION} from "../actions/patent/PatentActionTypes";

export const initialState = {
  patents : [],
  ascending : false,
  visibleAuction : false,
  visibleTransfer : false,
}

export const patentReducer = (state = initialState, action) => {
  switch(action.type){
    case GET_PATENTS:
      return({...state, patents : action.patents})
    case SORT_PATENTS :
      const sortedPatents = action.patents.slice();
      sortedPatents.reverse();
      return ({
        ...state, 
        ascending : action.ascending,
        patents : sortedPatents
      })
    case SHOW_AUCTION :
      return({...state, visibleAuction:action.visibleAuction, visibleTransfer : action.visibleTransfer})
    case PATENT_AUCTION :
      return({
        ...state, 
        auctionResponse : action.auctionResponse
      })
    default : 
      return state
  }
}