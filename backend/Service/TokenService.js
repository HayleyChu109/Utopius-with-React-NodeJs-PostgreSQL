class TokenService {
  constructor(knex) {
    this.knex = knex;
  }

  async getTokenPlan() {
    try {
      let tokenPlan = await this.knex("tokenPlan").select("*");
      if (tokenPlan.length > 0) {
        return tokenPlan;
      } else {
        return [];
      }
    } catch (err) {
      throw new Error(err);
    }
  }

  async getTokenPurchaseRecord(memberId) {
    try {
      let tokenPurchaseRecord = await this.knex("tokenPurchaseRecord")
        .join("tokenPlan", "tokenPlan.id", "tokenPurchaseRecord.tokenPlanId")
        .join("account", "account.id", "tokenPurchaseRecord.accountId")
        .select(
          "tokenPurchaseRecord.id",
          "tokenPurchaseRecord.accountId",
          "tokenPurchaseRecord.tokenPlanId",
          "tokenPurchaseRecord.created_at",
          "account.username",
          "account.token",
          "tokenPlan.planName",
          "tokenPlan.noOfToken",
          "tokenPlan.hkd",
          "tokenPlan.detail"
        )
        .where("tokenPurchaseRecord.accountId", memberId)
        .orderBy("tokenPurchaseRecord.id", "desc");
      if (tokenPurchaseRecord.length > 0) {
        return tokenPurchaseRecord;
      } else {
        return [];
      }
    } catch (err) {
      throw new Error(err);
    }
  }

  async getTokenTransActRecord(memberId) {
    try {
      let tokenTransActRecord = await this.knex("tokenTransaction")
        .join("account", "tokenTransaction.payerId", "account.id")
        .join("request", "request.id", "tokenTransaction.requestId")
        .select(
          "tokenTransaction.id",
          "tokenTransaction.requestId",
          "tokenTransaction.payerId",
          "tokenTransaction.amount",
          "tokenTransaction.created_at",
          "account.username",
          "account.grade",
          "request.title",
          "request.reward"
        )
        .where("tokenTransaction.payeeId", memberId)
        .orderBy("tokenTransaction.id", "desc");
      if (tokenTransActRecord.length > 0) {
        return tokenTransActRecord;
      } else {
        return [];
      }
    } catch (err) {
      throw new Error(err);
    }
  }

  async postPurchaseRecord(memberId, planId) {
    try {
      const recordId = await this.knex("tokenPurchaseRecord")
        .insert({
          accountId: memberId,
          tokenPlanId: planId,
        })
        .returning("tokenPurchaseRecord.id");
      return recordId;
    } catch (err) {
      throw new Error(err);
    }
  }

  async putToken(memberId, noOfToken) {
    try {
      const currentToken = await this.knex("account")
        .select("token")
        .where("account.id", memberId);
      const newToken = currentToken[0].token + noOfToken;
      const totalToken = await this.knex("account")
        .update("token", newToken)
        .where("id", memberId)
        .returning("account.token");
      return totalToken;
    } catch (err) {
      throw new Error(err);
    }
  }

  // Token transaction
  async postTokenTransaction(requestId, payerId, payeeId, amount) {
    try {
      console.log(payeeId);
      // Update transaction table
      await this.knex("tokenTransaction").insert({
        requestId: requestId,
        payerId: payerId,
        payeeId: payeeId,
        amount: amount,
      });

      // Subtract payer token balance
      const currentPayerToken = await this.knex("account")
        .select("token")
        .where("id", payerId);
      await this.knex("account")
        .where("id", payerId)
        .update({ token: currentPayerToken[0].token - amount });

      // Add payee token balance
      let currentPayeeToken = await this.knex("account")
        .select("token")
        .where("id", payeeId);
      await this.knex("account")
        .where("id", payeeId)
        .update({ token: currentPayeeToken[0].token + amount });
    } catch (err) {
      throw new Error(err);
    }
  }
}

module.exports = TokenService;
