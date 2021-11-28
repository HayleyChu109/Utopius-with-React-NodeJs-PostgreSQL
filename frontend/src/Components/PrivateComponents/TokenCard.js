import React from "react";
import { useHistory } from "react-router-dom";

import { Card } from "react-bootstrap";
import "../../Pages/SCSS/token.scss";

function TokenCard(props) {
  const tokenPlan = props.tokenPlan;

  const history = useHistory();

  const sentToPayment = (planname) => {
    history.push(`/member/token/payment/${planname}`);
  };

  return (
    <>
      <Card
        className="me-5 text-center token-card"
        onClick={() => sentToPayment(tokenPlan.planName)}
      >
        <Card.Img
          variant="top"
          src={tokenPlan.photoPath}
          alt="Token pic"
          className="mx-auto my-3"
        />
        <Card.Body>
          <Card.Title className="py-1 token-card-title">
            {tokenPlan.planName}
          </Card.Title>
          <Card.Text className="py-2 token-card-text">
            <span className="noOfToken">Token: {tokenPlan.noOfToken}</span>
            <br />
            <span>= HKD {tokenPlan.hkd}</span>
            <br />
            <br />
            {tokenPlan.detail ? (
              <span className="token-card-detail">
                Special Offer: {tokenPlan.detail} !!!
              </span>
            ) : null}
          </Card.Text>
        </Card.Body>
      </Card>
    </>
  );
}

export default TokenCard;
