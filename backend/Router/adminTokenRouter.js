const express = require("express");

class AdminTokenRouter {
  constructor(adminTokenService) {
      this.adminTokenService=adminTokenService
   
  }

  router() {
    let router = express.Router();
    router.get('/',this.getTransactionList.bind(this))
    router.get('/user',this.getUserTransactionList.bind(this))
    router.post('/plan',this.postTokenPlan.bind(this))
    router.get('/redeemItem',this.getRedeemItemList.bind(this))
    router.post('/redeemItem/',this.postRedeemItem.bind(this))
    router.put('/redeemItem/:id',this.putRedeemItem.bind(this))
    return router;
  }
  async getTransactionList(req,res){
    let tokenStat=await this.adminTokenService.getTransactionList()
  console.log(tokenStat)
    res.json(tokenStat)
  }
  
  async getUserTransactionList(req,res){
    let tokenStat=await this.adminTokenService.getUserTransactionList()
  console.log(tokenStat)
    res.json(tokenStat)
  }
  async postTokenPlan(req,res){
    let { planName,
      noOfToken,
      detail,
      hkd,
      photoPath}=req.body
    let tokenPlan=await this.adminTokenService.postTokenPlan(planName,noOfToken,hkd,detail,photoPath)
    res.send('success')
  }
  async getRedeemItemList(req,res){
   
    let result=await this.adminTokenService.getRedeemItemList()
    res.send(result)
  }
  async postRedeemItem(req,res){
    let {  name,
      token,
      stock,
      itemPath}=req.body
    let result=await this.adminTokenService.postRedeemItem(name,token,itemPath,stock)
    res.send(result)
  }
  async putRedeemItem(req,res){
    let id=req.params.id
    let {name,tokenCost,itemPic,stock}=req.body
    let result=await this.adminTokenService.putRedeemItem(id,name,tokenCost,itemPic,stock)
    res.send(result)
  }
  
}

module.exports = AdminTokenRouter;
