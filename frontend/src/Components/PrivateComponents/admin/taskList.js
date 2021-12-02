import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  GetTaskList,
  PutTaskList,
  FilterTaskList,
} from "../../../Redux/task/action";
import { Link } from "react-router-dom";
import { Nav, Button } from "react-bootstrap";
import "../../../Pages/SCSS/taskList.scss";
import moment from "moment";

export function TaskList() {
  const [selected, setSelected] = useState("unread");
  let { task } = useSelector((state) => state.taskStore);

if(task&&task.length>0&&selected==='unread')
{
  task=task.filter(item=>item.status==="unread")

}

  const handleFilter = (key) => {
    setSelected(key);
    disptach(FilterTaskList(key));
    console.log(key);
  };
  
  const handleStatus = (id, event) => {
    console.log(event.target.name);
    console.log(id);
    disptach(PutTaskList(id, event.target.name));
  };
  const OptionDisplay=(item)=>{
    if(item.status === "unread"){
      return(<> <Button
        className="mx-5 my-1 taskButton" variant='light'
        name="read"
        onClick={(e) => handleStatus(item.id, e)}
      >
        READ
      </Button> <Button
    className="mx-5 my-1 taskButton" variant='light'
    name="completed"
    onClick={(e) => handleStatus(item.id, e)}
  >
    COMPLETED
  </Button></>)
    }else{
      return(<>
      <Button
      className="mx-5 my-1 taskButton" variant='light'
      name="unread"
      onClick={(e) => handleStatus(item.id, e)}
    >
      Mark as Unread
    </Button><Button
    className="mx-5 my-1 taskButton" variant='light'
    name="completed"
    onClick={(e) => handleStatus(item.id, e)}
  >
    COMPLETED
  </Button>
      </>)
    }
   
   
    
  
  
  }
  const disptach = useDispatch();
  useEffect(() => {
    disptach(GetTaskList());
  }, [disptach]);

  return (
    <>
      <Nav
        activeKey={selected}
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
            <div className='mx-5'>
              {item.reporterId?<Link to={`/admin/user/${item.reporterId}`}>
                <p>Username:{item.reporter}</p>
              
              </Link>:
              <p>Username:{item.reporter}</p>
            }
              <p>Email:{item.email}</p>
              {item.reportee?<Link to={`/admin/user/${item.reporteeId}`}>
                <p>Reportee:{item.reportee}</p>
              
              </Link>:null}
              <p>Title:{item.title}</p>
              <p>Details:{item.message}</p>
              <p>Time:{moment(item.created_at).format("Do MMMM,YYYY hh:mm a")}</p>
            </div>
            <div className="d-flex justify-content-center taskOption">
              {item.status==="completed"?<p className='text-white'>Completed</p>:
              OptionDisplay(item)}
            </div>
          </div>
        ))
      ) : (
        <div  className="mx-auto my-2">

        <p>There are no task yet</p>
        </div>
      )}
    </>
  );
}
