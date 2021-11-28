import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import jwt_decode from "jwt-decode";

import NavBar from "../PublicComponents/NavBar";
import PaymentForm from "./PaymentForm";
import Footer from "../PublicComponents/Footer";
import { tokenPlanThunk } from "../../Redux/token/tokenPlanActions";

import { FaCoins } from "react-icons/fa";
import { Card } from "react-bootstrap";
import "../../Pages/SCSS/token.scss";

// Set up stripe
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
const stripePromise = loadStripe(
  "pk_test_51JzbFkD6pxMbtI7uUmqfFs0oyD41gNZKiTikVaq8YKGCFEqGuZqmpNQOQOobdOeKYeeCzv1TJEsBXGTPKNUEcAHf00MNN9f7De"
);

function StripeContainer() {
  let memberId = jwt_decode(localStorage.getItem("token")).id;
  const { planname } = useParams();

  const tokenPlans = useSelector((state) => state.tokenPlanStore.tokenPlan);
  const selectedPlan = tokenPlans.filter((plan) => {
    return plan.planName === planname;
  });

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(tokenPlanThunk());
  }, [dispatch]);

  return (
    <>
      <NavBar />
      <div className="container py-4 mb-4">
        <div className="my-4 px-4 token-title">
          <FaCoins className="mb-1 me-2" />
          PAYMENT INFORMATION:
        </div>
        <Card className="mx-auto stripe-card">
          <Card.Body>
            {selectedPlan && selectedPlan.length > 0 ? (
              <div className="d-flex">
                <div className="col-lg-6 p-4">
                  <Card.Title>
                    <p className="mb-3 p-2 text-center">YOUR PURCHASE:</p>
                    <div>
                      <div className="text-center">
                        <img src={selectedPlan[0].photoPath} alt="Plan pic" />
                      </div>
                      <br />
                      <span>Plan name:</span>
                      <span className="float-end">
                        {selectedPlan[0].planName}
                      </span>
                      <hr />
                      <span>Total amount (HKD): </span>
                      <span className="float-end">{selectedPlan[0].hkd}</span>
                      <br />
                      <div className="mt-5">
                        <span>(Token earned:</span>
                        <span className="float-end">
                          {selectedPlan[0].noOfToken})
                        </span>
                      </div>
                    </div>
                  </Card.Title>
                </div>
                <div className="col-lg-6 p-4">
                  <Elements stripe={stripePromise}>
                    <PaymentForm
                      member={memberId}
                      selectedPlan={selectedPlan[0]}
                    />
                  </Elements>
                </div>
              </div>
            ) : null}
          </Card.Body>
        </Card>
      </div>
      <Footer />
    </>
  );
}

export default StripeContainer;
