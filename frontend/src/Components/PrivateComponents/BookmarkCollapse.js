import React from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import SearchCard from "../PublicComponents/SearchCard";

import { Collapse } from "reactstrap";
import "../../Pages/SCSS/memberProfile.scss";

function BookmarkCollapse(props) {
  const bookmarkList = useSelector((state) => state.getBookmarkStore.bookmark);

  const history = useHistory();

  const showRequestDetail = (requestId) => {
    localStorage.setItem("requestId", requestId);
    history.push(`/member/request/detail/${requestId}`);
  };

  return (
    <>
      <Collapse isOpen={props.isOpen}>
        <div className="container pt-4">
          <div className="row text-center memberProfileMiddle-heart">
            <div className="d-flex justify-content-around col-lg-12">
              <button>BOOKMARK</button>
            </div>
          </div>
        </div>

        <div className="col-12 row g-3 m-0">
          {bookmarkList && bookmarkList.length > 0 ? (
            bookmarkList.map((req) => (
              <SearchCard
                key={req.id}
                request={req}
                handleClick={showRequestDetail}
              />
            ))
          ) : (
            <div className="text-center">No bookmark</div>
          )}
        </div>
      </Collapse>
    </>
  );
}

export default BookmarkCollapse;
