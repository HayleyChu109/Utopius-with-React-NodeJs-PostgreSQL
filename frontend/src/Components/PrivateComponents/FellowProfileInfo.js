import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import jwt_decode from "jwt-decode";
import moment from "moment";

import MemberReqCollapse from "./MemberReqCollapse";
import FellowResCollapse from "./FellowResCollapse";
import FellowProfileReportBar from "./FellowProfileReportBar";
import GradeBall from "../PublicComponents/GradeBall";

import {
  followThunk,
  unFollowThunk,
} from "../../Redux/memberProfile/memberFollowActions";

import "../../Pages/SCSS/memberProfile.scss";
import "../../Pages/SCSS/searchCard.scss";
import { BsFillPersonPlusFill } from "react-icons/bs";

function FellowProfileInfo(props) {
  let followerId = jwt_decode(localStorage.getItem("token")).id;
  let followingId = Number(localStorage.getItem("reporteeId"));

  const followOrNot = useSelector(
    (state) => state.memberFollowUnfollowStore.follow
  );

  const memberProfileFromStore = useSelector(
    (state) => state.memberProfileStore.memberInfo
  );

  const memberReqDetailsFromStore = useSelector(
    (state) => state.memberReqDetailsStore.reqDetails
  );

  const memberResDetailsFromStore = useSelector(
    (state) => state.memberResDetailsStore.resDetails
  );

  const [showReq, setShowReq] = useState(true);
  const [following, setFollowing] = useState(false);

  const dispatch = useDispatch();
  const history = useHistory();

  const handleFollow = () => (following ? unfollow() : follow());

  const follow = () => {
    console.log(followerId, followingId);
    dispatch(followThunk({ followerId, followingId }));
  };

  const unfollow = () => {
    dispatch(unFollowThunk({ followerId, followingId }));
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
              <button
                className="float-end me-5 btn-white-blue"
                onClick={handleFollow}
              >
                {following ? "Following" : "Follow"}
              </button>
              <br />
              <span className="accountCreation">
                Account created since{" "}
                {moment(memberProfileFromStore.created_at).format("LL")}
              </span>
            </div>
            <br />
            <div>
              <BsFillPersonPlusFill className="mx-2 person person-icon" />
              <span className="person me-2">100</span>
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
