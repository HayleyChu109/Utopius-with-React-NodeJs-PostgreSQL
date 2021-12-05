class AdminTokenService {
  constructor(knex) {
    this.knex = knex;
  }

  getTransactionList(){
      return this.knex('tokenPurchaseRecord').select("noOfToken","username","tokenPurchaseRecord.id","accountId","profilePath","photoPath","planName","hkd", "tokenPurchaseRecord.created_at").join("tokenPlan","tokenPlanId","tokenPlan.id").join("account","accountId","account.id")
  }
  getUserTransactionList(){
    return this.knex.with('payee',this.knex.raw(`select "username" as "payee","profilePath" as "payeeProfile",account.id from "tokenTransaction" join account on "payeeId"=account.id`)).distinct("amount","title","requestId","tokenTransaction.id","payerId","payeeId").distinct(this.knex.raw(`"username" as "payer","profilePath" as "payerProfile",payee.payee as "payee",payee."payeeProfile" as "payeeProfile","tokenTransaction".created_at`)).from('tokenTransaction').join("account","payerId","account.id").join('payee','payeeId','payee.id').join('request',"requestId","request.id").orderBy("tokenTransaction.created_at")

  }
  getPayee(reqId){
    return this.knex.with('payee',knex.raw(`select "username" as "payee","profilePath" as "payeeProfile",account.id from "tokenTransaction" join account on "payeeId"=account.id`)).distinct("tokenTransaction.id","payerId","payeeId").distinct(this.knex.raw(`"username" as "payer","profilePath" as "payerProfile",payee.payee as "payee",payee."payeeProfile" as "payeeProfile"`)).from('tokenTransaction').join("account","payerId","account.id").join('payee','payeeId','payee.id').orderBy("tokenTransaction.created_at","desc")
  }
  getRedeemItemList()
  {
    return this.knex('redeem_item').select()
  }
  postTokenPlan(plan,token,cost,detail,path)
  {
    return this.knex('tokenPlan').insert({planName:plan,noOfToken:token,hkd:cost,detail:detail,photoPath:path}).then(()=>{
      return this.getRedeemItemList()
    })
  }
  postRedeemItem(name,tokenCost,itemPic,stock)
  {
    return this.knex('redeem_item').insert({name:name,token_cost:tokenCost,item_pic:itemPic,stock:stock}).then(()=>{
      return this.getRedeemItemList()
    })
  }
  putRedeemItem(id,name,tokenCost,itemPic,stock)
  {
    return this.knex('redeem_item').update({name:name,token_cost:tokenCost,item_pic:itemPic,stock:stock}).where({id:id}).then(()=>{
      return this.getRedeemItemList()
    })
  }
 
}

module.exports = AdminTokenService;

