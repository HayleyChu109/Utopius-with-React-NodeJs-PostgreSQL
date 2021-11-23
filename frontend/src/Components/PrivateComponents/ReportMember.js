import React, { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";

import { Modal, ModalBody, ModalFooter, Button } from "reactstrap";
import "../../Pages/SCSS/reportMember.scss";

function ReportMember(props) {
  const [title, setTitle] = useState("");
  const [detail, setDetail] = useState("");

  let reporterId = jwt_decode(localStorage.getItem("token")).id;
  let reporteeId = localStorage.getItem("requesterId");
  console.log(reporteeId, reporterId);

  useEffect(() => {
    setTitle(`Report Member UID#${reporteeId}`);
  });

  return (
    <>
      <div>
        <Modal
          isOpen={props.isOpen}
          centered
          contentClassName="custom-modal-style new-report-modal"
        >
          <ModalBody className="p-5">
            <div className="new-report-heading p-3">Report Member</div>
            <form classForm="p-3 new-report-form">
              <label>Title</label>
              <br />
              <input
                value={title}
                type="text"
                className="form-control input-text"
                onChange={(e) => setTitle(e.target.value)}
                disabled
              />
              <br />
              <label className="label">Detail</label>
              <br />
              <textarea
                value={detail}
                className="form-control input-text"
                rows="7"
                onChange={(e) => setDetail(e.currentTarget.value)}
                required
              ></textarea>
            </form>
          </ModalBody>
          <ModalFooter className="new-report-modal-footer">
            <div className="mx-auto">
              <Button className="me-4 btn-dark-grey" onClick={props.close}>
                CLOSE
              </Button>
              <Button className="btn-dark-blue">REPORT</Button>
            </div>
          </ModalFooter>
        </Modal>
      </div>
    </>
  );
}

export default ReportMember;
