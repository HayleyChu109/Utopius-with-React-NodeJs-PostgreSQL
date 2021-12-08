import React from "react";
import FellowProfileCard from "./FellowProfileCard";

import { Collapse } from "reactstrap";
import "../../Pages/SCSS/memberProfile.scss";

function FollowerCollapse(props) {
  const followerList = props.list;

  return (
    <>
      <Collapse isOpen={props.isOpen}>
        <div className="container pt-4">
          <div className="row text-center memberProfileMiddle-orange">
            <button>FOLLOWER</button>
          </div>
        </div>

        <div className="col-12 row g-3 m-0">
          {followerList && followerList.length > 0 ? (
            followerList.map((list) => (
              <FellowProfileCard key={list.followerId} list={list} />
            ))
          ) : (
            <div className="text-center">No follower</div>
          )}
        </div>
      </Collapse>
    </>
  );
}

export default FollowerCollapse;
