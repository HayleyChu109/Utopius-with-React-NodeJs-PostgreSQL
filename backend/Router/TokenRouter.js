const express = require("express");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

class TokenRouter {
  constructor(tokenService) {
    this.tokenService = tokenService;
  }

  router() {
    let router = express.Router();

    router.get("/tokenplan", this.getTokenPlan.bind(this));
    router.get(
      "/tokenpurchaserecord/:id",
      this.getTokenPurchaseRecord.bind(this)
    );
    router.get(
      "/tokentransactionrecord/:id",
      this.getTokenTransActRecord.bind(this)
    );
    router.post(
      "/token/create-payment-intent",
      this.postTokenPayment.bind(this)
    );
    router.post("/updatepurchaserecord", this.postPurchaseRecord.bind(this));
    router.put("/updatetoken", this.putToken.bind(this));

    return router;
  }

  // Get token currency
  async getTokenPlan(req, res, next) {
    try {
      let tokenPlan = await this.tokenService.getTokenPlan();
      if (tokenPlan) {
        console.log("Token plan", tokenPlan);
        res.json(tokenPlan);
      } else {
        res.json([]);
      }
    } catch (err) {
      next(err);
      throw new Error(err);
    }
  }

  // Get token purchase record
  async getTokenPurchaseRecord(req, res, next) {
    try {
      let tokenPurchaseRecord = await this.tokenService.getTokenPurchaseRecord(
        req.params.id
      );
      if (tokenPurchaseRecord) {
        res.json(tokenPurchaseRecord);
      } else {
        res.json([]);
      }
    } catch (err) {
      next(err);
      throw new Error(err);
    }
  }

  // Get token transaction record
  async getTokenTransActRecord(req, res, next) {
    try {
      let tokenTransActRecord = await this.tokenService.getTokenTransActRecord(
        req.params.id
      );
      if (tokenTransActRecord) {
        res.json(tokenTransActRecord);
      } else {
        res.json([]);
      }
    } catch (err) {
      next(err);
      throw new Error(err);
    }
  }

  async postTokenPayment(req, res, next) {
    try {
      const detail = req.body;
      console.log(detail);
      const paymentIntent = await stripe.paymentIntents.create({
        amount: Number(detail.amount) * 100,
        currency: "hkd",
        metadata: req.body,
        payment_method_types: ["card"],
      });
      res.json({ clientSecret: paymentIntent.client_secret });
    } catch (err) {
      next(err);
      throw new Error(err);
    }
  }

  async postPurchaseRecord(req, res, next) {
    try {
      const recordId = await this.tokenService.postPurchaseRecord(
        req.body.memberId,
        req.body.planId
      );
      if (recordId) {
        res.json(recordId);
      } else {
        res.json([]);
      }
    } catch (err) {
      next(err);
      throw new Error(err);
    }
  }

  async putToken(req, res, next) {
    try {
      const totalToken = await this.tokenService.putToken(
        req.body.memberId,
        req.body.noOfToken
      );
      if (totalToken) {
        res.json(totalToken);
      } else {
        res.json([]);
      }
    } catch (err) {
      next(err);
      throw new Error(err);
    }
  }
}

module.exports = TokenRouter;
