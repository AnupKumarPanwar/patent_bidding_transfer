import {
    LOGIN, LOGOUT
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