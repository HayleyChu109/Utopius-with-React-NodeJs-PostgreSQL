import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

import { memberInfoThunk } from "../../Redux/memberProfile/memberProfileActions";
import { memberReqDetailsThunk } from "../../Redux/memberProfile/memberReqDetailsActions";
import { memberResDetailsThunk } from "../../Redux/memberProfile/memberResDetailsActions";
import { getReviewThunk } from "../../Redux/review/getReviewActions";

import NavBar from "../../Components/PublicComponents/NavBar";
import MemberProfilePic from "../../Components/PrivateComponents/MemberProfilePic";
import FellowProfileInfo from "../../Components/PrivateComponents/FellowProfileInfo";

import Discover from "../../Components/PublicComponents/Discover";
import Footer from "../../Components/PublicComponents/Footer";

import "../SCSS/memberProfile.scss";
import "../SCSS/searchCard.scss";
import { BsStars } from "react-icons/bs";

function FellowProfilePage() {
  const { fellowId } = useParams();

  localStorage.setItem("reporteeId", fellowId);

  const memberProfileFromStore = useSelector(
    (state) => state.memberProfileStore.memberInfo
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(memberInfoThunk(fellowId));
    dispatch(memberReqDetailsThunk(fellowId));
    dispatch(memberResDetailsThunk(fellowId));
    dispatch(getReviewThunk(fellowId));

    return () => {
      localStorage.removeItem("reporteeId");
    };
  }, [dispatch, fellowId]);

  return (
    <>
      <NavBar />
      <div className="container py-4">
        <div className="my-4 px-4 memberProfile-title">
          <BsStars className="mb-1 me-2" />
          PROFILE OF: <span>{memberProfileFromStore.username}</span>
        </div>
        <MemberProfilePic />
        <FellowProfileInfo />
      </div>
      <Discover />
      <Footer />
    </>
  );
}

export default FellowProfilePage;
