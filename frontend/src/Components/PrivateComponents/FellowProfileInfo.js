import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import MemberReqCollapse from "./MemberReqCollapse";
import FellowResCollapse from "./FellowResCollapse";
import FellowProfileReportBar from "./FellowProfileReportBar";

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

  let memberGrade = memberProfileFromStore.grade;
  let gradeColor = [];
  switch (memberGrade) {
    case "S":
      gradeColor.push("#fac77c");
      break;
    case "A":
      gradeColor.push("#fa7c92");
      break;
    case "B":
      gradeColor.push("#7c97fa");
      break;
    case "C":
      gradeColor.push("#52b46e");
      break;
    case "D":
      gradeColor.push("#152e87");
      break;
    case "E":
      gradeColor.push("#875915");
      break;
    case "F":
      gradeColor.push("#333333");
      break;
    default:
      gradeColor.push("#c4c4c4");
  }

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
              <span
                className="dot text-center me-2"
                style={{ background: gradeColor }}
              >
                {memberProfileFromStore.grade}
              </span>
              <span className="fw-bolder">
                {memberProfileFromStore.username} UID#
                {memberProfileFromStore.id}
              </span>
            </div>
            <br />
            <div>
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
      <MemberReqCollapse isOpen={showReq} />
      <FellowResCollapse isOpen={showRes} />
      <FellowProfileReportBar />
      <div className="text-center">
        <button className="mb-5 btn-goback" onClick={() => history.goBack()}>
          &#60; GO BACK
        </button>
      </div>
    </>
  );
}

export default MemberProfileInfo;
