import axios from "axios";

export const SEARCH_REQ_ACTION = "SEARCH_REQ_ACTION";
export const BOOKMARK_TOGGLE = "BOOKMARK_TOGGLE";

export const searchReq = (search) => {
  return {
    type: SEARCH_REQ_ACTION,
    payload: search,
  };
};

export const bookmarkToggleThunk = (requestId, userId) => async (dispatch) => {
  try {
    let token = await localStorage.getItem("token");

    const response = await axios.post(
      `${process.env.REACT_APP_API_SERVER}/member/bookmark`,
      {
        userId: userId,
        requestId: requestId,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const { data } = response;
    if (data) {
      dispatch({
        type: BOOKMARK_TOGGLE,
        payload: data,
      });
    }
  } catch (err) {
    console.log("Error: ", err);
  }
};
