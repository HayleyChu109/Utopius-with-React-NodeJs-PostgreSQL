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
import { memberInfoThunk } from "../../Redux/memberProfile/memberProfileActions";
import { memberResDetailsThunk } from "../../Redux/memberProfile/memberResDetailsActions";
import { memberReqDetailsThunk } from "../../Redux/memberProfile/memberReqDetailsActions";
import { getReviewThunk } from "../../Redux/review/getReviewActions";
import MemberProfilePic from "../../Components/PrivateComponents/MemberProfilePic";
import FellowProfileInfo from "../../Components/PrivateComponents/FellowProfileInfo";
import Discover from "../../Components/PublicComponents/Discover";
import MemberProfileInfo from "../../Components/PrivateComponents/MemberProfileInfo";
import UserProfileInfoAdmin from "../../Components/PrivateComponents/admin/UserProfileInfoAdmin";
import ProfileInfo from "../../Components/PrivateComponents/admin/ProfileInfo";
import Footer from "../../Components/PublicComponents/Footer";
export default function UserPage(props) {
  const memberProfileFromStore = useSelector(
    (state) => state.memberProfileStore.memberInfo
  );
const {id}=useParams()
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(memberInfoThunk(id));
    dispatch(memberReqDetailsThunk(id));
    dispatch(memberResDetailsThunk(id));
    dispatch(getReviewThunk(id));
  }, [dispatch, id]);

  return (
    <>
      <AdminNavbar />
      <div className="container py-4">
        <div className="my-4 px-4 memberProfile-title">
          <BsStars className="mb-1 me-2" />
          PROFILE OF: <span>{memberProfileFromStore.username}</span>
        </div>
        <MemberProfilePic />
        <ProfileInfo/>
      </div>
    </>
  );
}