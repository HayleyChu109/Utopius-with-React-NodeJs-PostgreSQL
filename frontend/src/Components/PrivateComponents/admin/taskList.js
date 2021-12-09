import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  GetTaskList,
  PutTaskList,
  FilterTaskList,
} from "../../../Redux/task/action";
import { Link } from "react-router-dom";
import { Nav, Button, Modal } from "react-bootstrap";
import "../../../Pages/SCSS/taskList.scss";
import moment from "moment";

export function TaskList() {
  const [selected, setSelected] = useState("unread");
  const [modal, setModal] = useState(false);
  const [currentItem, setCurrentItem] = useState(0);
  const [solution, setSolution] = useState("");
  let { task } = useSelector((state) => state.taskStore);

  if (task && task.length > 0) {
    task = task.filter((item) => item.status === selected);
  }

  const handleFilter = (key) => {
    setSelected(key);
    console.log(key);
  };

  const handleStatus = (id, event, sol) => {
    console.log(event.target.name);
    console.log(id);
    disptach(PutTaskList(id, event.target.name, sol));
  };
  const OptionDisplay = (item) => {
    if (item.status === "unread") {
      return (
        <>
          {" "}
          <Button
            className="mx-5 my-1"
            name="read"
            onClick={(e) => handleStatus(item.id, e, "")}
          >
            READ
          </Button>{" "}
          <Button
            className="mx-5 my-1"
            name="completed"
            onClick={() => {
              setCurrentItem(item.id);
              setModal(true);
            }}
          >
            COMPLETED
          </Button>
        </>
      );
    } else {
      return (
        <>
          <Button
            className="mx-5 my-1"
            variant="light"
            name="unread"
            onClick={(e) => handleStatus(item.id, e, "")}
          >
            Mark as Unread
          </Button>
          <Button
            className="mx-5 my-1"
            variant="light"
            name="completed"
            onClick={() => {
              setCurrentItem(item.id);
              setModal(true);
            }}
          >
            COMPLETED
          </Button>
        </>
      );
    }
  };
  const disptach = useDispatch();
  useEffect(() => {
    disptach(GetTaskList());
  }, [disptach]);

  return (
    <>
      <Nav
        activeKey={selected}
        variant="pills"
        onSelect={(selectedKey) => handleFilter(selectedKey)}
        className="d-flex justify-content-evenly taskNav"
      >
        <Nav.Item>
          <Nav.Link eventKey="unread">UNREAD</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="read">READ</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="completed">COMPLETED</Nav.Link>
        </Nav.Item>
      </Nav>

      {task && task.length > 0 ? (
        task.map((item) => (
          <div key={item.id} className="taskItem my-2">
            <div className="mx-5">
              {item.reporterId ? (
                <Link to={`/admin/user/${item.reporterId}`}>
                  <p>Username:{item.reporter}</p>
                </Link>
              ) : (
                <p>Username:{item.reporter}</p>
              )}
              <p>Email:{item.email}</p>
              {item.reportee ? (
                <Link to={`/admin/user/${item.reporteeId}`}>
                  <p>Reportee:{item.reportee}</p>
                </Link>
              ) : null}
              <p>Title:{item.title}</p>
              <p>Details:{item.message}</p>
              <p>
                Time:{moment(item.created_at).format("Do MMMM,YYYY hh:mm a")}
              </p>
              {item.solution ? (
                <div className="border border-5 mb-5">
                  <p className="my-3 ms-3">
                    Solution: <span>{item.solution}</span>
                  </p>
                </div>
              ) : null}
            </div>
            <div className="d-flex justify-content-center taskOption">
              {item.status === "completed" ? (
                <>
                  <p className="text-white">Completed</p>
                </>
              ) : (
                OptionDisplay(item)
              )}
            </div>
          </div>
        ))
      ) : (
        <div className="mx-auto my-5">
          <p>There is no task yet</p>
        </div>
      )}
      <Modal show={modal} onHide={() => setModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>COMPLETING TASK</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          What is the solution for message?
          <textarea
            name=""
            id=""
            cols="50"
            rows="10"
            value={solution}
            onChange={(e) => setSolution(e.target.value)}
          ></textarea>
        </Modal.Body>
        <Modal.Footer className="admin-footer">
          <Button
            variant="primary"
            onClick={() => {
              disptach(PutTaskList(currentItem, "completed", solution));
              setModal(false);
            }}
          >
            Mark as Completed
          </Button>
          <Button variant="secondary" onClick={() => setModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
