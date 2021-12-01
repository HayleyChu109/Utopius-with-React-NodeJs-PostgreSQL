import React, { useState } from "react";
import { useDispatch } from "react-redux";
import ReportMember from "./ReportMember";
import { clearReportMsg } from "../../Redux/reportMember/reportMemberActions";

import "../../Pages/SCSS/memberProfile.scss";

function FellowProfileReportBar() {
  const [modalBoolean, setModalBoolean] = useState(false);

  const dispatch = useDispatch();

  const closeModal = () => {
    setModalBoolean(false);
    dispatch(clearReportMsg());
  };

  return (
    <>
      <div className="container py-4">
        <div className="row">
          <div className="d-flex justify-content-center align-items-center col-lg-12 mb-5 memberProfileBottom-blue">
            <button
              className="btn-white-blue"
              onClick={() => setModalBoolean(true)}
            >
              REPORT
            </button>
          </div>
        </div>
      </div>
      <ReportMember isOpen={modalBoolean} close={closeModal} />
    </>
  );
}

export default FellowProfileReportBar;
