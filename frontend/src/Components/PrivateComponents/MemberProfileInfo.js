import React, { useState } from "react";
import { useSelector } from "react-redux";
import MemberProfileEdit from "./MemberProfileEdit";
import MemberReqCollapse from "./MemberReqCollapse";
import MemberResCollapse from "./MemberResCollapse";

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
  const [show, setShow] = useState(false);
  const [disableReq, setDisableReq] = useState(false);
  const [disableRes, setDisableRes] = useState(false);

  return (
    <>
      <div className="container">
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
                  setShow(!show);
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
                  setShow(!show);
                  setDisableReq(!disableReq);
                }}
              >
                RES#{noOfRes}
              </button>
            </div>
          </div>
        </div>
      </div>
      <MemberProfileEdit isOpen={showEdit} />
      <MemberReqCollapse isOpen={show} />
      <MemberResCollapse isOpen={show} />
    </>
  );
}

export default MemberProfileInfo;
