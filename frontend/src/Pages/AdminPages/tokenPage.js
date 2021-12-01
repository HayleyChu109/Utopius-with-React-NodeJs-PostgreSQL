import AdminNavbar from "../../Components/PrivateComponents/admin/adminNavBar"
import { TokenTransactionList } from "../../Components/PrivateComponents/admin/tokenTransactionList"
export default function TokeNAdminPage(){
    return(<>
    <AdminNavbar/>
    <h2>user Token Transaction</h2>
    <TokenTransactionList/>
    <h2>Token Purchase Record</h2>
    </>)
}