import { CHANGE_MODAL } from "../actions/modal/ModalActionsTypes";

const initialState = {
  visible: false,
  title: 'Pider',
  desc: 'Patent management over Blockchain'
}

export const modalReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_MODAL:
    console.log(action);
      return {
        ...state,
        visible: action.visible,
        title: action.title,
        desc: action.desc
      }
    default:
      return {
        ...state
      }
  }
}