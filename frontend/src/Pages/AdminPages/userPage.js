import { useEffect } from "react";
import '../SCSS/dashboard.scss'
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { GetUserGrowth,GetUserData } from "../../Redux/adminData/action";
import AdminNavbar from "../../Components/PrivateComponents/admin/adminNavBar";
import { Card, Row, Col } from "react-bootstrap";
import LineBarComposed from "../../Components/PrivateComponents/admin/LineBarComposedchartComponent";
import { Link,useParams } from "react-router-dom";
import { BsStars } from "react-icons/bs";
import MemberProfilePic from "../../Components/PrivateComponents/MemberProfilePic";
import MemberProfileInfo from "../../Components/PrivateComponents/MemberProfileInfo";
import UserProfileInfoAdmin from "../../Components/PrivateComponents/admin/UserProfileInfoAdmin";
import Footer from "../../Components/PublicComponents/Footer";
export default function UserPage(props) {
    const adminDataStore = useSelector((state) => state.adminDataStore);
    const {id}=useParams()
    console.log(id)
   const {requestUser}=adminDataStore.user
    const dispatch = useDispatch();
    useEffect(() => {
        console.log('dispatching')
      dispatch(
        GetUserData(id)
      );
    }, [dispatch,id]);
    console.log(adminDataStore);
    console.log(requestUser)
    return (
      <>
        <AdminNavbar />
        <div className="container py-4">
        <div className="my-4 px-4 memberProfile-title">
          <BsStars className="mb-1 me-2" />
          PROFILE OF: {requestUser.username?requestUser.username:'Not set'}
          <MemberProfilePic />
          <UserProfileInfoAdmin user={requestUser} />
        </div>
      </div>
      
      </>
    );
  }