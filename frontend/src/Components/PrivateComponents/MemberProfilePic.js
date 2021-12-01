import React from "react";
import { useSelector } from "react-redux";

import "../../Pages/SCSS/memberProfile.scss";

function MemberProfilePic(props) {
  const memberProfileFromStore = useSelector(
    (state) => state.memberProfileStore.memberInfo
  );

  return (
    <>
      <div className="container">
        <div className="row d-flex justify-content-center text-center">
          <div className="col-lg-12 mx-auto my-4 position-relative memberProfileBg-beige"></div>
          <div className="position-absolute memberProfilePic-position">
            {memberProfileFromStore.profilePath ? (
              <img
                src={memberProfileFromStore.profilePath}
                alt="profile pic"
                className="memberProfilePic"
              />
            ) : (
              <img
                src="https://utopius.s3.ap-southeast-1.amazonaws.com/anonymous.jpeg"
                alt="profile pic"
                className="memberProfilePic"
              />
            )}
          </div>
          <div className="col-lg-12 mx-auto my-4 position-relative memberProfileBg-white"></div>
        </div>
      </div>
    </>
  );
}

export default MemberProfilePic;
