import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import SearchCard from "../PublicComponents/SearchCard";

import { Collapse } from "reactstrap";

function MemberReqCollapse(props) {
  const [filterStatus, setFilterStatus] = useState(["open"]);

  const requestList = useSelector(
    (state) => state.memberReqDetailsStore.reqDetails
  );

  const history = useHistory();

  const showRequestDetail = (requestId) => {
    localStorage.setItem("requestId", requestId);
    history.push(`/member/request/detail/${requestId}/comment`);
  };

  return (
    <>
      <Collapse isOpen={props.isOpen}>
        <div className="container py-4">
          <div className="row text-center memberProfileMiddie-beige">
            <div className="d-flex justify-content-around col-12">
              <button onClick={() => setFilterStatus(["open"])}>OPEN</button>
              <button onClick={() => setFilterStatus(["matched"])}>
                MATCHED
              </button>
              <button
                onClick={() => setFilterStatus(["cancelled", "completed"])}
              >
                CLOSED
              </button>
            </div>
          </div>
        </div>

        <div className="col-12 row g-3 m-0">
          {requestList && requestList.length > 0 ? (
            requestList
              .filter((req) => filterStatus.includes(req.status))
              .map((req) => (
                <SearchCard
                  key={req.id}
                  request={req}
                  handleClick={showRequestDetail}
                />
              ))
          ) : (
            <div>No request</div>
          )}
        </div>
      </Collapse>
    </>
  );
}

export default MemberReqCollapse;
