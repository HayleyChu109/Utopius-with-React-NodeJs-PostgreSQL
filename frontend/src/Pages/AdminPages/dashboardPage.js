import { useEffect } from "react";
import '../SCSS/dashboard.scss'
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { GetUserGrowth } from "../../Redux/adminData/action";
import AdminNavbar from "../../Components/PrivateComponents/admin/adminNavBar";
import { Card, Row, Col } from "react-bootstrap";
import LineBarComposed from "../../Components/PrivateComponents/admin/LineBarComposedchartComponent";
import { UserList } from "../../Components/PrivateComponents/admin/userList";
import { RequestList} from "../../Components/PrivateComponents/admin/requestList";
import { Link } from "react-router-dom";

export default function DashboardPage(props) {
  const adminDataStore = useSelector((state) => state.adminDataStore);
  const request=adminDataStore.request
  const userGrowth = adminDataStore.user.userGrowth;
  const newUserList = adminDataStore.user.newUserList;
  const dispatch = useDispatch();
  console.log(typeof moment().toDate());
  useEffect(() => {
    dispatch(
      GetUserGrowth(moment().subtract(7, "day").toDate(), moment().toDate())
    );
  }, []);
  console.log(adminDataStore);
  return (
    <>
      <AdminNavbar />
      <h1>Welcome back, admin!</h1>
      <Row>
        <Col lg={3}>
          <Card style={{textAlign:'center'}} className='mx-2'>
            <LineBarComposed userData={userGrowth} width={250} height={150} />
              <UserList list={newUserList} />
            <Link to='/admin/user'>Click to see all user</Link>
          </Card>
        </Col>
        <Col lg={3}>
        <Card style={{textAlign:'center'}} className='mx-2'>
            <p>New Request of Today: {request.length}</p>
            <RequestList list={request}/>
            <Link to='/admin/request'>Click to see all request</Link>

          </Card>
        </Col>
        <Col lg={3}>
        <Card style={{textAlign:'center'}} className='mx-2'>
            <p>New review: {request.length}</p>
         

          </Card>
        </Col>
      </Row>
    </>
  );
}
