import { ListGroup,Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import placholder from "../../../placeholder.png";

export const UserList = (props) => {
  return (
    <>
      {props.list && props.list.length > 0 ? (
        <ListGroup as='ul'>
          {props.list.map((item) => (
            <Link key={item.id} to={`/admin/user/${item.id}`}>
            <ListGroup.Item  as='li' className='d-flex'>
              <img
                style={{ height: "75px", width: "75px", }}
                src={placholder}
                alt=""
              />
              <Col>
              <p>{item.username}</p>
              <p>
                {item.firstName} {item.lastName}
              </p>
              </Col>
            </ListGroup.Item>
            </Link>
          ))}
        </ListGroup>
      ) : null}
    </>
  );
};
