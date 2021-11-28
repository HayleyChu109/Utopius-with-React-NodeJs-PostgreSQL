import { REPORT_MEMBER_SUCCESS_ACTION } from "./reportMemberActions";

const initialState = {
  reportId: [],
  successMsg: null,
};

export function reportMemberReducer(state = initialState, action) {
  switch (action.type) {
    case REPORT_MEMBER_SUCCESS_ACTION:
      console.log(action.payload);
      return { ...state, reportId: action.payload, successMsg: action.message };

    default:
      return state;
  }
}
