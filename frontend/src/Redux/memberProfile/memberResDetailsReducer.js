import { MEMBER_RES_SUCCESS_ACTION } from "./memberResDetailsActions";

const initialState = {
  resDetails: [],
};

export function memberResDetailsReducer(state = initialState, action) {
  switch (action.type) {
    case MEMBER_RES_SUCCESS_ACTION:
      console.log(action.payload);
      return {
        resDetails: state.resDetails.concat(action.payload),
      };

    default:
      return state;
  }
}
