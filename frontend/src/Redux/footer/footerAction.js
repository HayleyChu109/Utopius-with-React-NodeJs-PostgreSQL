import axios from "axios";

export const SEND_MSG_FAILURE_ACTION = "SEND_MSG_FAILURE_ACTION";
export const SEND_MSG_SUCCESS_ACTION = "SEND_MSG_SUCCESS_ACTION";

export const sendMsgThunk = (email, name, title, message) => {
  console.log("Add new message");
  return (dispatch) => {
    axios
      .post(`${process.env.REACT_APP_API_SERVER}/message`, {
        email: email,
        name: name,
        title: title,
        message: message,
      })
      .then((res) => {
        if (res.data == null) {
          dispatch({
            type: SEND_MSG_FAILURE_ACTION,
            message: "Failed to send message",
          });
        } else {
          dispatch({
            type: SEND_MSG_SUCCESS_ACTION,
            message:
              "Thank you for your message. We will get back to you as soon as possible.",
          });
        }
      });
  };
};
