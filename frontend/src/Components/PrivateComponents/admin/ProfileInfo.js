import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import moment from "moment";

import MemberReqCollapse from "../MemberReqCollapse";
import FellowResCollapse from "../FellowResCollapse";
import GradeBall from "../../PublicComponents/GradeBall";
import { BlockStatusBar } from "./blockStatusBar";

import "../../../Pages/SCSS/memberProfile.scss";
import "../../../Pages/SCSS/searchCard.scss";
import { BsFillPersonPlusFill } from "react-icons/bs";

function ProfileInfo(props) {
  const memberProfileFromStore = useSelector(
    (state) => state.memberProfileStore.memberInfo
  );

  const memberReqDetailsFromStore = useSelector(
    (state) => state.memberReqDetailsStore.reqDetails
  );

  const memberResDetailsFromStore = useSelector(
    (state) => state.memberResDetailsStore.resDetails
  );

  let noOfReq = memberReqDetailsFromStore.length;
  let noOfRes = memberResDetailsFromStore.length;

  const [showReq, setShowReq] = useState(true);

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
            <div>
              <BsFillPersonPlusFill className="mx-2 person person-icon" />
              <span className="person me-2">100</span>
              <button
                className="me-2 REQ"
                onClick={() => {
                  setShowReq(true);
                }}
              >
                REQ#{noOfReq}
              </button>
              <button
                className="RES"
                onClick={() => {
                  setShowReq(false);
                }}
              >
                RES#{noOfRes}
              </button>
            </div>
          </div>
        </div>
      </div>
      {showReq ? <MemberReqCollapse isOpen={showReq} /> : <FellowResCollapse />}
        <BlockStatusBar/>
      <div className="text-center">
        <button className="mb-5 btn-goback" onClick={() => history.goBack()}>
          &#60; GO BACK
        </button>
      </div>
    </>
  );
}

export default ProfileInfo;
