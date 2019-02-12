import {GET_PATENTS, SORT_PATENTS} from "../actions/patent/PatentActionTypes";

export const initialState = {
  patents : [],
  ascending : false
}

export const patentReducer = (state = initialState, action) => {
  switch(action.type){
    case GET_PATENTS:
      return({...state, patents : action.patents})
    case SORT_PATENTS :
      return ({
        ...state, 
        ascending : action.ascending
      })
    default : 
      return state
  }
}