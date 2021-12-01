import {
    Load_DATA_FAILED,
    Load_REQUEST_STAT_SUCCESS,Load_REQUEST_SUCCESS
  } from "./action";
  const initialState = {
   stat:[],
   requestList:[]
  };
  
  export function AdminRequestReducer(state = initialState, action) {
    switch (action.type) {
      case Load_REQUEST_STAT_SUCCESS:
        return { ...state,stat:action.payload };
      case Load_REQUEST_SUCCESS:
        return { ...state, requestList: action.payload};
     
      case Load_DATA_FAILED:
        return state;
      default:
        return state;
    }
  }
  