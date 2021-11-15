import { AiFillFire } from "react-icons/ai";
import "../../Pages/SCSS/discover.scss";
// import { Card, CardBody } from "reactstrap";

const Discover = () => {
  return (
    <>
      <div className="discover-div">
        <div className="container">
          <div className="p-5 discover-title">
            <AiFillFire className="me-2 mb-1" />
            DISCOVER
          </div>
          <div className="p-5"></div>
        </div>
      </div>
    </>
  );
};

export default Discover;
