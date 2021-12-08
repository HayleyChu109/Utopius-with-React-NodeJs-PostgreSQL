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

  async getCurrentToken(memberId) {
    try {
      let currentToken = await this.knex("account")
        .select("username", "token")
        .where("id", memberId);
      if (currentToken.length > 0) {
        return currentToken;
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
        .select(
          "tokenPurchaseRecord.id",
          "tokenPurchaseRecord.accountId",
          "tokenPurchaseRecord.tokenPlanId",
          "tokenPurchaseRecord.created_at",
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
          "tokenTransaction.payeeId",
          "tokenTransaction.amount",
          "tokenTransaction.created_at",
          "account.username",
          "account.grade",
          "request.title"
        )
        .where("tokenTransaction.payerId", memberId)
        .orWhere("tokenTransaction.payeeId", memberId)
        .orderBy("tokenTransaction.id", "desc");
      let newList = [];
      for (let i = 0; i < tokenTransActRecord.length; i++) {
        let payeeDetails = await this.knex("account")
          .select("username", "grade")
          .where("id", tokenTransActRecord[i].payeeId);
        let eachList = {
          id: tokenTransActRecord[i].id,
          requestId: tokenTransActRecord[i].requestId,
          title: tokenTransActRecord[i].title,
          payerId: tokenTransActRecord[i].payerId,
          payerName: tokenTransActRecord[i].username,
          payerGrade: tokenTransActRecord[i].grade,
          payeeId: tokenTransActRecord[i].payeeId,
          payeeName: payeeDetails[0].username,
          payeeGrade: payeeDetails[0].grade,
          amount: tokenTransActRecord[i].amount,
          created_at: tokenTransActRecord[i].created_at,
        };
        newList.push(eachList);
      }
      if (tokenTransActRecord.length > 0) {
        return newList;
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

  // Redeem
  async getRedeemItems() {
    try {
      const redeemItems = await this.knex("redeemItem").select("*");
      if (redeemItems.length > 0) {
        return redeemItems;
      } else {
        return [];
      }
    } catch (err) {
      throw new Error(err);
    }
  }

  async postRedeem(memberId, redeemItemId, quantity, requiredToken) {
    try {
      const redeemId = await this.knex("redeemDetail")
        .insert({
          redeemItemId: redeemItemId,
          quantity: Number(quantity),
          amount: Number(quantity) * requiredToken,
          status: "completed",
        })
        .returning("id");
      const redeemAccJoinId = await this.knex("redeemAccJoin")
        .insert({
          accountId: memberId,
          redeemDetailId: Number(redeemId),
        })
        .returning("id");
      return redeemAccJoinId;
    } catch (err) {
      throw new Error(err);
    }
  }

  async deductStock(redeemItemId, quantity) {
    try {
      const redeemItemStock = await this.knex("redeemItem")
        .select("stock")
        .where("redeemItem.id", redeemItemId);
      await this.knex("redeemItem")
        .update({
          stock: redeemItemStock[0].stock - quantity,
        })
        .where("redeemItem.id", redeemItemId);
    } catch (err) {
      throw new Error(err);
    }
  }

  async deductMemberToken(accountId, quantity, requiredToken) {
    try {
      const totalToken = quantity * requiredToken;
      const memberToken = await this.knex("account")
        .select("token")
        .where("account.id", accountId);
      await this.knex("account")
        .update({
          token: memberToken[0].token - totalToken,
        })
        .where("account.id", accountId);
    } catch (err) {
      throw new Error(err);
    }
  }

  async getRedeemHistory(memberId) {
    try {
      const redeemList = await this.knex("redeemAccJoin")
        .join("redeemDetail", "redeemDetail.id", "redeemAccJoin.redeemDetailId")
        .join("redeemItem", "redeemItem.id", "redeemDetail.redeemItemId")
        .select(
          "redeemItem.name",
          "redeemItem.itemPhotoPath",
          "redeemDetail.id",
          "redeemDetail.quantity",
          "redeemDetail.amount",
          "redeemDetail.created_at"
        )
        .where("redeemAccJoin.accountId", memberId)
        .orderBy("redeemAccJoin.id", "desc");
      if (redeemList.length > 0) {
        return redeemList;
      } else {
        return [];
      }
    } catch (err) {
      throw new Error(err);
    }
  }
}

module.exports = TokenService;
