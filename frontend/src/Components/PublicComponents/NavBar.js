// import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
// import { useHistory } from "react-router-dom";

import "../../Pages/SCSS/navBar.scss";

import { logoutUser } from "../../Redux/login/actions";

import Search from "./Search";

const NavBar = () => {
  const { isAuthenticated } = useSelector((state) => state.loginStore);

  const dispatch = useDispatch();

  const logout = () => {
    dispatch(logoutUser());
  };

  return (
    <>
      <div className="navbar">
        <div className="mx-3 py-2 row">
          <div className="col-2">
            <a href="/" className="nav-logo">
              UTOPIUS
            </a>
          </div>
          <div className="navitems col-10 d-flex justify-content-end">
            {isAuthenticated ? (
              <span onClick={logout}>LOG OUT</span>
            ) : (
              <a href="/login">LOGIN SIGNUP</a>
            )}
            |<a href="/member/info">INFO</a>|<a href="/member/req">REQ</a>|
            <a href="/member/res">RES</a>|
            <a href="/member/bookmark">BOOKMARK</a>|
            <a href="/member/token">TOKEN</a>|<span>SEARCH</span>
            <Search />
          </div>
        </div>
      </div>
    </>
  );
};

export default NavBar;
