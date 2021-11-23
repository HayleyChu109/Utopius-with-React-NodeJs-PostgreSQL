import axios from "axios";

export const MEMBER_RES_SUCCESS_ACTION = "MEMBER_RES_SUCCESS_ACTION";

export const memberResDetailsThunk = (memberId) => async (dispatch) => {
  try {
    let token = localStorage.getItem("token");

    const response = await axios.get(
      `${process.env.REACT_APP_API_SERVER}/member/memberres/${memberId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const { data } = response;
    if (data) {
      dispatch({
        type: MEMBER_RES_SUCCESS_ACTION,
        payload: data,
      });
    }
  } catch (err) {
    throw new Error(err);
  }
};
