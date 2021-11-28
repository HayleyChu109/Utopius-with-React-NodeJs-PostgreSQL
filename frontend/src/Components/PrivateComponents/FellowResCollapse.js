import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import SearchCard from "../PublicComponents/SearchCard";
import Review from "./Review";

import "../../Pages/SCSS/memberProfile.scss";

function FellowResCollapse(props) {
  const [modalBoolean, setModalBoolean] = useState("");

  const history = useHistory();

  const reviewFromStore = useSelector((state) => state.getReviewStore.review);

  const responseList = useSelector(
    (state) => state.memberResDetailsStore.resDetails
  );

  const showRequestDetail = (requestId) => {
    const result = reviewFromStore.filter((review) => {
      return review.requestId === requestId;
    });
    if (result.length > 0) {
      localStorage.setItem("requestId", requestId);
      setModalBoolean(true);
    } else {
      history.push(`/member/request/detail/${requestId}`);
    }
  };

  const closeModal = () => {
    setModalBoolean(false);
  };

  return (
    <>
      <div className="container pt-4">
        <div className="row text-center memberProfileMiddle-blue">
          <div className="d-flex justify-content-around col-lg-12">
            <button>MATCHED</button>
          </div>
        </div>
      </div>

      <div className="col-12 row g-3 m-0">
        {responseList && responseList.length > 0 ? (
          responseList
            .filter((res) => res.matched === true)
            .map((res) => (
              <SearchCard
                key={res.id}
                request={res}
                handleClick={showRequestDetail}
              />
            ))
        ) : (
          <div className="text-center">No response for this member</div>
        )}
      </div>
      <Review
        isOpen={modalBoolean}
        close={closeModal}
        review={reviewFromStore}
      />
    </>
  );
}

export default FellowResCollapse;
