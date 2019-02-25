import { LOGIN, LOGOUT, RESET_AUTH_AFTER_TOAST } from '../actions/login/LoginActionTypes';

let auth = '';
let userInfo = {};
if (localStorage.getItem('auth')==='true') {
    auth = true;
    userInfo = JSON.parse(localStorage.getItem('userInfo'));
}

export const initialState = {
    auth: auth,
    userInfo: userInfo,
}

const loginReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN:
            if(action.auth) {
                localStorage.setItem('auth', 'true');
                localStorage.setItem('userInfo', JSON.stringify(action.userInfo));
            }
            return { ...state, auth: action.auth, userInfo: action.userInfo }
        case LOGOUT:
            return { ...state, auth: action.auth }
        case RESET_AUTH_AFTER_TOAST:
            return { ...state, auth: action.auth }
        default:
            return state
    }
}

export default loginReducer