import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Nav, Button } from "react-bootstrap";
import { FaCoins } from "react-icons/fa";
import { BsFillPersonPlusFill } from "react-icons/bs";
import "../../../Pages/SCSS/memberProfile.scss";
import SearchCard from "../../PublicComponents/SearchCard";

function UserRequestList({ request, ...props }) {
    console.log(request)
  const [limit, setLimit] = useState(4);
  const showMore=()=>{
      if(limit+4<request.length)
      {
      setLimit(limit+4)
      }else{
          setLimit(request.length)
      }
  }
  return (
    <>
      <div className="d-flex justify-content-center">
        {request.length>0?request.map((item,index)=>
   
        <SearchCard key={index} request={item}/>):<p className='text-center'>There are no request for this user</p>}
      </div>
    </>
  );
}

export default UserRequestList;
