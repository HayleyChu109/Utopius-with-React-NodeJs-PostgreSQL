import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { memberInfoThunk } from "../../Redux/memberProfile/memberProfileActions";

import { FaCoins } from "react-icons/fa";
import { BsFillPersonPlusFill } from "react-icons/bs";
import "../../Pages/SCSS/memberProfile.scss";

function MemberProfileInfo() {
  const memberProfileFromStore = useSelector(
    (state) => state.memberProfileStore.memberInfo
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(memberInfoThunk());
  }, [dispatch]);

  return (
    <>
      <div className="container">
        <div className="row d-flex justify-content-center">
          <div className="memberProfileInfo">
            <span
              className="dot text-center me-2"
              //   style={{ background: request.gradeColor }}
            >
              {/* {memberProfileFromStore.grade} */}
            </span>
            <span>{memberProfileFromStore.username}</span>
            <br />
            <p>First Name: {memberProfileFromStore.firstName}</p>
            <p>Last Name: {memberProfileFromStore.lastName}</p>
            <p>Phone: {memberProfileFromStore.phone}</p>
            <p>Email: {memberProfileFromStore.email}</p>
            <p>District: {memberProfileFromStore.district}</p>
            <div>
              <FaCoins className="mx-2 coin" />
              <span className="coin me-2">{memberProfileFromStore.token}</span>
              <BsFillPersonPlusFill className="mx-2 person person-icon" />
              {/* <span className="person me-2">{request.requiredPpl}</span> */}
              REQ # RES #
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default MemberProfileInfo;
