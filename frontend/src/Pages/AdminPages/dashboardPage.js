import "../SCSS/dashboard.scss";
import { useSelector } from "react-redux";
import AdminNavbar from "../../Components/PrivateComponents/admin/adminNavBar";
import { GiDiamonds } from "react-icons/gi";
import { Card, Row, Col, Container } from "react-bootstrap";
import { TagCountChart } from "../../Components/PrivateComponents/admin/tagCountChart";
import { NewUserChart } from "../../Components/PrivateComponents/admin/NewUserChart";
import { RequestTypeCard } from "../../Components/PrivateComponents/admin/RequestCountCard";
import { FinishedRequestCard } from "../../Components/PrivateComponents/admin/fininshedRequestCard";
import { TaskCountCard } from "../../Components/PrivateComponents/admin/taskCard";
import { ResponseRateCard } from "../../Components/PrivateComponents/admin/responseCountCard";
import { TokenCountCard } from "../../Components/PrivateComponents/admin/TokenCard";
import { TokenTransactionList } from "../../Components/PrivateComponents/admin/tokenTransactionList";
import { Link } from "react-router-dom";
import FadeIn from "react-fade-in/lib/FadeIn";

export default function DashboardPage(props) {
  const adminDataStore = useSelector((state) => state.adminDataStore);

  console.log(adminDataStore);
  return (
    <>
      <AdminNavbar />
      <FadeIn className="p-2">
        <div className="my-5 mx-5 px-4 discover-title">
          <GiDiamonds className="me-2 mb-1" />
          DASHBOARD
        <select className='float-end' name="" id="">
          <option value="1">Today</option>
          <option value="2">This Week</option>
          <option value="3">This Month</option>
        </select>
        </div>
        <Container fluid>
          <h2>Today</h2>
          <Row xs={1} md={2} lg={4} className="my-2">
            <Col>
              <Link to="/admin/token">
                <TokenCountCard />
              </Link>
            </Col>
            <Col className="column">
              <Link to="/admin/request">
                <FinishedRequestCard />
              </Link>
            </Col>
            <Col className="column">
              <ResponseRateCard />
            </Col>
            <Col>
              <Link to="/admin/task">
                <TaskCountCard />
              </Link>
            </Col>
          </Row>
          <h2>This week</h2>
          {/* <Col lg={3}> */}
          {/* <Card style={{textAlign:'center'}} className='mx-2'> */}
          <Row>
            <Col xs={12} lg={8} className="chart">
              <NewUserChart />
            </Col>
            <Col xs={12} lg={4}>
              <TagCountChart />
            </Col>
          </Row>
          <Row className="my-4">
            <Col xs={12} lg={4}>
              <Card>
                <RequestTypeCard />
              </Card>
            </Col>
            <Col xs={12} lg={8}>
              <Link to="/admin/token">
                <Card>
                  <TokenTransactionList itemsPerPage={4} />
                </Card>
              </Link>
            </Col>
          </Row>
        </Container>
      </FadeIn>
    </>
  );
}
