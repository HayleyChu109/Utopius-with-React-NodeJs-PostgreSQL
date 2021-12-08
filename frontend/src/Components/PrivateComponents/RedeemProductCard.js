import { Card } from "react-bootstrap";
import { FaCoins } from "react-icons/fa";
import { BsCartCheckFill } from "react-icons/bs";
export const RedeemProductCard = ({
  itemPhotoPath,
  name,
  requiredToken,
  stock,
}) => {
  return (
    <>
      <Card className="mt-4 mb-3 me-4 text-center redeem-card">
        <Card.Body>
          <img src={itemPhotoPath} alt="item" className="mb-3" />
          <Card.Title className="py-1 px-2 redeem-card-title">
            {name}
          </Card.Title>
        </Card.Body>
        <Card.Footer className="redeem-card-footer">
          <FaCoins className="me-3" />
          {requiredToken}
          <br />
          <BsCartCheckFill className="me-3" /> {stock}
        </Card.Footer>
      </Card>
    </>
  );
};
