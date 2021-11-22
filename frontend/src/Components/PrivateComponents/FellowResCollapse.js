import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import SearchCard from "../PublicComponents/SearchCard";

import { Collapse } from "reactstrap";

function FellowResCollapse(props) {
  const [responseList, setResponseList] = useState("");

  const memberResDetailsFromStore = useSelector(
    (state) => state.memberResDetailsStore.resDetails
  );

  let matchedRes = memberResDetailsFromStore.filter((data) => {
    return data.matched == true;
  });

  useEffect(() => {
    setResponseList(matchedRes);
  }, []);

  const handleBookmark = (requestId) => {
    console.log(requestId);
    // dispatch(bookmarkToggleThunk(requestId, userId));
  };

  return (
    <>
      <Collapse isOpen={props.isOpen}>
        <div className="container py-4">
          <div className="row text-center memberProfileMiddie-beige ">
            <div className="d-flex justify-content-around col-lg-12">
              <button onClick={() => setResponseList(matchedRes)}>
                MATCHED
              </button>
            </div>
          </div>
        </div>

        <div className="col-12 row g-3 m-0">
          {responseList && responseList.length > 0 ? (
            responseList.map((res) => (
              <SearchCard
                key={res.id}
                request={res}
                handleBookmark={handleBookmark}
              />
            ))
          ) : (
            <div>No response</div>
          )}
        </div>
      </Collapse>
    </>
  );
}

export default FellowResCollapse;
