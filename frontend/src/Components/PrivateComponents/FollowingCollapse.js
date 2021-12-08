import React from "react";
import FellowProfileCard from "./FellowProfileCard";

import { Collapse } from "reactstrap";
import "../../Pages/SCSS/memberProfile.scss";

function FollowingCollapse(props) {
  const followingList = props.list;

  return (
    <>
      <Collapse isOpen={props.isOpen}>
        <div className="container pt-4">
          <div className="row text-center memberProfileMiddle-blue">
            <button>FOLLOWING</button>
          </div>
        </div>

        <div className="col-lg-12 row g-3 m-0">
          {followingList && followingList.length > 0 ? (
            followingList.map((list) => (
              <FellowProfileCard key={list.followingId} list={list} />
            ))
          ) : (
            <div className="text-center">No following</div>
          )}
        </div>
      </Collapse>
    </>
  );
}

export default FollowingCollapse;
