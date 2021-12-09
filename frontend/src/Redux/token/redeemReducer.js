import {
  REDEEM_ITEMS_ACTION,
  REDEEM_ITEMS_SUCCESS_ACTION,
  CLEAR_REDEEM_SUCCESSMSG_ACTION,
  REDEEM_HISTORY_ACTION,
} from "./redeemActions";

const initialState = {
  redeemItems: [],
  message: null,
  redeemList: [],
};

export function redeemReducer(state = initialState, action) {
  switch (action.type) {
    case REDEEM_ITEMS_ACTION:
      return { ...state, redeemItems: action.payload };

    case REDEEM_ITEMS_SUCCESS_ACTION:
      return { ...state, message: action.message };

    case CLEAR_REDEEM_SUCCESSMSG_ACTION:
      return { ...state, redeemItems: action.payload, message: action.message };

    case REDEEM_HISTORY_ACTION:
      return { ...state, redeemList: action.payload };

    default:
      return state;
  }
}
