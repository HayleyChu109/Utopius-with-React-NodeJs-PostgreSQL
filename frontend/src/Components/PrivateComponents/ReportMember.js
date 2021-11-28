import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import jwt_decode from "jwt-decode";
import { submitReportThunk } from "../../Redux/reportMember/reportMemberActions";

import { Modal, ModalBody, ModalFooter, Button, Form, Input } from "reactstrap";
import "../../Pages/SCSS/reportMember.scss";

function ReportMember(props) {
  const { reportId, successMsg } = useSelector(
    (state) => state.reportMemberStore
  );

  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");

  const dispatch = useDispatch();

  let reporterId = jwt_decode(localStorage.getItem("token")).id;
  let reporteeId = Number(localStorage.getItem("reporteeId"));

  useEffect(() => {
    setTitle(`Report Member UID#${reporteeId}`);
  }, [reporteeId]);

  const submitReport = (e) => {
    e.preventDefault();
    dispatch(submitReportThunk(reporterId, reporteeId, title, message));
    setMessage("");
  };

  return (
    <>
      <div>
        <Modal
          isOpen={props.isOpen}
          centered
          contentClassName="custom-modal-style new-report-modal"
        >
          <Form classForm="p-3 new-report-form" onSubmit={submitReport}>
            <ModalBody className="p-5">
              <div className="new-report-heading p-3">Report Member</div>
              <label>Title</label>
              <br />
              <Input
                value={title}
                type="text"
                className="form-control input-text"
                onChange={(e) => setTitle(e.target.value)}
                disabled
              />
              <br />
              <label className="label">Message</label>
              <br />
              <Input
                value={message}
                type="textarea"
                className="form-control input-text"
                rows="7"
                maxLength="250"
                onChange={(e) => setMessage(e.currentTarget.value)}
                check
              />
              {successMsg ? (
                <div className="mt-4 text-center report-successMsg">
                  <span>Report Reference ID: {reportId}</span>
                  <br />
                  {successMsg}
                </div>
              ) : null}
            </ModalBody>
            <ModalFooter className="new-report-modal-footer">
              <div className="mx-auto">
                <Button className="me-4 btn-dark-grey" onClick={props.close}>
                  CLOSE
                </Button>
                <Button className="btn-dark-blue" type="submit">
                  REPORT
                </Button>
              </div>
            </ModalFooter>
          </Form>
        </Modal>
      </div>
    </>
  );
}

export default ReportMember;
