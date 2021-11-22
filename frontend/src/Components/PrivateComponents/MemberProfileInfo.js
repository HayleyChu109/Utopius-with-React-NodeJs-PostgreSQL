import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";

import MemberProfileEditBar from "./MemberProfileEditBar";
import MemberReqCollapse from "./MemberReqCollapse";
import MemberResCollapse from "./MemberResCollapse";
import MemberProfileNewReqBar from "./MemberProfileNewReqBar";
import GradeBall from "../PublicComponents/GradeBall";

import { FaCoins } from "react-icons/fa";
import { BsFillPersonPlusFill } from "react-icons/bs";

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

  let noOfReq = memberReqDetailsFromStore.length;
  let noOfRes = memberResDetailsFromStore.length;

  const [showEdit, setShowEdit] = useState(true);
  const [showReq, setShowReq] = useState(false);
  const [showRes, setShowRes] = useState(false);
  const [disableReq, setDisableReq] = useState(false);
  const [disableRes, setDisableRes] = useState(false);

  const history = useHistory();

  return (
    <>
      <div className="container mt-5">
        <div className="row d-flex justify-content-center">
          <div className="col-lg-12 col-md-12 col-sm-12-col-xs-12 memberProfileInfo">
            <div className="username-id">
              <GradeBall grade={memberProfileFromStore.grade} />
              <span className="fw-bolder">
                {memberProfileFromStore.username} UID#
                {memberProfileFromStore.id}
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
                disabled={disableReq}
                className="me-2 REQ"
                onClick={() => {
                  setShowEdit(!showEdit);
                  setShowReq(!showReq);
                  setShowRes(showRes);
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
                  setShowReq(showReq);
                  setShowRes(!showRes);
                  setDisableReq(!disableReq);
                }}
              >
                RES#{noOfRes}
              </button>
            </div>
          </div>
        </div>
      </div>
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
