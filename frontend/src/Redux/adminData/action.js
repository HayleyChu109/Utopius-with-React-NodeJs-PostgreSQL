import axios from "axios";
export const Load_USER_GROWTH_SUCCESS = "LOAD_USER_GROWTH_SUCCESS";
export const Load_DATA_FAILED = "LOAD_DATA_FAILED";
export const Load_NEWUSERLIST_SUCCESS='Load_NEWUSERLIST_SUCCESS'
export const Load_USER_SUCCESS='Load_USER_SUCCESS'
export const Load_USER_LIST_SUCCESS='Load_USER_LIST_SUCCESS'
export const Load_USER_BlOCK_SUCCESS='Load_USER_BLOCK_SUCCESS'
export const GetUserGrowth = (start, end) => async (dispatch) => {
  let userToken = localStorage.getItem("token");
  console.log(userToken);
  console.log(start)
  try {
    let response = await axios.get(
      `${process.env.REACT_APP_API_SERVER}/admin/user/stat/daily`,

      {
        params:{start:start,end:end},
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
export const GetUserGrowthMonthly = (start, end) => async (dispatch) => {
  let userToken = localStorage.getItem("token");
  console.log(userToken);
  console.log(start)
  try {
    let response = await axios.get(
      `${process.env.REACT_APP_API_SERVER}/admin/user/stat/monthly`,

      {
        params:{start:start,end:end},
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
export const GetUserData = (userId) => async (dispatch) => {
  let userToken = localStorage.getItem("token");
  console.log(userToken);
  console.log(userId)
  try {
    let response = await axios.get(
      `${process.env.REACT_APP_API_SERVER}/admin/user/req/${userId}`,
      {
        headers: { Authorization: `Bearer ${userToken}` },
      }
    );
    console.log(response.data[0])
  dispatch({type:Load_USER_SUCCESS,payload:response.data})
 
  } catch (error) {
    console.log(error);
    dispatch({ type: Load_DATA_FAILED });
  }
};
export const GetUserBlock = (userId) => async (dispatch) => {
  let userToken = localStorage.getItem("token");
  console.log(userToken);
  console.log(userId)
  try {
    let response = await axios.get(
      `${process.env.REACT_APP_API_SERVER}/admin/user/block/${userId}`,
      {
        headers: { Authorization: `Bearer ${userToken}` },
      }
    );
    console.log(response.data[0])
  dispatch({type:Load_USER_BlOCK_SUCCESS,payload:response.data[0].blacklist})
 
  } catch (error) {
    console.log(error);
    dispatch({ type: Load_DATA_FAILED });
  }
};
export const PutUserBlock = (userId,status) => async (dispatch) => {
  let userToken = localStorage.getItem("token");
  console.log(userToken);
  console.log(userId)
  try {
    let response = await axios.put(
      `${process.env.REACT_APP_API_SERVER}/admin/user/block/${userId}`,{status:status},
      {
        headers: { Authorization: `Bearer ${userToken}` },
      }
    );
    console.log(response.data)
  
  dispatch({type:Load_USER_BlOCK_SUCCESS,payload:response.data[0]})
 
  } catch (error) {
    console.log(error);
    dispatch({ type: Load_DATA_FAILED });
  }
};
export const PutUserGroupBlock = (userId,status) => async (dispatch) => {
  let userToken = localStorage.getItem("token");
  console.log(userToken);
  console.log(userId)
  try {
    let response = await axios.put(
      `${process.env.REACT_APP_API_SERVER}/admin/user/block/`,{status:status,user:userId},
      {
        headers: { Authorization: `Bearer ${userToken}` },
      }
    );
    console.log(response.data)
    dispatch({type:Load_USER_LIST_SUCCESS,payload:response.data})
  
  } catch (error) {
    console.log(error);
    dispatch({ type: Load_DATA_FAILED });
  }
};
export const GetUserList = (column,order) => async (dispatch) => {
  console.log(order)
  let userToken = localStorage.getItem("token");
  console.log(userToken);
  try {
    let response = await axios.get(
      `${process.env.REACT_APP_API_SERVER}/admin/user/list`,
      {
        params:{column:column,order:order},
        headers: { Authorization: `Bearer ${userToken}` },
      }
    );
    console.log(response.data)
  dispatch({type:Load_USER_LIST_SUCCESS,payload:response.data})
 
  } catch (error) {
    console.log(error);
    dispatch({ type: Load_DATA_FAILED });
  }
};
