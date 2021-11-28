import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import moment from "moment";

import MemberProfileEditBar from "./MemberProfileEditBar";
import BookmarkCollapse from "./BookmarkCollapse";
import MemberReqCollapse from "./MemberReqCollapse";
import MemberResCollapse from "./MemberResCollapse";
import MemberProfileNewReqBar from "./MemberProfileNewReqBar";
import GradeBall from "../PublicComponents/GradeBall";

import { FaCoins } from "react-icons/fa";
import { BsFillPersonPlusFill } from "react-icons/bs";
import { AiFillHeart } from "react-icons/ai";
import "../../Pages/SCSS/memberProfile.scss";
import "../../Pages/SCSS/searchCard.scss";

function MemberProfileInfo(props) {
  const [noOfBookmark, setNoOfBookmark] = useState("");

  const memberProfileFromStore = useSelector(
    (state) => state.memberProfileStore.memberInfo
  );

  const memberReqDetailsFromStore = useSelector(
    (state) => state.memberReqDetailsStore.reqDetails
  );

  const memberResDetailsFromStore = useSelector(
    (state) => state.memberResDetailsStore.resDetails
  );

  const bookmarkListFromStore = useSelector(
    (state) => state.getBookmarkStore.bookmark
  );

  let noOfReq = memberReqDetailsFromStore.length;
  let noOfRes = memberResDetailsFromStore.length;
  // let noOfBookmark = bookmarkListFromStore.length;

  const [showEdit, setShowEdit] = useState(true);
  const [showBookmark, setShowBookmark] = useState(false);
  const [showReq, setShowReq] = useState(false);
  const [showRes, setShowRes] = useState(false);
  const [disableBookmark, setDisableBookmark] = useState(false);
  const [disableReq, setDisableReq] = useState(false);
  const [disableRes, setDisableRes] = useState(false);

  const history = useHistory();

  useEffect(() => {
    setNoOfBookmark(bookmarkListFromStore.length);
  }, [bookmarkListFromStore]);

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
              <BsFillPersonPlusFill className="mx-2 person person-icon" />
              <span className="person me-2">100</span>
              <button
                disabled={disableBookmark}
                className="heart"
                onClick={() => {
                  setShowEdit(showEdit);
                  setShowBookmark(!showBookmark);
                  setDisableReq(!disableRes);
                  setDisableRes(!disableRes);
                }}
              >
                <AiFillHeart className="mx-2 heart-icon" />
                <span className="me-2">{noOfBookmark}</span>
              </button>
              <button
                disabled={disableReq}
                className="me-2 REQ"
                onClick={() => {
                  setShowEdit(!showEdit);
                  setShowReq(!showReq);
                  setDisableBookmark(!disableBookmark);
                  setDisableRes(!disableRes);
                }}
              >
                REQ#{noOfReq}
              </button>
              <button
                disabled={disableRes}
                className="RES"
                onClick={() => {
                  setShowEdit(!showEdit);
                  setShowRes(!showRes);
                  setDisableBookmark(!disableBookmark);
                  setDisableReq(!disableReq);
                }}
              >
                RES#{noOfRes}
              </button>
            </div>
          </div>
        </div>
      </div>
      <BookmarkCollapse isOpen={showBookmark} />
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
