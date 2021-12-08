import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import jwt_decode from "jwt-decode";
import moment from "moment";

import MemberReqCollapse from "./MemberReqCollapse";
import FellowResCollapse from "./FellowResCollapse";
import FollowerCollapse from "./FollowerCollapse";
import FollowingCollapse from "./FollowingCollapse";
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

  const [showReq, setShowReq] = useState(false);
  const [showRes, setShowRes] = useState(false);
  const [showFollower, setShowFollower] = useState(false);
  const [showFollowing, setShowFollowing] = useState(false);

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
                  setShowRes(false);
                  setShowFollower(false);
                  setShowFollowing(false);
                }}
              >
                REQ#{memberReqDetailsFromStore.length}
              </button>
              <button
                className="RES"
                onClick={() => {
                  setShowReq(false);
                  setShowRes(true);
                  setShowFollower(false);
                  setShowFollowing(false);
                }}
              >
                RES#{memberResDetailsFromStore.length}
              </button>
              <button
                className="follower me-2"
                onClick={() => {
                  setShowReq(false);
                  setShowRes(false);
                  setShowFollower(true);
                  setShowFollowing(false);
                }}
              >
                <IoPersonAdd className="mx-2 follower-icon" />
                Follower#{followerlist.length}
              </button>
              <button
                className="following me-2"
                onClick={() => {
                  setShowReq(false);
                  setShowRes(false);
                  setShowFollower(false);
                  setShowFollowing(true);
                }}
              >
                <BsFillPersonPlusFill className="mx-2 following-icon" />
                Following#{followinglist.length}
              </button>
            </div>
          </div>
        </div>
      </div>
      <MemberReqCollapse isOpen={showReq} />
      <FellowResCollapse isOpen={showRes} />
      <FollowerCollapse isOpen={showFollower} list={followerlist} />
      <FollowingCollapse isOpen={showFollowing} list={followinglist} />
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
