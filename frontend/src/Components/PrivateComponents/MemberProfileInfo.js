import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import moment from "moment";

import MemberProfileEditBar from "./MemberProfileEditBar";
import BookmarkCollapse from "./BookmarkCollapse";
import MemberReqCollapse from "./MemberReqCollapse";
import MemberResCollapse from "./MemberResCollapse";
import FollowerCollapse from "./FollowerCollapse";
import FollowingCollapse from "./FollowingCollapse";
import MemberProfileNewReqBar from "./MemberProfileNewReqBar";
import GradeBall from "../PublicComponents/GradeBall";

import { FaCoins } from "react-icons/fa";
import { BsFillPersonPlusFill } from "react-icons/bs";
import { IoPersonAdd } from "react-icons/io5";
import { AiFillHeart } from "react-icons/ai";
import "../../Pages/SCSS/memberProfile.scss";
import "../../Pages/SCSS/searchCard.scss";

function MemberProfileInfo(props) {
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

  const bookmarkId = useSelector((state) => state.requestStore.bookmarkList);

  const [showEdit, setShowEdit] = useState(true);
  const [showReq, setShowReq] = useState(false);
  const [showRes, setShowRes] = useState(false);
  const [showBookmark, setShowBookmark] = useState(false);
  const [showFollower, setShowFollower] = useState(false);
  const [showFollowing, setShowFollowing] = useState(false);

  const [disableReq, setDisableReq] = useState(false);
  const [disableRes, setDisableRes] = useState(false);
  const [disableBookmark, setDisableBookmark] = useState(false);
  const [disableFollower, setDisableFollower] = useState(false);
  const [disableFollowing, setDisableFollowing] = useState(false);

  const history = useHistory();

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
              <br />
              <span className="accountCreation">
                Account created since{" "}
                {moment(memberProfileFromStore.created_at).format("LL")}
              </span>
            </div>
            <br />
            <table>
              <tbody>
                <tr>
                  <td className="fw-bolder">First Name:</td>
                  <td className="ps-4">{memberProfileFromStore.firstName}</td>
                </tr>
                <tr>
                  <td className="fw-bolder">Last Name:</td>
                  <td className="ps-4">{memberProfileFromStore.lastName}</td>
                </tr>
                <tr>
                  <td className="fw-bolder">Phone:</td>
                  <td className="ps-4">{memberProfileFromStore.phone}</td>
                </tr>
                <tr>
                  <td className="fw-bolder">Email:</td>
                  <td className="ps-4">{memberProfileFromStore.email}</td>
                </tr>
                <tr>
                  <td className="fw-bolder">Distict:</td>
                  <td className="ps-4">{memberProfileFromStore.district}</td>
                </tr>
              </tbody>
            </table>
            <br />
            <div>
              <FaCoins className="mx-2 coin" />
              <span className="coin me-2">{memberProfileFromStore.token}</span>
              <button
                disabled={disableBookmark}
                className="me-2 heart"
                onClick={() => {
                  setShowEdit(showEdit);
                  setShowBookmark(!showBookmark);
                  setDisableReq(!disableRes);
                  setDisableRes(!disableRes);
                  setDisableFollower(!disableFollower);
                  setDisableFollowing(!disableFollowing);
                }}
              >
                <AiFillHeart className="mx-2 heart-icon" />
                {bookmarkId.length}
              </button>
              <button
                disabled={disableReq}
                className="me-2 REQ"
                onClick={() => {
                  setShowEdit(!showEdit);
                  setShowReq(!showReq);
                  setDisableRes(!disableRes);
                  setDisableBookmark(!disableBookmark);
                  setDisableFollower(!disableFollower);
                  setDisableFollowing(!disableFollowing);
                }}
              >
                REQ#{memberReqDetailsFromStore.length}
              </button>
              <button
                disabled={disableRes}
                className="RES"
                onClick={() => {
                  setShowEdit(!showEdit);
                  setShowRes(!showRes);
                  setDisableReq(!disableReq);
                  setDisableBookmark(!disableBookmark);
                  setDisableFollower(!disableFollower);
                  setDisableFollowing(!disableFollowing);
                }}
              >
                RES#{memberResDetailsFromStore.length}
              </button>
              <button
                disabled={disableFollower}
                className="follower me-2"
                onClick={() => {
                  setShowEdit(true);
                  setShowFollower(!showFollower);
                  setDisableReq(!disableReq);
                  setDisableRes(!disableRes);
                  setDisableBookmark(!disableBookmark);
                  setDisableFollowing(!disableFollowing);
                }}
              >
                <IoPersonAdd className="mx-2 follower-icon" />
                Follower#{followerlist.length}
              </button>
              <button
                disabled={disableFollowing}
                className="following me-2"
                onClick={() => {
                  setShowEdit(true);
                  setShowFollowing(!showFollowing);
                  setDisableReq(!disableReq);
                  setDisableRes(!disableRes);
                  setDisableBookmark(!disableBookmark);
                  setDisableFollower(!disableFollower);
                }}
              >
                <BsFillPersonPlusFill className="mx-2 following-icon" />
                Following#{followinglist.length}
              </button>
            </div>
          </div>
        </div>
      </div>
      <BookmarkCollapse isOpen={showBookmark} />
      <FollowerCollapse isOpen={showFollower} list={followerlist} />
      <FollowingCollapse isOpen={showFollowing} list={followinglist} />
      <MemberProfileEditBar isOpen={showEdit} />
      <MemberReqCollapse isOpen={showReq} />
      <MemberResCollapse isOpen={showRes} />
      <MemberProfileNewReqBar isOpen={!showEdit} />
      <div className="text-center">
        <button className="mb-5 btn-goback" onClick={() => history.goBack()}>
          &#60; GO BACK
        </button>
      </div>
    </>
  );
}

export default MemberProfileInfo;
