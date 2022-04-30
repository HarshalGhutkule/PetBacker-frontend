import { ADD_TOKEN, CONFIRM_OTP, USER_DATA } from "./actionType"

export const reducer = (store,{type,payload})=>{

    switch(type){
        case ADD_TOKEN:
            return {...store, token:payload};
        case USER_DATA:
            return {...store, userData:payload};
        case CONFIRM_OTP:
            return {...store, userOtp:payload};
        default:
            return store;
    }
}