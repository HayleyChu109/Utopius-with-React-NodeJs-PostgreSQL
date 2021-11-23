import { ListGroup, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import placholder from "../../../placeholder.png";

export const RequestList = ({list,...props}) => {
  return (
    <>
      {list && list.length > 0 ? (
        <ListGroup as="ul">
          {list.map((item) => (
            <Link key={item.id} to={`/admin/review/${item.id}`}>
              <ListGroup.Item as="li" className="d-flex m-0 p-0" style={{backgroundColor:'#fac77c', borderRadius: "10px",}}>
                <Col style={{position:'relative' ,margin:'0'}}>
                <img
                  style={{
                    height: "100%",
                    width: "100%",
                   
                  }}
                  src={placholder}
                  alt=""
                />
                </Col>
                <Col >
                  <p>
                    {item.username} #UID{item.userId}
                  </p>
                  <p>{item.title}</p>
                  <p>{item.detail}</p>
                  <div className="d-flex">
                    {item.tag && item.tag.length > 0
                      ? item.tag.map((data) => <p className='mx-2'>{`#${data}`} </p>)
                      : null}
                  </div>
                  <div className="d-flex ">
                    <div className='mx-2'>
                      <i className="fas fa-coins mx-1"></i>
                      {item.reward}
                    </div>
                    <div className='mx-2'>
                    <i className="fas fa-users mx-1"></i>
                    {item.requirePpl}
                    </div>
                    <div className='mx-2'>
                    <i className="fas fa-map-marker-alt mx-2"></i>
                    {item.district}
                    </div>
                  </div>
                </Col>
              </ListGroup.Item>
            </Link>
          ))}
        </ListGroup>
      ) : null}
    </>
  );
};
