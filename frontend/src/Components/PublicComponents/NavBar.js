import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import jwt_decode from "jwt-decode";

import { logoutUser } from "../../Redux/login/actions";
import { myInfoThunk } from "../../Redux/memberProfile/memberProfileActions";

import Search from "./Search";

import "../../Pages/SCSS/navBar.scss";

const NavBar = () => {
  const { isAuthenticated } = useSelector((state) => state.loginStore);
  const { myInfo } = useSelector((state) => state.memberProfileStore);
  const { requestDetail, requestStatusMessage } = useSelector(
    (state) => state.requestStore
  );

  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    if (isAuthenticated) {
      let userId = jwt_decode(localStorage.getItem("token")).id;
      dispatch(myInfoThunk(userId));
    }
  }, [dispatch, isAuthenticated, requestDetail, requestStatusMessage]);

  const logout = (e) => {
    e.preventDefault();
    dispatch(logoutUser());
    history.push("/login");
  };

  return (
    <>
      <div className="navbar">
        <div className="mx-3 py-2 row">
          <div className="col-2">
            <a href="/" className="nav-logo">
              <img
                src={"/utopius.png"}
                alt="logo"
                style={{ width: "20px", height: "20px" }}
                className="mb-1 me-2"
              />
              UTOPIUS
            </a>
          </div>
          <div className="navitems col-10 d-flex justify-content-end">
            {isAuthenticated ? (
              <>
                {myInfo && myInfo.username ? (
                  <span>Welcome back ! {myInfo.username} </span>
                ) : (
                  <span>Welcome ! </span>
                )}{" "}
                |
                <a
                  href="/logout"
                  onClick={(e) => {
                    logout(e);
                  }}
                >
                  LOG OUT
                </a>
              </>
            ) : (
              <a href="/login">LOGIN SIGNUP</a>
            )}
            |<a href="/member/profile">PROFILE</a>|
            {isAuthenticated ? (
              <a href="/member/token">
                TOKEN{myInfo && myInfo.token ? " : " + myInfo.token : " : " + 0}
              </a>
            ) : (
              <a href="/member/token">TOKEN</a>
            )}
            |<span>SEARCH</span>
            <Search />
          </div>
        </div>
      </div>
    </>
  );
};

export default NavBar;
