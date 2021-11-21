import axios from "axios";
export const Load_USER_GROWTH_SUCCESS = "LOAD_USER_GROWTH_SUCCESS";
export const Load_DATA_FAILED = "LOAD_DATA_FAILED";
export const Load_NEWUSERLIST_SUCCESS='Load_NEWUSERLIST_SUCCESS'
export const GetUserGrowth = (start, end) => async (dispatch) => {
  let userToken = localStorage.getItem("token");
  console.log(userToken);
  console.log(start)
  try {
    let response = await axios.post(
      `${process.env.REACT_APP_API_SERVER}/admin/dashboard`,{startDate:start,endDate:end},

      {
        headers: { Authorization: `Bearer ${userToken}` },
      }
    );
    console.log(response.data)
    let userGrowth = response.data.userGrowth;
    let newUserList = response.data.newUserList;
    console.log(userGrowth)
   
    dispatch({ type: Load_USER_GROWTH_SUCCESS, payload: userGrowth });
    dispatch({ type: Load_NEWUSERLIST_SUCCESS, payload: newUserList });
    console.log(userGrowth);
  } catch (error) {
    console.log(error);
    dispatch({ type: Load_DATA_FAILED });
  }
};
