import { useEffect, useState } from "react";
import "../SCSS/dashboard.scss";
import { Button } from "react-bootstrap";
import { FaPlusCircle } from "react-icons/fa";
import { GrArticle } from "react-icons/gr";
import AnnouncementPreview from "../../Components/PrivateComponents/announcementPreview";
import { Table } from "react-bootstrap";
import { GiDiamonds } from "react-icons/gi";
import { useDispatch, useSelector } from "react-redux";
import Output from "editorjs-react-renderer";
import {
  GetAnnouncementList,
  DeleteAnnouncement,
} from "../../Redux/announceData/action";
import moment from "moment";
import AdminNavbar from "../../Components/PrivateComponents/admin/adminNavBar";
import { Card, CardGroup, Row, Col, ButtonGroup, Modal } from "react-bootstrap";
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
  const modalOpen = (givenTitle, givenContent) => {
    console.log(givenTitle);
    console.log(givenContent);
    setTitle(givenTitle);
    setContent(givenContent);
    setModal(true);
  };
  console.log(announce);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(GetAnnouncementList());
  }, [dispatch]);
  return (
    <>
      <AdminNavbar />
      <div className="my-5 mx-5 px-3 discover-title">
        <GiDiamonds className="me-2 mb-1" />
        Announcement
        {draft === {} ? (
          <Button className="" href="/admin/announcement/new">
            Continue your post
          </Button>
        ) : (
          <Button className="float-end" href="/admin/announcement/new">
            <FaPlusCircle className="me-2" />
            Add
          </Button>
        )}
      </div>
      <Row xs={4} className="px-5">
          {announce && announce.length > 0 ? (
            announce.map((item) => (
              <Col key={item.id}>
              <Card
                
               
                className="text-center"
              >
                <Card.Header  onClick={() => modalOpen(item.title, item.content)}>
                  <GrArticle className="mx-auto new-item" />
                  
                </Card.Header>
                <Card.Body>
                  <Card.Title>{item.title}</Card.Title>
                  <p>Published: {item.isPrivate ? "No" : "Yes"}</p>
                  <div className="d-grid gap-2">
                    <Button variant='outline-secondary' className='rounded-pill'  href={`/admin/announcement/edit/${item.id}`}>
                      Edit
                    </Button>
                    <Button
                      onClick={() => dispatch(DeleteAnnouncement(item.id))}
                      variant="outline-danger" className='rounded-pill'
                    >
                      delete
                    </Button>
                   From: {moment(item.start_date).format('DD-MM-YYYY')} -
                    <br /> {moment(item.end_date).format('DD-MM-YYYY')}
                  </div>
                </Card.Body>
                <Card.Footer>
                  <small className="text-muted">
                    Last updated {moment(item.updated_at).fromNow()}
                  </small>
                </Card.Footer>
              </Card>
        </Col>
            ))
          ) : (
            <tr>There are no announcement yet</tr>
          )}
      </Row>
      <AnnouncementPreview
        modal={modal}
        handle={modalClose}
        data={content}
        title={title}
      />
    </>
  );
}
