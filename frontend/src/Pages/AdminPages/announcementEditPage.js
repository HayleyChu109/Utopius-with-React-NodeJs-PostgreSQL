import { useState,useMemo, useRef, useCallback, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  PutDraft,
  PutStartDate,
  PutEndDate,GetAnnouncement,
  PutTitle,
  DeleteDraft,PostAnnouncement,DeleteAnnouncement,PutAnnouncement
} from "../../Redux/announceData/action";
import { createReactEditorJS } from "react-editor-js";
import Embed from '@editorjs/embed';
import Output from "editorjs-react-renderer";
import "../SCSS/announce.scss";
import Header from "@editorjs/header";
import Table from "@editorjs/table";
import List from "@editorjs/list";
import LinkTool from "@editorjs/link";
import { useHistory, useParams } from "react-router";
import ImageTool from "@editorjs/image";
import S3 from "react-aws-s3";
import { announceConfig } from "../../s3Bucket/s3Config";
import DayPickerInput from "react-day-picker/DayPickerInput";
import moment from "moment";
import { formatDate, parseDate } from "react-day-picker/moment";
import "react-day-picker/lib/style.css";
import { Button, Modal } from "react-bootstrap";
import AdminNavbar from "../../Components/PrivateComponents/admin/adminNavBar";

export function AnnouncemnetEditPage() {
  const { title, data, startDate, endDate} = useSelector(
    (state) => state.announceStore.draft
  );

  const { id } = useParams();
  console.log(id);
  console.log(data);
  const dispatch = useDispatch();
  const ReactS3Client = new S3(announceConfig);
  const ReactEditorJS = createReactEditorJS();
  const [modal, setModal] = useState(false);
  const [save, setSave] = useState(false);
  const handleClose = () => setModal(false);
  const handleShow = () => setModal(true);
  const handleSaveClose = () => setSave(false);
  const handleSaveShow = () => setSave(true);
  const handlePublish = () => {
    if(id===undefined){
      dispatch(PostAnnouncement(title,data,false))
      dispatch(DeleteDraft())

    }else{
    dispatch(PutAnnouncement(id,title,data,false))
    dispatch(DeleteDraft())

    }
    setSave(false);
    history.push('/admin/announcement')
  };
  const handleSaveDraft = () => {
    if(id===undefined)
    {
    dispatch(PostAnnouncement(title,data,true))
    dispatch(DeleteDraft())
  }else{
    dispatch(PutAnnouncement(id,title,data,true))
    dispatch(DeleteDraft())

  }
  setSave(false);
    history.push('/admin/announcement')
  };
  useEffect(() => {
    if(id!==undefined)
    {
      dispatch(GetAnnouncement(id))

    }
  }, [dispatch,id]);
  const EDITOR_JS_TOOLS = {
    // NOTE: Paragraph is default tool. Declare only when you want to change paragraph option.
    // paragraph: Paragraph,
    embed: {
      class: Embed,
      config: {
        services: {
          youtube: true,
        }
      },
    },
    table: Table,
    list: List,
    // warning: Warning,
    // code: Code,

    image: {
      class: ImageTool,
      config: {
        uploader: {
          uploadByFile(file) {
            console.log(file);
            return ReactS3Client.uploadFile(file)
              .then((data) => {
                console.log(data.location);
                return {
                  success: 1,
                  file: {
                    url: data.location,
                  },
                };
              })
              .catch((e) => console.log(e));
          },
        },
      },
    },
    // raw: Raw,
    header: Header,
    // quote: Quote,
    // marker: Marker,
    // checklist: CheckList,
    // delimiter: Delimiter,
    // inlineCode: InlineCode,
    // simpleImage: SimpleImage,
  };
  const history = useHistory();
  const editorJS = useRef(null || data);

  
  const handleInitialize = useCallback((instance) => {
    editorJS.current = instance;
  }, []);

  const handleSave = useCallback(async () => {
    const savedData = await editorJS.current.save();
    console.log(savedData);
    dispatch(PutDraft(savedData));
  }, [dispatch]);
  const handleDiscard = useCallback(() => {
    if(id===undefined)
    {

    dispatch(DeleteDraft());
  
    }else{
      dispatch(DeleteAnnouncement(id))
    }
    history.push("/admin/announcement");
  }, [history, dispatch,id]);
  const modifiers = { start: startDate, end: endDate };
  let end = HTMLInputElement | null;
  const showFromMonth = () => {
    if (!startDate) {
      return;
    }
    if (moment(endDate).diff(moment(startDate), "months") < 2) {
      end.getDayPicker().showMonth(endDate);
    }
  };

  const handleToChange = (to) => {
    dispatch(PutEndDate(to));
    showFromMonth();
  };
  return (
    <>
      <AdminNavbar />
      <Button>Go Back</Button>
      <div className="d-flex ">
        <div
          style={{
            backgroundColor: "beige",
            width: "80vw",
            height: "90vh",
            margin: "5vh auto 5vh",
            justifyContent: "center",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <label htmlFor="title">Title</label>
          <br />
          <input
            type="text"
            name="title"
            value={title}
            onChange={(e) => dispatch(PutTitle(e.target.value))}
          />
          <br />
          <label htmlFor="content">Content</label>
          <div
            className="d-flex flex-column mx-auto"
            style={{
              backgroundColor: "white",
              width: "70vw",
              height: "70vh",
              overflow: "auto",
            }}
          >
            <ReactEditorJS
              onInitialize={handleInitialize}
              placeholder="Enter your content"
              defaultValue={data}
              tools={EDITOR_JS_TOOLS}
              onChange={() => handleSave()}
            />
          </div>
          <div className="d-flex justify-content-center">
            <div className="d-flex flex-column mx-5">
              <label htmlFor="">From:</label>
              <DayPickerInput
                placeholder="from"
                value={startDate}
                formatDate={formatDate}
                parseDate={parseDate}
                onDayChange={(day) => dispatch(PutStartDate(day))}
                dayPickerProps={{
                  selectedDays: [startDate, { startDate, endDate }],
                  disabledDays: { after: startDate },
                  toMonth: endDate,
                  modifiers,
                  numberOfMonths: 2,
                  onDayClick: () => end.getInput().focus(),
                }}
              />
            </div>
            <div className="d-flex flex-column mx-5">
              <label htmlFor="">To:</label>
              <DayPickerInput
                ref={(el) => (end = el)}
                value={endDate}
                placeholder="To"
                formatDate={formatDate}
                parseDate={parseDate}
                dayPickerProps={{
                  selectedDays: [startDate, { startDate, endDate }],
                  disabledDays: { before: startDate },
                  modifiers,
                  month: startDate,
                  fromMonth: startDate,
                  numberOfMonths: 2,
                }}
                onDayChange={handleToChange}
              />
            </div>
          </div>
          <div className="d-flex justify-content-end">
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
        </div>
      </div>

      <Modal show={modal} onHide={handleClose} size="xl" scrollable={true}>
        <Modal.Header closeButton>
          <Modal.Title>Preview</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h2>{title}</h2>
          <Output data={data} />
        </Modal.Body>
        <Modal.Footer>
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
        <Modal.Footer>
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
