import {
  REPORT_MEMBER_SUCCESS_ACTION,
  CLEAR_REPORTMSG_ACTION,
} from "./reportMemberActions";

const initialState = {
  reportId: [],
  successMsg: null,
};

export function reportMemberReducer(state = initialState, action) {
  switch (action.type) {
    case REPORT_MEMBER_SUCCESS_ACTION:
      return { ...state, reportId: action.payload, successMsg: action.message };

    case CLEAR_REPORTMSG_ACTION:
      return { ...state, successMsg: null };
    default:
      return state;
  }
}
