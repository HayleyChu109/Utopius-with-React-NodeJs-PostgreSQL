import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { Container, Row, Col } from "react-bootstrap";
import AdminNavbar from "../../Components/PrivateComponents/admin/adminNavBar";
import { RequestTypeCard } from "../../Components/PrivateComponents/admin/RequestCountCard";
import { useSelector, useDispatch } from "react-redux";
import { GetRequestList } from "../../Redux/adminRequest/action";
import { RequestListTable } from "../../Components/PrivateComponents/admin/requestListTable";
import { FinishedRequestCard } from "../../Components/PrivateComponents/admin/fininshedRequestCard";
import { ResponseRateCard } from "../../Components/PrivateComponents/admin/responseCountCard";

export default function RequestPage() {
  return (
    <>
      <AdminNavbar />
      <Container>
        <Row>
          <Col xs={12} xl={3}>
            <RequestTypeCard />
          </Col>
          <Col xs={12} xl={8}>
            <Row xs={2}>
              <Col>
                <FinishedRequestCard />
              </Col>
              <Col>
                <ResponseRateCard />
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
      <h2>Request</h2>
      <RequestListTable />
    </>
  );
}
