import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router";
import jwt_decode from "jwt-decode";

import NavBar from "../../Components/PublicComponents/NavBar";
import TokenCard from "../../Components/PrivateComponents/TokenCard";
import PurchaseHistory from "../../Components/PrivateComponents/PurchaseHistory";
import TokenTransAct from "../../Components/PrivateComponents/TokenTransAct";
import Footer from "../../Components/PublicComponents/Footer";
import { tokenPlanThunk } from "../../Redux/token/tokenPlanActions";
import { tokenPurchaseRecordThunk } from "../../Redux/token/tokenRecordActions";
import { tokenTransActThunk } from "../../Redux/token/tokenRecordActions";

import { FaCoins } from "react-icons/fa";
import "../../Pages/SCSS/token.scss";
import "../../Pages/SCSS/memberProfile.scss";

function TokenPage() {
  const [showHistory, setShowHistory] = useState(true);

  let memberId = jwt_decode(localStorage.getItem("token")).id;

  const tokenPlans = useSelector((state) => state.tokenPlanStore.tokenPlan);
  const tokenPurchase = useSelector(
    (state) => state.tokenRecordStore.tokenPurchaseRecord
  );

  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(tokenPlanThunk());
    dispatch(tokenPurchaseRecordThunk(memberId));
    dispatch(tokenTransActThunk(memberId));
  }, [dispatch]);

  return (
    <>
      <NavBar />
      <div className="container py-4">
        {tokenPurchase && tokenPurchase.length > 0 ? (
          <>
            <div className="my-4 px-4 token-title">
              <FaCoins className="mb-1 me-2" />
              TOKEN: <span>{tokenPurchase[0].username}</span>
            </div>
            <p className="text-center mt-3 py-3 mx-auto current-token">
              Current Token: {tokenPurchase[0].token}
            </p>
          </>
        ) : (
          <div className="my-4 px-4 token-title">
            <FaCoins className="mb-1 me-2" />
            TOKEN:
          </div>
        )}
        <div className="text-center mb-4">
          Please choose the plan that you want to purchase
        </div>
        <div className="d-flex justify-content-center text-center">
          {tokenPlans && tokenPlans.length > 0 ? (
            tokenPlans.map((plan) => (
              <TokenCard key={plan.planName} tokenPlan={plan} />
            ))
          ) : (
            <div className="text-center">No token</div>
          )}
        </div>

        <div className="mt-5 mb-3 text-center memberProfileMiddle-orange">
          <div className="d-flex justify-content-around align-items-center">
            <button className="pt-1" onClick={() => setShowHistory(true)}>
              PURCHASE HISTORY
            </button>
            <button className="pt-1" onClick={() => setShowHistory(false)}>
              TOKEN TRANSACTION
            </button>
          </div>
        </div>
        {showHistory ? <PurchaseHistory /> : <TokenTransAct />}
        <div className="mx-auto pb-4">
          <div className="mb-5 memberProfileBottom-orange"></div>
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

export default TokenPage;
