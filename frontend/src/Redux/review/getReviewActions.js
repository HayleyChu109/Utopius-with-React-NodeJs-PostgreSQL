import axios from "axios";

export const GET_REVIEW_SUCCESS_ACTION = "GET_REVIEW_SUCCESS_ACTION";

export const getReviewThunk = (revieweeId) => async (dispatch) => {
  try {
    let token = localStorage.getItem("token");

    const response = await axios.get(
      `${process.env.REACT_APP_API_SERVER}/member/review/${revieweeId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const { data } = response;
    if (data) {
      dispatch({
        type: GET_REVIEW_SUCCESS_ACTION,
        payload: data,
      });
    }
  } catch (err) {
    throw new Error(err);
  }
};
