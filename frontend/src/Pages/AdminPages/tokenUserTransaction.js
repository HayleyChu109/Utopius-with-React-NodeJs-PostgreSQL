import { useEffect } from "react"
import { useSelector,useDispatch } from "react-redux"
import {GiDiamonds} from 'react-icons/gi'
import AdminNavbar from "../../Components/PrivateComponents/admin/adminNavBar"
import { GetTokenUserTransaction } from "../../Redux/adminToken/action"
import { TokenTransactionListItem } from "../../Components/PrivateComponents/admin/tokenTransactionListItems"
export default function TokenUserTransction(){
const dispatch=useDispatch()
const {userTransaction}=useSelector((state)=>state.adminTokenStore)
useEffect(()=>{
    dispatch(GetTokenUserTransaction())
},[dispatch])
    return(<>
    <AdminNavbar/>
    <div className="my-5 mx-5 px-4 discover-title">
            <GiDiamonds className="me-2 mb-1" />
            User Token Transaction record
          </div>
          <div className="my-5 mx-5 px-4">

    <TokenTransactionListItem items={userTransaction} itemsPerPage={30}/>
    </div>
    </>)
}
