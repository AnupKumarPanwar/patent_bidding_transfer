import { loginAction } from '../actions/login/LoginAction';
import service from '../../services/userService';

export const loginThunk = (data) => {
    console.log(data);
    return (dispatch) => {
        service.login(data).then((res) => {
            console.log(res);
            return dispatch(loginAction(res))
        }).catch((err) => {
            console.error(err);
        })
    };
};