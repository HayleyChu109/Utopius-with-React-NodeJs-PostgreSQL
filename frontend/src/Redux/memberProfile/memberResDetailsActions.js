import axios from "axios";
import jwt_decode from "jwt-decode";

export const MEMBER_RES_SUCCESS_ACTION = "MEMBER_RES_SUCCESS_ACTION";

export const memberResDetailsThunk = () => async (dispatch) => {
  try {
    let token = localStorage.getItem("token");
    let decodedId = jwt_decode(token).id;
    console.log(decodedId);

    const response = await axios.get(
      `${process.env.REACT_APP_API_SERVER}/member/memberres/${decodedId}`,
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
        type: MEMBER_RES_SUCCESS_ACTION,
        payload: data,
      });
    }
  } catch (err) {
    throw new Error(err);
  }
};
