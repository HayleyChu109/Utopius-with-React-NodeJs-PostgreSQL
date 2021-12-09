import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import jwt_decode from "jwt-decode";
import moment from "moment";

import NavBar from "../../Components/PublicComponents/NavBar";
import RedeemItemsCard from "../../Components/PrivateComponents/RedeemItemsCard";
import Footer from "../../Components/PublicComponents/Footer";
import { redeemItemsThunk } from "../../Redux/token/redeemActions";
import { getCurrentTokenThunk } from "../../Redux/token/tokenRecordActions";
import { redeemHistoryThunk } from "../../Redux/token/redeemActions";

import { FaCoins } from "react-icons/fa";
import { Table } from "react-bootstrap";
import "../SCSS/token.scss";

function RedeemPage() {
  let memberId = jwt_decode(localStorage.getItem("token")).id;

  const currentToken = useSelector(
    (state) => state.tokenRecordStore.currentToken
  );

  const redeemItems = useSelector((state) => state.redeemStore.redeemItems);

  const redeemList = useSelector((state) => state.redeemStore.redeemList);

  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(redeemItemsThunk());
    dispatch(getCurrentTokenThunk(memberId));
    dispatch(redeemHistoryThunk(memberId));
  }, [dispatch, memberId]);

  return (
    <>
      <NavBar />
      <div className="container py-4">
        {currentToken && currentToken.length > 0 ? (
          <>
            <div className="my-4 px-4 token-title">
              <FaCoins className="mb-1 me-2" />
              REDEEM: <span>{currentToken[0].username}</span>
            </div>
            <p className="text-center mt-3 py-3 mx-auto current-token">
              Current Token: {currentToken[0].token}
            </p>
          </>
        ) : null}
        <div className="text-center mb-4">
          Please choose the item that you want to redeem
        </div>
        <div className="d-flex flex-wrap justify-content-center">
          {redeemItems && redeemItems.length > 0 ? (
            redeemItems.map((item) => (
              <RedeemItemsCard key={item.name} redeemItem={item} />
            ))
          ) : (
            <div className="text-center">No redeem item</div>
          )}
        </div>

        <div className="mt-5 mb-3 text-center memberProfileMiddle-orange">
          <div className="d-flex justify-content-around align-items-center">
            <button className="pt-1">REDEEM HISTORY</button>
          </div>
        </div>
        <div className="container history-table">
          <Table borderless hover className="text-center">
            <thead>
              <tr className="history-title">
                <th>Date</th>
                <th>Redeem Item</th>
                <th>Quantity</th>
                <th>Total Token</th>
              </tr>
            </thead>
            <tbody>
              {redeemList && redeemList.length > 0
                ? redeemList.map((list) => (
                    <tr key={list.id} className="align-middle">
                      <td>{moment(list.created_at).format("LLL")}</td>
                      <td>
                        <img
                          src={list.itemPhotoPath}
                          alt="item"
                          className="me-3 redeem-history-pic"
                        />
                        {list.name}
                      </td>
                      <td>{list.quantity}</td>
                      <td>{list.amount}</td>
                    </tr>
                  ))
                : null}
            </tbody>
          </Table>
        </div>

        <div className="mx-auto pb-4">
          <div className="col-lg-12 mb-5 memberProfileBottom-orange"></div>
        </div>

        <div className="text-center">
          <button className="mb-5 btn-goback" onClick={() => history.goBack()}>
            &#60; GO BACK
          </button>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default RedeemPage;
