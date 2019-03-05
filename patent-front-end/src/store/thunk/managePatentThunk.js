import {
  getPatentAction
} from "../actions/patent/PatentAction";
import service from "../../services/patentService";

export const getPatentThunk = (data) => {
  console.log(data);
  return (dispatch) => {

    service.getMyPatents(data).then(res => {
      console.log(res)
      return dispatch(getPatentAction(res));
    }).catch(err => {
      console.error(err);
    })

  };
};