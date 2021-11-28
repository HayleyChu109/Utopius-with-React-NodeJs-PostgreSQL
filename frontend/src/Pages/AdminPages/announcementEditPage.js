import { useState,useRef,useCallback } from "react";
import { createReactEditorJS } from "react-editor-js";
import Header from '@editorjs/header'
import List from '@editorjs/list'
import LinkTool from '@editorjs/link'
import { useHistory } from "react-router";
import ImageTool from '@editorjs/image'
import S3 from 'react-aws-s3'
import {announceConfig} from '../../s3Bucket/s3Config'
import DayPickerInput from "react-day-picker/DayPickerInput";
import moment from "moment";
import {formatDate,parseDate} from 'react-day-picker/moment'
import "react-day-picker/lib/style.css";
import { Button } from "react-bootstrap";
import AdminNavbar from "../../Components/PrivateComponents/admin/adminNavBar";

export function AnnouncemnetEditPage() {
    const ReactS3Client = new S3(announceConfig)
    const ReactEditorJS = createReactEditorJS();
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [announcement, setAnnouncement] = useState(''||JSON.parse(localStorage.getItem('cache')));
 const EDITOR_JS_TOOLS = {
    // NOTE: Paragraph is default tool. Declare only when you want to change paragraph option.
    // paragraph: Paragraph,
    // embed: Embed,
    // table: Table,
    list: List,
    // warning: Warning,
    // code: Code,
    linkTool: LinkTool,
    image: {
        class:ImageTool,
        config:{
            uploader:{
                uploadByFile(file){
                    console.log(file)
                    return ReactS3Client.uploadFile(file).then((data)=>{
                        console.log(data.location)
                        return{
                            success: 1,
                            file: {
                              url: data.location
                            }
                        }
                    }).catch((e)=>console.log(e))
                }
            }
        }
    },
    // raw: Raw,
    header: Header,
    // quote: Quote,
    // marker: Marker,
    // checklist: CheckList,
    // delimiter: Delimiter,
    // inlineCode: InlineCode,
    // simpleImage: SimpleImage,
  }
  const history=useHistory()
  const editorJS = useRef(null||JSON.parse(localStorage.getItem('cache')))

const handleInitialize = useCallback((instance) => {
  editorJS.current = instance
}, [])

const handleSave = useCallback(async() => {
  const savedData = await editorJS.current.save();
console.log(savedData)
  setAnnouncement(savedData)
  localStorage.setItem('cache',JSON.stringify(savedData))
}, [])
const handleDiscard = useCallback(() => {
  editorJS.current.destroy();
  setAnnouncement('')
  localStorage.removeItem('cache')
  history.push('/admin/announcement')
}, [history])
  const modifiers = { start: startDate, end: endDate };
  let end= HTMLInputElement | null;
  const showFromMonth=()=> {
   
    if (!startDate) {
      return;
    }
    if (moment(endDate).diff(moment(startDate), 'months') < 2) {
      end.getDayPicker().showMonth(endDate)
    }
  }

  const handleToChange=(to)=>{
    setEndDate(to)
    showFromMonth()
  }
  return (
    <>
      <AdminNavbar />
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
          <input type="text" name="title" />
          <br />
          <label htmlFor="content">Content</label>
          <div
            className="d-flex flex-column mx-auto"
            style={{ backgroundColor: "white", width: "70vw", height: "70vh", overflow:'auto' }}
          >
            <ReactEditorJS onInitialize={handleInitialize} placeholder='Enter your content' defaultValue={announcement||JSON.parse(localStorage.getItem('cache'))} tools={EDITOR_JS_TOOLS} onChange={()=>handleSave()}  />
          </div>
          <div className="d-flex justify-content-center">
            <div className="d-flex flex-column mx-5">
              <label htmlFor="">From:</label>
              <DayPickerInput
                placeholder="from"
                value={startDate}
                formatDate={formatDate}
                parseDate={parseDate}
                onDayChange={(day) => setStartDate(day)}
                dayPickerProps={{
                    selectedDays: [startDate, { startDate, endDate }],
                    disabledDays: { after: startDate },
                    toMonth: endDate,
                    modifiers,
                    numberOfMonths: 2,
                    onDayClick: () => end.getInput().focus()
                }}
              />
            </div>
            <div className="d-flex flex-column mx-5">
              <label htmlFor="">To:</label>
              <DayPickerInput
              ref={el => (end = el)}
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
            <Button className="m-2">Save and Preview</Button>
            <Button className="m-2">Save</Button>
            <Button className="m-2" variant="danger" onClick={handleDiscard}>
              Discard
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

export default AnnouncemnetEditPage;
