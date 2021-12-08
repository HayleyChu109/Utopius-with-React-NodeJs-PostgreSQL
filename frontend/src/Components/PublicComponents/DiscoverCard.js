import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import { searchReq } from "../../Redux/request/actions";

import { Card } from "reactstrap";
import FadeIn from "react-fade-in";

const DiscoverCard = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const handleSearch = (val) => {
    if(localStorage.getItem('isAdmin'))
    {
      dispatch(searchReq(val));

      history.push("/admin");

    }else{

      dispatch(searchReq(val));
      history.push("/");
    }
  };

  return (
    <>
      <div className="col-2">
        <FadeIn>
          <Card className="discover-card">
            <a
              href="#0"
              onClick={(e) => {
                e.preventDefault();
                handleSearch(props.tagname.replace(/\s/g, ""));
              }}
            >
              <div className="discover-icons p-4">
                <img
                  src={props.photoPath}
                  alt="logo"
                  className="card-img-top mx-auto"
                />
              </div>
              <div className="discover-tagname text-center p-2">
                {props.tagname}
              </div>
            </a>
          </Card>
        </FadeIn>
      </div>
    </>
  );
};

export default DiscoverCard;
