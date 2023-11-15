import { LOGIN_USER, REGISTER_USER } from "../_actions/type";

export default function user_reducer(state = {}, action){
    switch (action.type){
        case LOGIN_USER:
            return {...state, LoginSuccess: action.payload};
        case REGISTER_USER:
            return {...state, RegisterSuccess: action.payload};
        default:
            return state;
    }
}