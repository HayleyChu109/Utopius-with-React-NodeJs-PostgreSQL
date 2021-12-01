import {
  Load_DATA_FAILED,
  Load_NEWUSERLIST_SUCCESS,
  Load_USER_GROWTH_SUCCESS,
  Load_USER_SUCCESS,Load_USER_BlOCK_SUCCESS
} from "./action";
const initialState = {
  user: { count:'' },
  newUserList: [], userGrowth: {},requestUser:{},userIsBlock:false
};

export function AdminDataReducer(state = initialState, action) {
  switch (action.type) {
    case Load_USER_GROWTH_SUCCESS:
      return { ...state,userGrowth:action.payload };
    case Load_NEWUSERLIST_SUCCESS:
      return { ...state, newUserList: action.payload};
    case Load_USER_SUCCESS:
      return { ...state, requestUser: action.payload };
    case Load_USER_BlOCK_SUCCESS:
      return { ...state, userIsBlock: action.payload };
    case Load_DATA_FAILED:
      return state;
    default:
      return state;
  }
}
