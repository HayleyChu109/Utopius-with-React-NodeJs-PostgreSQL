import React from "react";
import { Link } from "react-router-dom";
import { Collapse } from "reactstrap";

function MemberProfileEdit(props) {
  return (
    <>
      <Collapse isOpen={props.isOpen}>
        <div className="container py-4">
          <div className="row d-flex justify-content-center text-center">
            <div className="col-lg-12 mx-auto mb-5 memberProfileBg-orange">
              <Link to="/member/signup">
                <button className="btn-white-orange">EDIT</button>
              </Link>
            </div>
          </div>
        </div>
      </Collapse>
    </>
  );
}

export default MemberProfileEdit;
