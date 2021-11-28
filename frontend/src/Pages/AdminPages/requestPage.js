import { useState,useEffect } from "react";
import { useParams } from "react-router";
import { Container,Row,Col } from "react-bootstrap";
import AdminNavbar from "../../Components/PrivateComponents/admin/adminNavBar"; 
import { RequestTypeCard } from "../../Components/PrivateComponents/admin/RequestCountCard";
import { useSelector,useDispatch } from "react-redux"; 
import { GetRequestList } from "../../Redux/adminRequest/action";
import { RequestListTable } from "../../Components/PrivateComponents/admin/requestListTable";

export default function RequestPage(){
   
    return(<>
    <AdminNavbar/>
    <Container >
        <Row xs={2} >
            <Col>
        <RequestTypeCard/>
        </Col>
        </Row>
    </Container>
    <h2>Request</h2>
        <RequestListTable/>
    </>)
}