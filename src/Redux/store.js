import { createStore } from "redux";
import { reducer } from "./reducer";

let initialState = {token:"", userData:[],userOtp:[]};

export const store = new createStore(reducer,initialState);