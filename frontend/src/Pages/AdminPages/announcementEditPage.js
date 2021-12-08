import { useState, useCallback, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { DateSelection } from "../../Components/PrivateComponents/admin/dateSelection";
import {
  PutStartDate,
  PutEndDate,
  GetAnnouncement,
  PutTitle,
  DeleteDraft,
  PostAnnouncement,
  DeleteAnnouncement,
  PutAnnouncement,
} from "../../Redux/announceData/action";
import parse from "html-react-parser";

import { TextEditor } from "../../Components/PrivateComponents/TextEditor";
import draftToHtml from "draftjs-to-html";

import "../SCSS/announce.scss";

import { useHistory, useParams } from "react-router";

import DayPickerInput from "react-day-picker/DayPickerInput";
import moment from "moment";

import { formatDate, parseDate } from "react-day-picker/moment";
import "react-day-picker/lib/style.css";
import { Button, Form, Modal } from "react-bootstrap";
import "../SCSS/dashboard.scss";
import AdminNavbar from "../../Components/PrivateComponents/admin/adminNavBar";

export function AnnouncemnetEditPage() {
  const { title, data, startDate, endDate } = useSelector(
    (state) => state.announceStore.draft
  );

  const { id } = useParams();
  console.log(id);
  console.log(startDate);
  const dispatch = useDispatch();
  const history = useHistory();
  const [modal, setModal] = useState(false);
  const [save, setSave] = useState(false);
  const handleClose = () => setModal(false);
  const handleShow = () => setModal(true);
  const handleSaveClose = () => setSave(false);
  const handleSaveShow = () => setSave(true);
  const handleStartDate = (e) => {
    if(e&&e<endDate)
    {
    dispatch(PutStartDate(new Date(e)));
    }
  };
  const handleEndDate = (e) => {
    if(e&&e>startDate)
    {
    dispatch(PutEndDate(new Date(e)));
    }
  };
  const handlePublish = () => {
    if (id === undefined) {
      dispatch(PostAnnouncement(title, data, false, startDate, endDate));
      dispatch(DeleteDraft());
    } else {
      dispatch(PutAnnouncement(id, title, data, false, startDate, endDate));
      dispatch(DeleteDraft());
    }
    setSave(false);
    history.push("/admin/announcement");
  };
  const handleSaveDraft = () => {
    if (id === undefined) {
      dispatch(PostAnnouncement(title, data, true, startDate, endDate));
      dispatch(DeleteDraft());
    } else {
      dispatch(PutAnnouncement(id, title, data, true, startDate, endDate));
      dispatch(DeleteDraft());
    }
    setSave(false);
    history.push("/admin/announcement");
  };
  useEffect(() => {
    if (id !== undefined) {
      dispatch(GetAnnouncement(id));
    }
  }, [dispatch, id]);

  const handleDiscard = useCallback(() => {
    if (id === undefined) {
      dispatch(DeleteDraft());
    } else {
      dispatch(DeleteAnnouncement(id));
    }
    history.push("/admin/announcement");
  }, [history, dispatch, id]);

  return (
    <>
      <AdminNavbar />
      <div>
        <Form.Control
          type="text"
          name="title"
          value={title}
          placeholder="title"
          className="ms-4 mt-4 mx-auto title-bar"
          onChange={(e) => dispatch(PutTitle(e.target.value))}
        />
        <div className="float-end me-3 mt-3">
          <Button className="m-2" onClick={handleShow}>
            Preview
          </Button>
          <Button className="m-2" onClick={handleSaveShow}>
            Save
          </Button>
          <Button className="m-2" variant="danger" onClick={handleDiscard}>
            Discard
          </Button>
        </div>
        <div className="mx-auto"></div>
      </div>

      <div className="px-3">
        {id ? (
          <DateSelection startDate={startDate} endDate={endDate} />
        ) : (
          <DateSelection startDate={startDate} endDate={endDate} />
        )}
        <label htmlFor="content">Content</label>
        {Object.keys(data).length > 0 && id ? (
          <TextEditor data={data} />
        ) : !id ? (
          <TextEditor data={null} />
        ) : null}
      </div>

      <Modal show={modal} onHide={handleClose} size="xl" scrollable={true}>
        <Modal.Header closeButton>
          <Modal.Title>Preview</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h2>{title}</h2>
          {data ? (
            parse(
              draftToHtml(data, {
                trigger: "#",
                separator: " ",
              })
            )
          ) : (
            <p className="text-center">Write something ✍️</p>
          )}
        </Modal.Body>
        <Modal.Footer className="admin-footer">
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={save} onHide={handleSaveClose} scrollable={true}>
        <Modal.Header closeButton>
          <Modal.Title>Save</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you ready to publish the announcement?</Modal.Body>
        <Modal.Footer className="admin-footer">
          <Button variant="primary" onClick={handlePublish}>
            Publish
          </Button>
          <Button variant="primary" onClick={handleSaveDraft}>
            Save as draft
          </Button>
          <Button variant="secondary" onClick={handleSaveClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AnnouncemnetEditPage;
