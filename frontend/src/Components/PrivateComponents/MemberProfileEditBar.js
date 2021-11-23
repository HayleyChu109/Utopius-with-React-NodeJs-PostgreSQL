import React from "react";
import { Link, useHistory } from "react-router-dom";

import { Collapse } from "reactstrap";

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
              {/* <Link to="/member/signup"> */}
              <button className="btn-white-orange" onClick={linktosignup}>
                EDIT
              </button>
              {/* </Link> */}
            </div>
          </div>
        </div>
      </Collapse>
    </>
  );
}

export default MemberProfileEdit;
