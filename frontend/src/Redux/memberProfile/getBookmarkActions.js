import axios from "axios";

export const GET_BOOKMARK_SUCCESS_ACTION = "GET_BOOKMARK_SUCCESS_ACTION";

export const getBookmarkThunk = (memberId) => async (dispatch) => {
  try {
    let token = localStorage.getItem("token");

    const response = await axios.get(
      `${process.env.REACT_APP_API_SERVER}/member/bookmark/${memberId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const { data } = response;
    if (data) {
      dispatch({
        type: GET_BOOKMARK_SUCCESS_ACTION,
        payload: data,
      });
    }
  } catch (err) {
    throw new Error(err);
  }
};
