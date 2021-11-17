import axios from "axios";
import jwt_decode from "jwt-decode";

export const memberInfoFormSubmitThunk = (
  username,
  firstname,
  lastname,
  phone,
  district,
  imgData
) => {
  console.log(username, firstname, lastname, phone, district, imgData);
  return (dispatch) => {
    let token = localStorage.getItem("token");
    let decodedId = jwt_decode(token).id;
    console.log(decodedId);

    axios
      .post(
        `${process.env.REACT_APP_API_SERVER}/member/memberinfo/${decodedId}`,
        {
          isAdmin: false,
          username: username,
          firstName: firstname,
          lastName: lastname,
          phone: phone,
          district: district,
          profilePath: imgData,
          token: 10,
          blacklist: false,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        console.log(res);
      });
  };
};
