import {LOGIN, LOGOUT} from '../actions/login/LoginActionTypes';

export const initialState = {
    auth : false,
    userInfo : {} 
}

const loginReducer = (state = initialState, action) =>{
    switch(action.type){
        case LOGIN:
            return { ...state, auth : action.auth, userInfo : action.userInfo }
        case LOGOUT:
            return { ...state, auth : action.auth }
        default :
            return state
    }
}

export default loginReducer