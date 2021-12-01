import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import jwt_decode from "jwt-decode";

import { memberInfoThunk } from "../../Redux/memberProfile/memberProfileActions";
import { memberReqDetailsThunk } from "../../Redux/memberProfile/memberReqDetailsActions";
import { memberResDetailsThunk } from "../../Redux/memberProfile/memberResDetailsActions";
import {
  followingListThunk,
  followerListThunk,
} from "../../Redux/memberProfile/memberFollowActions";
import { getReviewThunk } from "../../Redux/review/getReviewActions";
import { getBookmarkListThunk } from "../../Redux/request/actions";

import NavBar from "../../Components/PublicComponents/NavBar";
import MemberProfilePic from "../../Components/PrivateComponents/MemberProfilePic";
import MemberProfileInfo from "../../Components/PrivateComponents/MemberProfileInfo";

import Discover from "../../Components/PublicComponents/Discover";
import Footer from "../../Components/PublicComponents/Footer";

import "../SCSS/memberProfile.scss";
import "../SCSS/searchCard.scss";
import { BsStars } from "react-icons/bs";

const MemberProfilePage = () => {
  let memberId = jwt_decode(localStorage.getItem("token")).id;

  const memberProfileFromStore = useSelector(
    (state) => state.memberProfileStore.memberInfo
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(memberInfoThunk(memberId));
    dispatch(memberReqDetailsThunk(memberId));
    dispatch(memberResDetailsThunk(memberId));
    dispatch(followingListThunk(memberId));
    dispatch(followerListThunk(memberId));
    dispatch(getReviewThunk(memberId));
    dispatch(getBookmarkListThunk(memberId));
    return () => {
      localStorage.removeItem("requestId");
    };
  }, [dispatch, memberId]);

  return (
    <>
      <NavBar />
      <div className="container py-4">
        <div className="my-4 px-4 memberProfile-title">
          <BsStars className="mb-1 me-2" />
          PROFILE OF: <span>{memberProfileFromStore.username}</span>
        </div>
        <MemberProfilePic />
        <MemberProfileInfo />
      </div>
      <Discover />
      <Footer />
    </>
  );
};

export default MemberProfilePage;
