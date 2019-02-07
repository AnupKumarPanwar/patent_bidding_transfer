import {
    LOGIN
} from './LoginActionTypes';

export const loginAction = (server_response) => ({
    type : LOGIN,
    auth : server_response
})
