import axios from "axios";

export const MEMBER_BOOKMARK_SUCCESS_ACTION = "MEMBER_BOOKMARK_SUCCESS_ACTION";
export const CLEAR_MEMBER_BOOKMARK_ACTION = "CLEAR_MEMBER_BOOKMARK_ACTION";

export const memberBookmarkThunk = (bookmarkId) => async (dispatch) => {
  try {
    let token = localStorage.getItem("token");

    const response = await axios.get(
      `${process.env.REACT_APP_API_SERVER}/member/bookmark/${bookmarkId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const { data } = response;
    if (data) {
      dispatch({
        type: MEMBER_BOOKMARK_SUCCESS_ACTION,
        payload: data,
      });
    }
  } catch (err) {
    throw new Error(err);
  }
};

export const clearBookmark = () => {
  return {
    type: CLEAR_MEMBER_BOOKMARK_ACTION,
    payload: [],
  };
};
