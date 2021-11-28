import {
  TOKEN_PURCHASE_RECORD_SUCCESS_ACTION,
  TOKEN_TRANSACTION_RECORD_SUCCESS_ACTION,
} from "./tokenRecordActions";

const initialState = {
  tokenPurchaseRecord: [],
  tokenTransActRecord: [],
};

export function tokenRecordReducer(state = initialState, action) {
  switch (action.type) {
    case TOKEN_PURCHASE_RECORD_SUCCESS_ACTION:
      return { ...state, tokenPurchaseRecord: action.payload };
    case TOKEN_TRANSACTION_RECORD_SUCCESS_ACTION:
      return { ...state, tokenTransActRecord: action.payload };

    default:
      return state;
  }
}
