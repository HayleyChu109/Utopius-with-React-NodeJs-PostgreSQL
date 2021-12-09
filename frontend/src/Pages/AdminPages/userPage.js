import { useEffect, useState } from "react";
import "../SCSS/dashboard.scss";
import { useDispatch, useSelector } from "react-redux";
import AdminNavbar from "../../Components/PrivateComponents/admin/adminNavBar";
import { useParams } from "react-router-dom";
import { Offcanvas, Button } from "react-bootstrap";
import { BsStars } from "react-icons/bs";
import { GiDiamonds } from "react-icons/gi";
import { GetUserData } from "../../Redux/adminData/action";
import { memberInfoThunk } from "../../Redux/memberProfile/memberProfileActions";
import { memberResDetailsThunk } from "../../Redux/memberProfile/memberResDetailsActions";
import { memberReqDetailsThunk } from "../../Redux/memberProfile/memberReqDetailsActions";
import { getReviewThunk } from "../../Redux/review/getReviewActions";
import { AnalysisComponent } from "../../Components/PrivateComponents/admin/AnalysisComponent";
import MemberProfilePic from "../../Components/PrivateComponents/MemberProfilePic";
import ProfileInfo from "../../Components/PrivateComponents/admin/ProfileInfo";
export default function UserPage() {
  const [show, setShow] = useState(false);
  const memberProfileFromStore = useSelector(
    (state) => state.memberProfileStore.memberInfo
  );
  const { id } = useParams();
  const dispatch = useDispatch();
  const handleClose = () => setShow(false);
  const toggleShow = () => setShow((s) => !s);
  useEffect(() => {
    dispatch(GetUserData(id));
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
          <button
            className="float-end btn-analytics p-2 rounded-pill border-3"
            onClick={toggleShow}
          >
            Analytics
          </button>
        </div>
        <MemberProfilePic />
        <ProfileInfo />
      </div>
      <Offcanvas
        show={show}
        onHide={handleClose}
        scroll={true}
        backdrop={true}
        placement="end"
        className="admin-offcanva"
      >
        <Offcanvas.Header closeButton className="user-canva">
          <Offcanvas.Title>
            {" "}
            <div className=" discover-title">
              <GiDiamonds className="me-2 mb-1" />
              Analytics
            </div>
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <AnalysisComponent />
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}
