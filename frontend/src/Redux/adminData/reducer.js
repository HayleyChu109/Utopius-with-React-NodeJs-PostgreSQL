import {
  Load_DATA_FAILED,
  Load_NEWUSERLIST_SUCCESS,
  Load_USER_GROWTH_SUCCESS,
} from "./action";
const initialState = {
  user: { newUserList: [], userGrowth: {} },
  review: [],
  request: [
    {
      id: 1,
      username:'James',
      userId:4,
      title: "Moving house",
      detail: "We are moving. And we need manpower",
      reward: 250,
      requirePpl: 5,
      district: "Central",
      tag:['moving','test'],
      status: "ready",
      reqPhotoPath: "",
    },
  ],
};

export function AdminDataReducer(state = initialState, action) {
  switch (action.type) {
    case Load_USER_GROWTH_SUCCESS:
      return { ...state, user: { ...state.user, userGrowth: action.payload } };
    case Load_NEWUSERLIST_SUCCESS:
      return { ...state, user: { ...state.user, newUserList: action.payload } };
    case Load_DATA_FAILED:
      return state;
    default:
      return state;
  }
}
