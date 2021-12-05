import AdminNavbar from "../../Components/PrivateComponents/admin/adminNavBar"
import { useEffect } from "react"
import { GetUserList } from "../../Redux/adminData/action"
import { useSelector,useDispatch } from "react-redux"
import { Row,COl,Card } from "react-bootstrap"
import { BsStars } from "react-icons/bs"
import { NewUserChart } from "../../Components/PrivateComponents/admin/NewUserChart"
import { UserListTable } from "../../Components/PrivateComponents/admin/userListTable"
export default function UserListpage(){
    const dispatch=useDispatch()
    const {userList}=useSelector((state)=>state.adminDataStore)
    useEffect(()=>{
        dispatch(GetUserList())
    },[dispatch])
    return(
        <>
        <AdminNavbar/>
        <div className='container-fluid'>

        {/* <div className="my-4 px-4 memberProfile-title">
          <BsStars className="mb-1 me-2" />
          User
          <Card>

        {/* <NewUserChart/> */}
          {/* </Card> */} 
          <div className="my-4 px-4 memberProfile-title">
          <BsStars className="mb-1 me-2" />
          ALL USER
        </div>
        <UserListTable items={userList} itemsPerPage={10}/>
        </div>
        </>
    )
}