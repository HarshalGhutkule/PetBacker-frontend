import { ADD_TOKEN, CONFIRM_OTP, USER_DATA } from "./actionType"

export const addToken = (payload)=>({
    type:ADD_TOKEN,
    payload
})

export const userData = (payload)=>({
    type:USER_DATA,
    payload
})

export const confirmOtp = (payload)=>({
    type:CONFIRM_OTP,
    payload
})

