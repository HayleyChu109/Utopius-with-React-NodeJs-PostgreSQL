class AdminTokenService {
  constructor(knex) {
    this.knex = knex;
  }

  getTransactionList(){
      return this.knex('tokenPurchaseRecord').select("noOfToken","username","profilePath","hkd", "tokenPurchaseRecord.created_at").join("tokenPlan","tokenPlanId","tokenPlan.id").join("account","accountId","account.id")
  }
  getUserTransactionList(){
    return this.knex.with('payee',this.knex.raw(`select "username" as "payee","profilePath" as "payeeProfile",account.id from "tokenTransaction" join account on "payeeId"=account.id`)).distinct("amount","title","requestId","tokenTransaction.id","payerId","payeeId").distinct(this.knex.raw(`"username" as "payer","profilePath" as "payerProfile",payee.payee as "payee",payee."payeeProfile" as "payeeProfile","tokenTransaction".created_at`)).from('tokenTransaction').join("account","payerId","account.id").join('payee','payeeId','payee.id').join('request',"requestId","request.id").orderBy("tokenTransaction.created_at","desc")

  }
  getPayee(reqId){
    return this.knex.with('payee',knex.raw(`select "username" as "payee","profilePath" as "payeeProfile",account.id from "tokenTransaction" join account on "payeeId"=account.id`)).distinct("tokenTransaction.id","payerId","payeeId").distinct(this.knex.raw(`"username" as "payer","profilePath" as "payerProfile",payee.payee as "payee",payee."payeeProfile" as "payeeProfile"`)).from('tokenTransaction').join("account","payerId","account.id").join('payee','payeeId','payee.id').orderBy("tokenTransaction.created_at","desc")
  }
 
}

module.exports = AdminTokenService;

