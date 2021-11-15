import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import "../../Pages/SCSS/navBar.scss";

import { logoutUser } from "../../Redux/login/actions";

import Search from "./Search";

const logout = () => {
  dispatchEvent(logoutUser());
};

const NavBar = () => {
  const { isAuthenticated } = useSelector((state) => state.loginStore);

  return (
    <>
      <div className="navbar">
        <div className="mx-3 py-2">
          <a href="/" className="nav-logo">
            UTOPIUS
          </a>
          <div className="navitems">
            {isAuthenticated ? (
              <a onClick={logout}>LOG OUT</a>
            ) : (
              <a href="/login">LOGIN SIGNUP</a>
            )}
            |<a href="#">INFO</a>|<a href="#">REQ</a>|<a href="#">RES</a>|
            <a href="#">BOOKMARK</a>|<a href="#">TOKEN</a>|
            <a href="#">SEARCH</a>
            <Search />
          </div>
        </div>
      </div>
    </>
  );
};

export default NavBar;
