import React from "react";
import { useHistory } from "react-router-dom";

import { Collapse } from "reactstrap";
import "../../Pages/SCSS/memberProfile.scss";

function MemberProfileEdit(props) {
  const history = useHistory();

  const linktosignup = () => {
    history.push("/member/signup");
  };
  return (
    <>
      <Collapse isOpen={props.isOpen}>
        <div className="container py-4">
          <div className="row">
            <div className="d-flex justify-content-center align-items-center col-lg-12 mb-5 memberProfileBottom-orange">
              <button className="btn-white-orange" onClick={linktosignup}>
                EDIT
              </button>
            </div>
          </div>
        </div>
      </Collapse>
    </>
  );
}

export default MemberProfileEdit;
