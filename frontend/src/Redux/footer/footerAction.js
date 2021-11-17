import axios from "axios";

export const SEND_MSG = "SEND_MSG";

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
        console.log(res);
        dispatch({
          type: SEND_MSG,
          payload: res.data[0],
        });
      });
  };
};
