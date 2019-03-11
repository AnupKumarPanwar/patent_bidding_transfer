import { CHANGE_MODAL } from "./ModalActionsTypes";

export const changeModal = (visible, title, desc) => {
  return {
    type: CHANGE_MODAL,
    visible: visible,
    title: title,
    desc: desc
  }
} 