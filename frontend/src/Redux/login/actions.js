import axios from "axios";

export const LOGIN_SUCCESS_ACTION = "LOGIN_SUCCESS_ACTION";
export const LOGIN_ADMIN_SUCCESS_ACTION = "LOGIN_ADMIN_SUCCESS_ACTION";
export const LOGIN_FAILURE_ACTION = "LOGIN_FAILURE_ACTION";
export const LOGOUT_ACTION = "LOGOUT_ACTION";
export const LOGOUT_ADMIN_ACTION = "LOGOUT_ADMIN_ACTION";
export const CLEAR_ERR_MSG = "CLEAR_ERR_MSG";

export const loginUserThunk = (email, password) => async (dispatch) => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_API_SERVER}/login`,
      {
        email: email,
        password: password,
      }
    );
    const { data } = response;
    console.log(data);

    if (data == null) {
      dispatch({
        type: LOGIN_FAILURE_ACTION,
        message: "Unknown error, empty response",
      });
    } else if (!data.token) {
      console.log("No token, data.message: ", data.message);
      dispatch({ type: LOGIN_FAILURE_ACTION, message: data.message || "" });
    } else if (data.token && !data.isAdmin) {
      localStorage.setItem("token", data.token);
      dispatch({ type: LOGIN_SUCCESS_ACTION });
      dispatch({ type: CLEAR_ERR_MSG });
    } else {
      localStorage.setItem("token", data.token);
      localStorage.setItem("isAdmin", data.isAdmin);
      dispatch({ type: LOGIN_ADMIN_SUCCESS_ACTION });
    }
  } catch (err) {
    console.log("Error: ", err);
  }
};

export const logoutUser = () => (dispatch) => {
  localStorage.clear("token");
  dispatch({ type: LOGOUT_ACTION });
};

export const logoutAdmin = () => (dispatch) => {
  localStorage.clear("token");
  localStorage.clear("isAdmin");
  dispatch({ type: LOGOUT_ADMIN_ACTION });
};

export const loginFacebookThunk = (userInfo) => async (dispatch) => {
  try {
    const response = await axios.put(
      `${process.env.REACT_APP_API_SERVER}/login/facebook`,
      { userInfo: userInfo }
    );
    const { data } = response;
    if (data == null) {
      dispatch({ type: LOGIN_FAILURE_ACTION, payload: "Unknown error" });
    } else if (!data.token) {
      dispatch({ type: LOGIN_FAILURE_ACTION, payload: data.message || "" });
    } else {
      localStorage.setItem("token", data.token);
      dispatch({ type: LOGIN_SUCCESS_ACTION });
    }
  } catch (err) {
    dispatch({ type: LOGIN_FAILURE_ACTION, payload: err.message });
  }
};

export const loginGoogleThunk = (userInfo) => async (dispatch) => {
  try {
    const response = await axios.put(
      `${process.env.REACT_APP_API_SERVER}/login/google`,
      { userInfo: userInfo }
    );
    const { data } = response;
    if (data == null) {
      dispatch({ type: LOGIN_FAILURE_ACTION, payload: "Unknown error" });
    } else if (!data.token) {
      dispatch({ type: LOGIN_FAILURE_ACTION, payload: data.message || "" });
    } else {
      localStorage.setItem("token", data.token);
      dispatch({ type: LOGIN_SUCCESS_ACTION });
    }
  } catch (err) {
    dispatch({ type: LOGIN_FAILURE_ACTION, payload: err.message });
  }
};
