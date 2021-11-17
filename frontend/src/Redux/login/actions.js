import axios from "axios";

export const LOGIN_SUCCESS_ACTION = "LOGIN_SUCCESS_ACTION";
export const LOGIN_FAILURE_ACTION = "LOGIN_FAILURE_ACTION";
export const LOGOUT_ACTION = "LOGOUT_ACTION";
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
    }
  } catch (err) {
    console.log("Error: ", err);
  }
};

export const logoutUser = () => (dispatch) => {
  localStorage.clear("token");
  dispatch({ type: LOGOUT_ACTION });
};
