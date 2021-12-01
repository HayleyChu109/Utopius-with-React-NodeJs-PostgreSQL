const express = require("express");

class AdminTokenRouter {
  constructor(adminTokenService) {
      this.adminTokenService=adminTokenService
   
  }

  router() {
    let router = express.Router();
    router.get('/',this.getTransactionList.bind(this))
    router.get('/user',this.getUserTransactionList.bind(this))
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
  
}

module.exports = AdminTokenRouter;
