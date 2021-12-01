import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import jwt_decode from "jwt-decode";
import moment from "moment";

import MemberReqCollapse from "./MemberReqCollapse";
import FellowResCollapse from "./FellowResCollapse";
import FellowProfileReportBar from "./FellowProfileReportBar";
import GradeBall from "../PublicComponents/GradeBall";

import { followtoggleThunk } from "../../Redux/memberProfile/memberFollowActions";

import "../../Pages/SCSS/memberProfile.scss";
import "../../Pages/SCSS/searchCard.scss";
import { BsFillPersonPlusFill } from "react-icons/bs";
import { IoPersonAdd } from "react-icons/io5";

function FellowProfileInfo(props) {
  let followerId = jwt_decode(localStorage.getItem("token")).id;
  let followingId = localStorage.getItem("reporteeId");

  const memberProfileFromStore = useSelector(
    (state) => state.memberProfileStore.memberInfo
  );

  const memberReqDetailsFromStore = useSelector(
    (state) => state.memberReqDetailsStore.reqDetails
  );

  const memberResDetailsFromStore = useSelector(
    (state) => state.memberResDetailsStore.resDetails
  );

  const followerlist = useSelector(
    (state) => state.memberFollowUnfollowStore.followerlist
  );

  const followinglist = useSelector(
    (state) => state.memberFollowUnfollowStore.followinglist
  );

  const [showReq, setShowReq] = useState(true);

  const dispatch = useDispatch();
  const history = useHistory();

  const handleFollow = (followed) => {
    dispatch(followtoggleThunk(followerId, followingId, followed));
  };

  return (
    <>
      <div className="container mt-5">
        <div className="row d-flex justify-content-center">
          <div className="col-lg-12 col-md-12 col-sm-12-col-xs-12 memberProfileInfo">
            <div>
              <GradeBall grade={memberProfileFromStore.grade} />
              <span className="fw-bolder memberName">
                {memberProfileFromStore.username} UID#
                {memberProfileFromStore.id}
              </span>
              {followerlist.length > 0 &&
              followerlist.some((list) => list.followerId === followerId) ? (
                <button
                  className="float-end me-5 btn-dark-blue"
                  onClick={() => handleFollow(true)}
                >
                  Following
                </button>
              ) : (
                <button
                  className="float-end me-5 btn-white-blue"
                  onClick={() => handleFollow(false)}
                >
                  Follow
                </button>
              )}
              <br />
              <span className="accountCreation">
                Account created since{" "}
                {moment(memberProfileFromStore.created_at).format("LL")}
              </span>
            </div>
            <br />
            <div>
              <button
                className="me-2 REQ"
                onClick={() => {
                  setShowReq(true);
                }}
              >
                REQ#{memberReqDetailsFromStore.length}
              </button>
              <button
                className="RES"
                onClick={() => {
                  setShowReq(false);
                }}
              >
                RES#{memberResDetailsFromStore.length}
              </button>
              <IoPersonAdd className="mx-2 personTwo personTwo-icon" />
              <span className="personTwo me-2">
                Follower#{followerlist.length}
              </span>
              <BsFillPersonPlusFill className="mx-2 person person-icon" />
              <span className="person me-2">
                Following#{followinglist.length}
              </span>
            </div>
          </div>
        </div>
      </div>
      {showReq ? <MemberReqCollapse isOpen={showReq} /> : <FellowResCollapse />}

      <FellowProfileReportBar />
      <div className="text-center">
        <button className="mb-5 btn-goback" onClick={() => history.goBack()}>
          &#60; GO BACK
        </button>
      </div>
    </>
  );
}

export default FellowProfileInfo;
