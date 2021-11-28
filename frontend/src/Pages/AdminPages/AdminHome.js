import { useEffect } from "react";
import AdminNavbar from "../../Components/PrivateComponents/admin/adminNavBar";
import Discover from "../../Components/PublicComponents/Discover";
import SearchResult from "../../Components/PublicComponents/SearchResult";

export default function AdminHome(){
    return(
        <>
        <AdminNavbar/>
        <Discover/>
      <SearchResult />

        </>
    )
}
