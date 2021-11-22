import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import { Collapse } from "reactstrap";
import SearchCard from "../PublicComponents/SearchCard";
import Review from "../PrivateComponents/Review";

function MemberResCollapse(props) {
  const [filterRes, setFilterRes] = useState(["completed"]);
  const [matched, setMatched] = useState(true);
  const [modalBoolean, setModalBoolean] = useState("");

  const history = useHistory();

  const reviewFromStore = useSelector((state) => state.getReviewStore.review);

  const responseList = useSelector(
    (state) => state.memberResDetailsStore.resDetails
  );

  // let completedRes = memberResDetailsFromStore.filter((data) => {
  //   return data.matched === true && data.status === "completed";
  // });

  // let matchedRes = memberResDetailsFromStore.filter((data) => {
  //   return (
  //     data.matched === true &&
  //     (data.status === "open" || data.status === "matched")
  //   );
  // });

  // let pendingRes = memberResDetailsFromStore.filter((data) => {
  //   return data.matched === false && data.status === "open";
  // });

  // let unmatchedRes = memberResDetailsFromStore.filter((data) => {
  //   return (
  //     data.matched === false &&
  //     (data.status === "matched" ||
  //       data.status === "completed" ||
  //       data.status === "cancelled")
  //   );
  // });

  // useEffect(() => {
  //   setResponseList(completedRes);
  // }, []);

  const showRequestDetail = (requestId) => {
    const result = reviewFromStore.filter((review) => {
      return review.requestId === requestId;
    });
    if (result.length > 0) {
      localStorage.setItem("requestId", requestId);
      localStorage.setItem("review", JSON.stringify(result));
      setModalBoolean(true);
    } else {
      localStorage.setItem("requestId", requestId);
      history.push(`/member/request/detail/${requestId}`);
    }
  };

  const closeModal = () => {
    setModalBoolean(false);
  };

  return (
    <>
      <Collapse isOpen={props.isOpen}>
        <div className="container py-4">
          <div className="row text-center memberProfileMiddie-beige ">
            <div className="d-flex justify-content-around col-lg-12">
              <button
                onClick={() => {
                  setFilterRes(["completed"]);
                  setMatched(true);
                }}
              >
                COMPLETED
              </button>
              <button
                onClick={() => {
                  setFilterRes(["open", "matched"]);
                  setMatched(true);
                }}
              >
                MATCHED
              </button>
              <button
                onClick={() => {
                  setFilterRes(["open"]);
                  setMatched(false);
                }}
              >
                PENDING
              </button>
              <button
                onClick={() => {
                  setFilterRes(["matched", "completed", "cancelled"]);
                  setMatched(false);
                }}
              >
                UNMATCHED
              </button>
            </div>
          </div>
        </div>

        <div className="col-12 row g-3 m-0">
          {responseList && responseList.length > 0 ? (
            responseList
              .filter(
                (res) =>
                  filterRes.includes(res.status) &&
                  matched.includes(res.matched)
              )
              .map((res) => (
                <SearchCard
                  key={res.id}
                  request={res}
                  handleClick={showRequestDetail}
                />
              ))
          ) : (
            <div>No response</div>
          )}
        </div>
      </Collapse>
      <Review
        isOpen={modalBoolean}
        close={closeModal}
        review={reviewFromStore}
      />
    </>
  );
}

export default MemberResCollapse;
