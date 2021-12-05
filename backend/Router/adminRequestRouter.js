const express = require("express");

class AdminRequestRouter {
  constructor(adminRequestService) {
      this.adminRequestService=adminRequestService
   
  }

  router() {
    let router = express.Router();
    router.get('/',this.getReqList.bind(this))
    router.get('/search',this.searchReqList.bind(this))
    router.get('/stat',this.getReqStat.bind(this))
    return router;
  }
  async searchReqList(req,res){
    console.log(req.query.query)
    let result=await this.adminRequestService.searchReqList(req.query.query)
  console.log(result)
    res.json(result)
  }
  async getReqStat(req,res){
    let reqStat=await this.adminRequestService.getReqStat()
  console.log(reqStat)
    res.json(reqStat)
  }
  async getReqList(req,res){
    let reqList=await this.adminRequestService.getReqList()
 
console.log(reqList)
res.json(reqList)
 
}
}

module.exports = AdminRequestRouter;
