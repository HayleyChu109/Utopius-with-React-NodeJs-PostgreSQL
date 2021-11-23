import React, { useState } from "react";
import ReportMember from "./ReportMember";

function FellowProfileReportBar() {
  const [modalBoolean, setModalBoolean] = useState(false);

  const closeModal = () => {
    setModalBoolean(false);
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
