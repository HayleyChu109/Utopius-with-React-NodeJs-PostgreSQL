import axios from "axios";

export const SIGNUP_SUCCESS_ACTION = "SIGNUP_SUCCESS_ACTION";
export const SIGNUP_FAILURE_ACTION = "SIGNUP_FAILURE_ACTION";

export const signupUserThunk =
  (username, password, name) => async (dispatch) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_SERVER}/signup`,
        {
          username: username,
          password: password,
          name: name,
        }
      );
      const { data } = response;
      if (data.message) {
        dispatch({
          type: SIGNUP_FAILURE_ACTION,
          message: data.message,
        });
      } else {
        dispatch({ type: SIGNUP_SUCCESS_ACTION });
      }
    } catch (err) {
      console.log("Error: ", err);
    }
  };
