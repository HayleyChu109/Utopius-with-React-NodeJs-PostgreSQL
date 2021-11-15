import { useDispatch } from "react-redux";
import { searchReq } from "../../Redux/request/actions";

import { Card } from "reactstrap";
import help from "../../Images/help.png";

const DiscoverCard = (props) => {
  const dispatch = useDispatch();

  const handleSearch = (val) => {
    dispatch(searchReq(val));
  };

  return (
    <>
      <div className="col-2">
        <Card className="discover-card">
          <div className="discover-icons p-4">
            <img
              src={help}
              alt="homecare-logo"
              className="card-img-top mx-auto"
            />
          </div>
          <div className="discover-tagname text-center p-3">
            <a
              href="#0"
              onClick={(e) => {
                e.preventDefault();
                handleSearch(props.tagname.replace(/\s/g, ""));
              }}
            >
              {props.tagname}
            </a>
          </div>
        </Card>
      </div>
    </>
  );
};

export default DiscoverCard;
