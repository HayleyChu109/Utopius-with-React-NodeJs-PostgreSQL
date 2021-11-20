import { MEMBER_REQ_SUCCESS_ACTION } from "./memberReqDetailsActions";

const initialState = {
  reqDetails: [],
};

export function memberReqDetailsReducer(state = initialState, action) {
  switch (action.type) {
    case MEMBER_REQ_SUCCESS_ACTION:
      console.log(action.payload);
      return {
        reqDetails: state.reqDetails.concat(action.payload),
      };

    default:
      return state;
  }
}
