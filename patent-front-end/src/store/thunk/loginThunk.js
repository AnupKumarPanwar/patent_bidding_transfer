import {loginAction} from '../actions/login/LoginAction';
import service from '../../services/userService';

export const loginThunk = (data) => {
    return (dispatch) => {
        service.login(data).then((res) => {console.log("We are in thunk !"); return dispatch(loginAction())})
    };
};