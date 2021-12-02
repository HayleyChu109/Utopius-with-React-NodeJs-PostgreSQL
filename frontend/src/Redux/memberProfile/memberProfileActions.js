import axios from "axios";

export const MEMBER_INFO_SUCCESS_ACTION = "MEMBER_INFO_SUCCESS_ACTION";
export const GET_ALL_USERNAME_SUCCESS_ACTION =
  "GET_ALL_USERNAME_SUCCESS_ACTION";
export const MY_INFO_SUCCESS_ACTION = "MY_INFO_SUCCESS_ACTION";

export const memberInfoThunk = (memberId) => async (dispatch) => {
  try {
    let token = localStorage.getItem("token");

    const response = await axios.get(
      `${process.env.REACT_APP_API_SERVER}/member/memberinfo/${memberId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const { data } = response;
    if (data) {
      dispatch({
        type: MEMBER_INFO_SUCCESS_ACTION,
        payload: data,
      });
    }
  } catch (err) {
    throw new Error(err);
  }
};

export const getAllUsernameThunk = () => async (dispatch) => {
  try {
    let token = localStorage.getItem("token");

    const response = await axios.get(
      `${process.env.REACT_APP_API_SERVER}/member/allusername`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const { data } = response;
    if (data) {
      dispatch({
        type: GET_ALL_USERNAME_SUCCESS_ACTION,
        payload: data,
      });
    }
  } catch (err) {
    throw new Error(err);
  }
};

// Below action is to prevent collision of the memberInfo store of user's own info & other user's info
export const myInfoThunk = (myUserId) => async (dispatch) => {
  try {
    let token = localStorage.getItem("token");

    const response = await axios.get(
      `${process.env.REACT_APP_API_SERVER}/member/memberinfo/${myUserId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const { data } = response;
    if (data) {
      dispatch({
        type: MY_INFO_SUCCESS_ACTION,
        payload: data,
      });
    }
  } catch (err) {
    throw new Error(err);
  }
};
