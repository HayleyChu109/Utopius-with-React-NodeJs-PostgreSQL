import {
    Load_DATA_FAILED,
    Load_TOKEN_TRANSACTION_SUCCESS,Load_TOKEN_USER_TRANSACTION_SUCCESS,Load_REDEEM_ITEM_SUCCESS
  } from "./action";
  const initialState = {
  transaction:[],
  userTransaction:[],
  transactionStat:[],
  redeemItem:[]
  };
  
  export function AdminTokenReducer(state = initialState, action) {
    switch (action.type) {
      case Load_TOKEN_TRANSACTION_SUCCESS:
        return { ...state,transaction:action.payload };
      case Load_TOKEN_USER_TRANSACTION_SUCCESS:
        return { ...state,userTransaction:action.payload };
      case Load_REDEEM_ITEM_SUCCESS:
        return { ...state,redeemItem:action.payload };
      case Load_DATA_FAILED:
        return state;
      default:
        return state;
    }
  }
  