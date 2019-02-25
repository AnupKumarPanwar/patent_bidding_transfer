import { loginAction } from '../actions/login/LoginAction';
import service from '../../services/userService';

export const loginThunk = (data) => {
    return (dispatch) => {
        service.login(data).then((res) => {
            console.log(res);
            if(res.data === undefined){

            }else{
return dispatch(loginAction(res))
            }
            
        }).catch((err) => {
            console.error(err);
        })
    };
};