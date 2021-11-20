import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import SearchCard from "../PublicComponents/SearchCard";

import { Collapse } from "reactstrap";

function MemberReqCollapse(props) {
  const memberReqDetailsFromStore = useSelector(
    (state) => state.memberReqDetailsStore.reqDetails
  );
  console.log(memberReqDetailsFromStore);

  let openReq = memberReqDetailsFromStore.filter((data) => {
    return data.status == "Open";
  });
  console.log(openReq);

  let matchedReq = memberReqDetailsFromStore.filter((data) => {
    return data.status == "Matched";
  });
  console.log(matchedReq);

  let closedReq = memberReqDetailsFromStore.filter((data) => {
    return data.status == "Completed" || data.status == "Cancelled";
  });
  console.log(closedReq);

  const [requestList, setRequestList] = useState("");

  const handleBookmark = (requestId) => {
    console.log(requestId);
    // dispatch(bookmarkToggleThunk(requestId, userId));
  };

  useEffect(() => {
    setRequestList(openReq);
  }, []);

  return (
    <>
      <Collapse isOpen={props.isOpen}>
        <div className="container py-4">
          <div className="row mx-auto mb-5 memberProfileMiddie-beige">
            <div className="d-flex justify-content-around col-lg-12 col-md-12">
              <button onClick={() => setRequestList(openReq)}>OPEN</button>
              <button onClick={() => setRequestList(matchedReq)}>
                MATCHED
              </button>
              <button onClick={() => setRequestList(closedReq)}>CLOSED</button>
            </div>
          </div>
        </div>
        {/* 
        <div className="col-12 row g-3 m-0">
          {requestList && requestList.length > 0 ? (
            requestList.map((req) => (
              <SearchCard
                key={req.id}
                request={req}
                handleBookmark={handleBookmark}
              />
            ))
          ) : (
            <div>No request</div>
          )}
        </div> */}

        <div className="container py-4">
          <div className="row d-flex justify-content-center text-center">
            <div className="col-lg-12 mx-auto mb-5 memberProfileBg-orange">
              <button className="btn-white-orange">NEW REQ</button>
            </div>
          </div>
        </div>
      </Collapse>
    </>
  );
}

export default MemberReqCollapse;
