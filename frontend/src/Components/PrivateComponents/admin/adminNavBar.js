import { useState, forwardRef } from "react";
import { useSelector, useDispatch } from "react-redux";
// import { useHistory } from "react-router-dom";
import { FaRegHandshake } from "react-icons/fa";
import "../../../Pages/SCSS/adminNavBar.scss";

import { logoutAdmin } from "../../../Redux/login/actions";
import { Dropdown, NavDropdown } from "react-bootstrap";
import Search from "../../PublicComponents/Search";

const AdminNavbar = () => {
  const { isAuthenticated } = useSelector((state) => state.loginStore);

  const [dropdown, setDropdown] = useState(false);
  const CustomToggle = forwardRef(({ children, onClick }, ref) => (
    <a
      href="/admin/token"
      ref={ref}
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
    >
      {children}
    </a>
  ));

  const dispatch = useDispatch();
  const openDropdown = () => {
    setDropdown(true);
  };
  const closeDropdown = () => {
    setDropdown(false);
  };
  const logout = (e) => {
    e.preventDefault();
    dispatch(logoutAdmin());
  };

  return (
    <>
      <div className="navbarAdmin">
        <div className="mx-3 py-2 row">
          <div className="col-2">
            <a href="/admin" className="nav-logo">
              <FaRegHandshake className="mx-2" />
              UTOPIUS
            </a>
          </div>
          <div className="navitems col-10 d-flex justify-content-end">
            {isAuthenticated ? (
              <a
                href="/logout"
                onClick={(e) => {
                  logout(e);
                }}
              >
                LOG OUT
              </a>
            ) : (
              <a href="/login">LOGIN SIGNUP</a>
            )}
            |<a href="/admin/dashboard">DASHBOARD</a>|
            <a href="/admin/request">REQ</a>|<a href="/admin/user">USER</a>|
            <a href="/admin/announcement">ANNOUNCEMENT</a>|
            <a href="/admin/task">TASK</a>|<a href="/admin/token">TOKEN</a>|
            <span>SEARCH</span>
            <Search />
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminNavbar;
