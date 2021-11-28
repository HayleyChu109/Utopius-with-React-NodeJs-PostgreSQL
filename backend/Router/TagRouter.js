const express = require("express");

class TagRouter {
  constructor(adminService) {
    this.adminService = adminService;
  }

  router() {
    let router = express.Router();
    router.get('/',this.getTagList.bind(this))
    router.get('/request/:id',this.getTagReq.bind(this))
    router.get('/count',this.getTagCount.bind(this))
    return router;
  }
  async getTagCount(req,res){
    let tagCount=await this.adminService.getTagCount()

    res.json(tagCount)
  }
  async getTagList(req,res){
    let tagList=await this.adminService.getTagList()

    res.json(tagList)
  }
  async getTagReq(req,res){
      let tagId=req.params.id
    let tagReq=await this.adminService.getTagReq(tagId)

    res.json(tagReq)
  }
}

module.exports = TagRouter;
