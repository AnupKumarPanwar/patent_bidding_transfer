import {
    LOGIN, LOGOUT
} from './LoginActionTypes';

export const loginAction = (server_response) => ({
    type : LOGIN,
    auth : server_response.message,
    userInfo : server_response.userInfo
})

export const logoutAction = () => ({
    type : LOGOUT, 
    auth : false
})