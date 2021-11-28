import { useEffect,useState } from "react";
import { useSelector,useDispatch } from "react-redux";
import { GetTaskList,PutTaskList,FilterTaskList } from "../../../Redux/task/action";
import { Nav,Button } from "react-bootstrap";

export function TaskList(){
    const [selected,setSelected]=useState('unread')
    const {task}=useSelector((state)=>state.taskStore)

    const handleFilter=(key)=>{
        setSelected(key)
        disptach(FilterTaskList(key))
        console.log(key)
    }
    const handleStatus=(event)=>{
     
          disptach(PutTaskList(event.target.name))
      
    }
    const disptach=useDispatch()
    useEffect(()=>{
        disptach(GetTaskList())
    },[disptach])

    return(<>

    <Nav
  activeKey={selected}
  onSelect={(selectedKey) => handleFilter(selectedKey)}
  className='d-flex justify-content-evenly'
>
  <Nav.Item>
    <Nav.Link eventKey='unread'>UNREAD</Nav.Link>
  </Nav.Item>
  <Nav.Item>
    <Nav.Link eventKey="read">READ</Nav.Link>
  </Nav.Item>
  <Nav.Item>
    <Nav.Link eventKey="completed">COMPLETED</Nav.Link>
  </Nav.Item>
 
</Nav>
<div className='d-flex justify-content-center flex-column'>

{task&&task.length>0?task.map(item=><div key={item.id} className='d-flex flex-column'><p>Username:{item.reporter}</p><p>Email:{item.email}</p><p>Title:{item.title}</p><p>Details:{item.message}</p><p>Time:{item.created_at}</p><div className='d-flex flex-column'><Button name='read' onClick={(e)=>handleStatus(e)}>READ</Button><Button name='completed' onClick={(e)=>handleStatus(e)}>COMPLETED</Button></div></div>):<p>There are no task yet</p>}
</div>
    </>)
}