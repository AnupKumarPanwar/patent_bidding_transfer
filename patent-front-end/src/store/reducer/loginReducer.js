import { LOGIN, LOGOUT, RESET_AUTH_AFTER_TOAST } from '../actions/login/LoginActionTypes';

export const initialState = {
    auth: '',
    userInfo: {},
}

const loginReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN:
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