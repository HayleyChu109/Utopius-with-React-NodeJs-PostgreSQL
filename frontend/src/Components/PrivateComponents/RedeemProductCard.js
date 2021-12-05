import { Card } from "react-bootstrap";
import { FaCoins } from "react-icons/fa";
export const RedeemProductCard = ({ item_pic, name, token_cost, stock }) => {
  return (
    <>
      <Card className=" my-2 me-5 text-center token-card">
        <Card.Body>
          <img src={item_pic} alt="" className="mb-3" />
          <Card.Title className="py-1 token-card-title">{name}</Card.Title>
          <Card.Text className="py-2 token-card-text">
              <div className=''>
                  <div className='token-text text-center mx-auto'>

            <FaCoins className='coin me-3'/>{token_cost}
            <br />
                {stock}
                  </div>
              </div>
          
          </Card.Text>
        </Card.Body>
      </Card>
    </>
  );
};
