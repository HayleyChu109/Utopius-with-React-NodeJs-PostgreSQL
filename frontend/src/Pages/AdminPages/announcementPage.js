import { useEffect } from "react";
import '../SCSS/dashboard.scss'
import {Button} from 'react-bootstrap'
import { FaPlusCircle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { GetUserGrowth } from "../../Redux/adminData/action";
import AdminNavbar from "../../Components/PrivateComponents/admin/adminNavBar";
import { Card, Row, Col } from "react-bootstrap";
import LineBarComposed from "../../Components/PrivateComponents/admin/LineBarComposedchartComponent";
import { UserList } from "../../Components/PrivateComponents/admin/userList";
import { RequestList} from "../../Components/PrivateComponents/admin/requestList";
import { Link } from "react-router-dom";

export default function AnnouncementPage(props) {
  
  return (
    <>
    <AdminNavbar/>
      <h1>Announcement</h1>
      <p>Welcome back, admin!</p>
      <Button href="/admin/announcement/new"><FaPlusCircle/>Add new announcement</Button>
      <h3>Draft</h3>
      <h3>Published</h3>
  
      
    </>
  );
}
