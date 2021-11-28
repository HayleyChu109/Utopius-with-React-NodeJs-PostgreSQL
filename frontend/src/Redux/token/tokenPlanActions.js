import axios from "axios";

export const TOKEN_PLAN_SUCCESS_ACTION = "TOKEN_PLAN_SUCCESS_ACTION";

export const tokenPlanThunk = () => async (dispatch) => {
  try {
    let token = localStorage.getItem("token");

    const response = await axios.get(
      `${process.env.REACT_APP_API_SERVER}/member/tokenplan`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const { data } = response;
    if (data) {
      dispatch({
        type: TOKEN_PLAN_SUCCESS_ACTION,
        payload: data,
      });
    }
  } catch (err) {
    throw new Error(err);
  }
};
