import axios from "axios";
import jwt_decode from "jwt-decode";

export const MEMBER_INFO_SUCCESS_ACTION = "MEMBER_INFO_SUCCESS_ACTION";
// export const MEMBER_INFO_FAILURE_ACTION = "SIGNUP_INFO_FAILURE_ACTION";

export const memberInfoThunk = () => async (dispatch) => {
  try {
    let token = localStorage.getItem("token");
    let decodedId = jwt_decode(token).id;
    console.log(decodedId);

    const response = await axios.get(
      `${process.env.REACT_APP_API_SERVER}/member/memberinfo/${decodedId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const { data } = response;
    if (data) {
      console.log(data);
      dispatch({
        type: MEMBER_INFO_SUCCESS_ACTION,
        payload: data,
      });
    }
  } catch (err) {
    throw new Error(err);
  }
};
