const express = require("express");

class AdminRequestRouter {
  constructor(adminRequestService) {
      this.adminRequestService=adminRequestService
   
  }

  router() {
    let router = express.Router();
    router.get('/',this.getReqList.bind(this))
    router.get('/stat',this.getReqStat.bind(this))
    return router;
  }
  async getReqStat(req,res){
    let reqStat=await this.adminRequestService.getReqStat()
  console.log(reqStat)
    res.json(reqStat)
  }
  async getReqList(req,res){
    let reqList=await this.adminRequestService.getReqList()
    let reqTag=await this.adminRequestService.getReqTag()
    let result=reqList.map(item=>{
        return Object.assign({},{...item,tag:reqTag.filter(tag=>{
            if(tag.id===item.id)
            {
               return true

            }
        }).map(res=>res.tagName)
    
})
    })
console.log(result)
res.json(result)
 
}
}

module.exports = AdminRequestRouter;
