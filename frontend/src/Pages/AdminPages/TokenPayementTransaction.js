import { useEffect } from "react"
import { useSelector,useDispatch } from "react-redux"
import {GiDiamonds} from 'react-icons/gi'
import AdminNavbar from "../../Components/PrivateComponents/admin/adminNavBar"
import { GetTokenTransaction } from "../../Redux/adminToken/action"
import { TokenIncomeTable } from "../../Components/PrivateComponents/admin/TokenIncomeTable"
export default function TokenPaymentTransction(){
const dispatch=useDispatch()
const {transaction}=useSelector((state)=>state.adminTokenStore)
useEffect(()=>{
    dispatch(GetTokenTransaction())
},[dispatch])
    return(<>
    <AdminNavbar/>
    <div className="my-5 mx-5 px-4 discover-title">
            <GiDiamonds className="me-2 mb-1" />
            Token purchase record
          </div>
          <div className="my-5 mx-5 px-4">
    <TokenIncomeTable items={transaction} itemsPerPage={30}/>

          </div>
    </>)
}
