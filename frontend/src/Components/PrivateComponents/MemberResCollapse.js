import React from "react";
import { Collapse, Card, CardBody } from "reactstrap";

function MemberResCollapse(props) {
  return (
    <>
      <Collapse isOpen={props.isOpen}>
        <h2>Hello</h2>
      </Collapse>
    </>
  );
}

export default MemberResCollapse;
