import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import SearchCard from "../PublicComponents/SearchCard";
import {
  memberBookmarkThunk,
  clearBookmark,
} from "../../Redux/memberProfile/memberBookmarkActions";

import { Collapse } from "reactstrap";
import "../../Pages/SCSS/memberProfile.scss";

function BookmarkCollapse(props) {
  const bookmarkId = useSelector((state) => state.requestStore.bookmarkList);

  const bookmarkList = useSelector(
    (state) => state.memberBookmarkStore.bookmark
  );

  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    if (bookmarkId.length > 0) {
      dispatch(memberBookmarkThunk(bookmarkId));
    } else {
      dispatch(clearBookmark());
    }
  }, [dispatch, bookmarkId]);

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
