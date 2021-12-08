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
    router.get('/chart',this.getReqChart.bind(this))
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
    let reqMatched=await this.adminRequestService.getReqMatched()
  console.log(reqStat)
    res.json({reqStat:reqStat,reqMatched:reqMatched})
  }
  async getReqChart(req,res){
    let {start,end}=req.query
    let result=await this.adminRequestService.getReqResGrowth(start,end)
    res.json(result)
  }
  async getReqList(req,res){
    let reqList=await this.adminRequestService.getReqList()
    
console.log(reqList)
res.json(reqList)
 
}
}

module.exports = AdminRequestRouter;
