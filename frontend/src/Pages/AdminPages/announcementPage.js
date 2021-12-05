import { useEffect, useState } from "react";
import "../SCSS/dashboard.scss";
import { Button } from "react-bootstrap";
import { FaPlusCircle } from "react-icons/fa";
import AnnouncementPreview from "../../Components/PrivateComponents/announcementPreview";
import { Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Output from 'editorjs-react-renderer'
import { GetAnnouncementList,DeleteAnnouncement } from "../../Redux/announceData/action";
import moment from "moment";
import AdminNavbar from "../../Components/PrivateComponents/admin/adminNavBar";
import { Card, Row, Col, ButtonGroup,Modal } from "react-bootstrap";
import LineBarComposed from "../../Components/PrivateComponents/admin/LineBarComposedchartComponent";
import { UserList } from "../../Components/PrivateComponents/admin/userList";
import { RequestList } from "../../Components/PrivateComponents/admin/requestList";
import { Link } from "react-router-dom";

export default function AnnouncementPage(props) {
  const { draft, announce } = useSelector((state) => state.announceStore);
  const [modal, setModal] = useState(false);
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const modalClose = () => setModal(false);
  const modalOpen = (givenTitle,givenContent) => {
    console.log(givenTitle)
    console.log(givenContent)
    setTitle(givenTitle)
    setContent(givenContent)
    setModal(true)
  };
  console.log(announce);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(GetAnnouncementList());
  }, [dispatch]);
  return (
    <>
      <AdminNavbar />
      <div className='p-4 '>
      <h1>Announcement</h1>

      {draft==={} ? (
        <Button href="/admin/announcement/new">Continue your post</Button>
      ) : (
        <Button className='my-4' href="/admin/announcement/new">
          <FaPlusCircle className='me-2' />
          Add 
        </Button>
      )}
      <div className='table-responsive rounded-3'>

      <Table  className='' >
        <thead className='table-secondary'>
          <tr>
            <th></th>
            <th>title</th>
            <th>Published ?</th>
            <th>Last updated</th>
            <th>Option</th>
          </tr>
        </thead>
        <tbody>
          {announce && announce.length > 0 ? (
            announce.map((item) => (
              <tr key={item.id}  className='align-middle'>
                <td>
                </td>
                <td onClick={() => modalOpen(item.title, item.content)}>{item.title}</td>
                <td>{item.isPrivate ? "No" : "Yes"}</td>
                <td>{moment(item.updated_at).fromNow()}</td>
                <td>
                
                  <Button href={`/admin/announcement/edit/${item.id}`}>
                    Edit
                  </Button>
                  <Button onClick={()=>dispatch(DeleteAnnouncement(item.id))} variant='danger'> 
                    delete
                  </Button>
                </td>
              </tr>
            ))
            ) : (
              <tr>There are no announcement yet</tr>
              )}
        </tbody>
      </Table>
              </div>
      </div>
      <AnnouncementPreview modal={modal} handle={modalClose} data={content}title={title}/>
    
    </>
  );
}
