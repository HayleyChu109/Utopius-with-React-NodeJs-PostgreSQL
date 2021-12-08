import { Card } from "react-bootstrap";
import { FaCoins } from "react-icons/fa";
import {BsCartCheckFill} from 'react-icons/bs'
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
               <BsCartCheckFill className='me-4 color-success'/> {stock}
                  </div>
              </div>
          
          </Card.Text>
        </Card.Body>
      </Card>
    </>
  );
};
