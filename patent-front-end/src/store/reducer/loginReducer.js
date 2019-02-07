import {LOGIN} from '../actions/login/LoginActionTypes';
const loginReducer = (state = [], action) =>{
    switch(action.type){
        case LOGIN:
            return  [...state, { auth : action.auth }]
        default :
            return state
    }
}

export default loginReducer