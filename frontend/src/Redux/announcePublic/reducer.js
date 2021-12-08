import { GET_ANNOUNCEMENT_LIST } from "./actions";

const initialState = {
  announcementList: [],
};

export function publicAnnounceReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ANNOUNCEMENT_LIST:
      return { ...state, announcementList: action.payload };
    default:
      return state;
  }
}
