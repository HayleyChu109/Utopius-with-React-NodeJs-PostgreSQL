import React, { useState } from "react";
import NewRequest from "./NewRequest";

import { Collapse } from "reactstrap";
import "../../Pages/SCSS/memberProfile.scss";

function MemberProfileNewReq(props) {
  const [modalBoolean, setModalBoolean] = useState(false);

  const closeModal = () => {
    setModalBoolean(false);
  };

  return (
    <>
      <Collapse isOpen={props.isOpen}>
        <div className="container py-4">
          <div className="row">
            <div className="d-flex justify-content-center align-items-center col-lg-12 mb-5 memberProfileBottom-orange">
              <button
                className="btn-white-orange"
                onClick={() => setModalBoolean(true)}
              >
                NEW REQ
              </button>
            </div>
          </div>
        </div>
      </Collapse>
      <NewRequest isOpen={modalBoolean} close={closeModal} />
    </>
  );
}

export default MemberProfileNewReq;
