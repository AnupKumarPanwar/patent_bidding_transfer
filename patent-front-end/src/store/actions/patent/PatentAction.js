import {SORT_PATENTS, GET_PATENTS} from "./PatentActionTypes";

export const getPatentAction = (patents) => {
  return {
    type : GET_PATENTS,
    patents : patents
  }
} 

export const sortPatentAction = (ascending) => {
  return {
    type : SORT_PATENTS, 
    ascending : !ascending
  }
}