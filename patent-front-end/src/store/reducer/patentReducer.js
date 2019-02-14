import { GET_PATENTS, SORT_PATENTS, CHANGE_PATENT_TYPE, CHANGE_PATENT_NAME, CHANGE_PATENT_SUB_TYPE, CHANGE_COLLABORATORS, CHANGE_FILE_NAME } from "../actions/patent/PatentActionTypes";

export const initialState = {
  patents: [],
  ascending: false,
  owners: [],
  lisenceHolders: [],
  patentName: '',
  patentType: '',
  patentSubType: '',
  issueDate: '',
  uploadFileName: ''
}

export const patentReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PATENTS:
      return ({ ...state, patents: action.patents })
    case SORT_PATENTS:
      return ({ ...state, ascending: action.ascending })
    case CHANGE_PATENT_TYPE:
      return ({ ...state, patentType: action.patentType })
    case CHANGE_PATENT_SUB_TYPE:
      return ({ ...state, patentSubType: action.patentType })
    case CHANGE_PATENT_NAME:
      return ({ ...state, patentName: action.patentName })
    case CHANGE_COLLABORATORS:
      return ({ ...state, owners: action.owners })
    case CHANGE_FILE_NAME:
      return ({ ...state, uploadFileName: action.uploadFileName })

    default:
      return state
  }
}