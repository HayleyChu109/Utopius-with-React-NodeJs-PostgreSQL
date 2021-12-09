import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import jwt_decode from "jwt-decode";

import NavBar from "../../Components/PublicComponents/NavBar";
import Footer from "../../Components/PublicComponents/Footer";
import SuccessModal from "../../Components/PublicComponents/SuccessModal";
import { getCurrentTokenThunk } from "../../Redux/token/tokenRecordActions";
import {
  redeemItemsThunk,
  redeemSubmitThunk,
  clearSuccessMsg,
} from "../../Redux/token/redeemActions";

import { FaCoins } from "react-icons/fa";
import { Card, Table } from "react-bootstrap";
import "../SCSS/token.scss";

function RedeemCheckoutPage() {
  const [qty, setQty] = useState([1]);
  const [errorMsg, setErrorMsg] = useState(false);
  const [modalBoolean, setModalBoolean] = useState(false);

  let memberId = jwt_decode(localStorage.getItem("token")).id;

  const currentToken = useSelector(
    (state) => state.tokenRecordStore.currentToken
  );

  const { redeemItemId } = useParams();
  const redeemItems = useSelector((state) => state.redeemStore.redeemItems);
  const selectedItem = redeemItems.filter(
    (item) => item.id === Number(redeemItemId)
  );

  const decrease = () => {
    if (qty > 1) {
      setQty(Number(qty) - 1);
    }
  };

  const increase = () => {
    if (qty < selectedItem[0].stock) {
      setQty(Number(qty) + 1);
    }
  };

  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    window.scrollTo(0, 0);
  });

  useEffect(() => {
    dispatch(redeemItemsThunk());
    dispatch(getCurrentTokenThunk(memberId));
  }, [dispatch, memberId]);

  const handleSubmit = () => {
    if (currentToken[0].token < selectedItem[0].requiredToken * qty) {
      setErrorMsg(true);
    } else {
      dispatch(
        redeemSubmitThunk(
          memberId,
          selectedItem[0].id,
          selectedItem[0].requiredToken,
          qty
        )
      );
    }
  };

  const successMsg = useSelector((state) => state.redeemStore.message);

  useEffect(() => {
    if (successMsg !== null) {
      setModalBoolean(true);
    }
  }, [successMsg]);

  const closeModal = () => {
    setModalBoolean(false);
    dispatch(clearSuccessMsg());
    history.push("/member/redeem");
  };

  return (
    <>
      <NavBar />
      <div className="container py-4 mb-4">
        {currentToken && currentToken.length > 0 ? (
          <>
            <div className="my-4 px-4 token-title">
              <FaCoins className="mb-1 me-2" />
              REDEEM:{" "}
              <span>
                {currentToken[0].username} (CURRENT TOKEN:{" "}
                {currentToken[0].token})
              </span>
            </div>
          </>
        ) : null}
        <Card className="mx-auto redeem-checkout">
          <Card.Header className="my-2 text-center redeem-checkout-header">
            <h2>Please confirm your redeem item</h2>
          </Card.Header>
          <Card.Body>
            <Table>
              <thead className="text-center">
                <tr>
                  <th>Item</th>
                  <th>Required Token</th>
                  <th>Quantity</th>
                  <th>Total Token</th>
                </tr>
              </thead>
              <tbody className="text-center">
                {selectedItem && selectedItem.length > 0 ? (
                  <tr className="align-middle">
                    <td>
                      <img
                        src={selectedItem[0].itemPhotoPath}
                        alt="item"
                        className="me-3 redeem-checkout-pic"
                      />
                      {selectedItem[0].name}
                    </td>
                    <td>{selectedItem[0].requiredToken}</td>
                    <td>
                      <button className="btn-redeem" onClick={decrease}>
                        -
                      </button>
                      <span className="px-2">{qty}</span>
                      <button className="btn-redeem" onClick={increase}>
                        +
                      </button>
                    </td>
                    <td>{selectedItem[0].requiredToken * qty}</td>
                  </tr>
                ) : null}
              </tbody>
            </Table>
            {errorMsg ? (
              <div className="py-2 text-center redeem-checkout-errorMsg">
                Not sufficient Token
              </div>
            ) : null}
            <div className="text-center">
              <button className="my-3 btn-coin" onClick={handleSubmit}>
                CONFIRM
              </button>
            </div>
          </Card.Body>
        </Card>
      </div>

      <div className="text-center">
        <button className="mb-5 btn-goback" onClick={() => history.goBack()}>
          &#60; GO BACK
        </button>
      </div>
      <Footer />

      <SuccessModal
        isOpen={modalBoolean}
        close={closeModal}
        message={successMsg}
      />
    </>
  );
}

export default RedeemCheckoutPage;
