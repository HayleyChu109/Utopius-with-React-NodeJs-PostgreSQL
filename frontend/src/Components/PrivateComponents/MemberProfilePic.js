import React from "react";

import "../../Pages/SCSS/memberProfile.scss";
import anonymous from "../../Images/anonymous.jpeg";

function MemberProfilePic() {
  return (
    <>
      <div className="container py-4">
        <div className="row d-flex justify-content-center text-center">
          <div className="col-lg-12 mx-auto my-4 position-relative memberProfilePic-bg-beige"></div>
          <div className="position-absolute memberProfilePic-position">
            <img src={anonymous} className="memberProfilePic" />
          </div>
          <div className="col-lg-12 mx-auto my-4 position-relative memberProfilePic-bg-white"></div>
        </div>
      </div>
    </>
  );
}

export default MemberProfilePic;
