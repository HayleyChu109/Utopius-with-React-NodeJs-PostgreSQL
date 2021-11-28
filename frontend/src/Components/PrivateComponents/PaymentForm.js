import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import {
  updatePurchaseRecordThunk,
  updateMemberTokenThunk,
} from "../../Redux/token/buyTokenActions";

import "../../Pages/SCSS/token.scss";
import axios from "axios";

function PaymentForm(props) {
  const [succeeded, setSucceeded] = useState(false);
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [clientSecret, setClientSecret] = useState("");

  const dispatch = useDispatch();
  const history = useHistory();
  const stripe = useStripe();
  const elements = useElements();

  useEffect(() => {
    const detail = {
      amount: props.selectedPlan.hkd,
      memberId: props.member,
      description: props.selectedPlan.planName,
    };

    const token = localStorage.getItem("token");
    const headers = { Authorization: `Bearer ${token}` };

    axios
      .post(
        `${process.env.REACT_APP_API_SERVER}/member/token/create-payment-intent`,
        detail,
        { headers }
      )
      .then((res) => {
        setClientSecret(res.data.clientSecret);
      });
  }, [props.member, props.selectedPlan.hkd, props.selectedPlan.planName]);

  const handleChange = async (e) => {
    setDisabled(false);
    setError(e.error ? e.error.message : "");
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    setProcessing(true);

    const payload = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardNumberElement),
      },
    });

    if (payload.error) {
      setError(`Payment failed ${payload.error.message}`);
      setProcessing(false);
    } else {
      dispatch(updatePurchaseRecordThunk(props.member, props.selectedPlan.id));
      dispatch(
        updateMemberTokenThunk(props.member, props.selectedPlan.noOfToken)
      );
      setError(null);
      setProcessing(false);
      setSucceeded(true);
      setTimeout(() => {
        history.push("/member/token");
      }, 3000);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-1 card-element-title">Card number</div>
      <CardNumberElement
        className="mb-3 p-2 card-element"
        onChange={handleChange}
      />
      <div className="mb-1 card-element-title">Expiry</div>
      <CardExpiryElement
        className="mb-3 p-2 card-element"
        onChange={handleChange}
      />
      <div className="mb-1 card-element-title">CVC</div>
      <CardCvcElement
        className="mb-3 p-2 card-element"
        onChange={handleChange}
      />

      <div className="text-center my-4">
        <button
          disabled={processing || disabled || succeeded}
          id="submit"
          className="mx-auto btn-coin"
        >
          <span id="button-text">
            {processing ? "Processing..." : "Pay now"}
          </span>
        </button>
      </div>

      {/* Show any error that happens when processing the payment */}
      {error && (
        <div className="text-center card-error" role="alert">
          {error}
        </div>
      )}

      {/* Show a success message upon completion */}
      <div className="text-center payment-success">
        {succeeded ? (
          <div>
            PAYMENT SUCCESS!!!
            <br />
            The page will be redirected in 3s
          </div>
        ) : null}
      </div>
    </form>
  );
}

export default PaymentForm;
