import {
    LOGIN, LOGOUT, RESET_AUTH_AFTER_TOAST
} from './LoginActionTypes';

export const loginAction = (server_response) => ({
    type : LOGIN,
    auth : server_response.success,
    userInfo : server_response.data
})

export const logoutAction = () => ({
    type : LOGOUT, 
    auth : false
})

export const resetAuthAfterToast = () => ({
    type : RESET_AUTH_AFTER_TOAST, 
    auth : ''
})