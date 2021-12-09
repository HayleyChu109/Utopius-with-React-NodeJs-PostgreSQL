import { useState } from "react";
import { useSelector } from "react-redux";
import { Nav, Button } from "react-bootstrap";
import UserRequestList from "./userRequestList";
import { FaCoins } from "react-icons/fa";
import { BsFillPersonPlusFill } from "react-icons/bs";
import "../../../Pages/SCSS/memberProfile.scss";
function UserProfileInfoAdmin({ user, ...props }) {
  console.log(user);
  console.log(typeof user.id);
  const adminDataStore=useSelector((state)=>state.adminDataStore)
  console.log(adminDataStore)
  const request=adminDataStore.request
  console.log(request)
  const [tab, setTab] = useState("request");
  const displayContent=()=>{
      switch (tab){
          case 'request':
          return(<UserRequestList request={request}/>)
        //   case 'response':
        //   return(<UserRequestList request={request}/>)
        //   case 'review':
        //   return(<UserRequestList request={request}/>)
          default:
              return(<p className='text-center'>There is nothing</p>)
      }
    
  }
  return (
    <>
      <div className="container">
        <div className="row d-flex justify-content-center">
          <div className="memberProfileInfo">
            <span
              className="dot text-center me-2"
              //   style={{ background: request.gradeColor }}
            >
              {/* {memberProfileFromStore.grade} */}
            </span>
            <span>
              {user.username ? user.firstname : "not set"} #UID
              {String(user.id).padStart(5, "0")}
            </span>
            <br />
            <p>First Name: {user.firstName ? user.firstName : "not set"}</p>
            <p>Last Name: {user.lastName ? user.lastName : "not set"}</p>
            <p>Phone: {user.phone ? user.phone : "not set"}</p>
            <p>Email: {user.email ? user.email : "not set"}</p>
            <p>District: {user.district ? user.district : "not set"}</p>
            <div>
              <FaCoins className="mx-2 coin" />
              <span className="coin me-2">{user.token}</span>
              <BsFillPersonPlusFill className="mx-2 person person-icon" />
              {/* <span className="person me-2">{request.requiredPpl}</span> */}
              REQ # {user.request} RES # {user.response}
            </div>
          </div>

          <div className="memberResponse-beige">
            <Nav
              className="justify-content-center "
              variant="pills"
              activeKey={tab}
              onSelect={(selectedKey) => setTab(selectedKey)}
            >
              <Nav.Item className="mx-2">
                <Nav.Link eventKey="request">Request</Nav.Link>
              </Nav.Item>
              <Nav.Item className="mx-2">
                <Nav.Link eventKey="response">Response</Nav.Link>
                </Nav.Item>
              <Nav.Item className="mx-2">
                <Nav.Link eventKey="review">Review</Nav.Link>
                
              </Nav.Item>
            </Nav>

          {displayContent()}
          </div>

          <div
            className="d-flex justify-content-center blacklist"
            style={{ background: "black" }}
          >
            {user.blacklist ? (
              <Button variant="light" className="my-3">
                unblocked
              </Button>
            ) : (
              <Button variant="light" className="my-3">
                blacklist
              </Button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default UserProfileInfoAdmin;
