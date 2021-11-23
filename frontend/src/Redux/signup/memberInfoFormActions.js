import axios from "axios";
import jwt_decode from "jwt-decode";

export const SIGNUP_INFO_SUCCESS_ACTION = "SIGNUP_INFO_SUCCESS_ACTION";
export const SIGNUP_INFO_FAILURE_ACTION = "SIGNUP_INFO_FAILURE_ACTION";
export const RESET_SUCCESSMSG_ACTION = "RESET_SUCCESSMSG_ACTION";

export const memberInfoFormSubmitThunk = (
  username,
  firstname,
  lastname,
  phone,
  district,
  imgData
) => {
  return (dispatch) => {
    let token = localStorage.getItem("token");
    let decodedId = jwt_decode(token).id;
    console.log(decodedId);

    axios
      .put(
        `${process.env.REACT_APP_API_SERVER}/member/memberinfo/${decodedId}`,
        {
          username: username,
          firstName: firstname,
          lastName: lastname,
          phone: phone,
          district: district,
          profilePath: imgData,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        if (res.data == null) {
          dispatch({
            type: SIGNUP_INFO_FAILURE_ACTION,
            message: "Failed to update profile",
          });
        } else {
          dispatch({
            type: SIGNUP_INFO_SUCCESS_ACTION,
            message: "Updated profile successfully",
          });
        }
      });
  };
};

export const resetSuccessMsg = () => {
  return {
    type: RESET_SUCCESSMSG_ACTION,
    message: null,
  };
};
