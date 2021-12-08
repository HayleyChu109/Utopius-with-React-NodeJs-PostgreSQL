import React from "react";
import { useHistory } from "react-router-dom";

import { Card } from "react-bootstrap";
import "../../Pages/SCSS/token.scss";

function RedeemItemsCard(props) {
  const redeemitems = props.redeemItem;

  const history = useHistory();

  const redeemCheckout = (id) => {
    history.push(`/member/redeem/${id}`);
  };

  return (
    <div>
      <Card
        className="mx-4 mb-4 text-center redeem-card"
        onClick={() => redeemCheckout(redeemitems.id)}
      >
        <Card.Img
          variant="top"
          src={redeemitems.itemPhotoPath}
          alt="Redeem items pic"
          className="mx-auto my-3"
        />
        <Card.Body>
          <Card.Title className="py-1 px-2 redeem-card-title">
            {redeemitems.name}
          </Card.Title>
        </Card.Body>
        <Card.Footer className="redeem-card-footer">
          Required Token: {redeemitems.requiredToken}
        </Card.Footer>
      </Card>
    </div>
  );
}

export default RedeemItemsCard;
