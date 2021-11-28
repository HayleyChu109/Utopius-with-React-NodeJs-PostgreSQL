import AdminNavbar from "../../Components/PrivateComponents/admin/adminNavBar"
import {GiDiamonds} from 'react-icons/gi'
import { TaskList } from "../../Components/PrivateComponents/admin/taskList"
export default function TaskPage(){
    
    return(<>
    <AdminNavbar/>
    <div className='d-flex flex-column'>

    <div className="my-5 mx-5 px-4 discover-title">
            <GiDiamonds className="me-2 mb-1" />
            TASKS
          </div>
          
          <TaskList/>
    </div>
    </>)
}