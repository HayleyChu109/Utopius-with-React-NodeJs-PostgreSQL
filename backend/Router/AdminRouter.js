const express = require("express");
const moment =require('moment')
class AdminRouter {
  constructor(adminService) {
    this.adminService = adminService;
  }

  router() {
    let router = express.Router();
    router.get('/dashboard',this.postDashboard.bind(this))
    router.get('/user/req/:id',this.getUser.bind(this))
    router.get('/user/block/:id',this.getUserBlocking.bind(this))
    router.put('/user/block/:id',this.putUserBlocking.bind(this))
    return router;
  }
  async postDashboard(req,res)
  {
    console.log(req.body)
    let startDate=req.body.startDate
    let endDate=req.body.endDate
    let newUser=await this.adminService.getNewUser(10)
    console.log(newUser)
    let userStat=await this.adminService.getUserGrowth(moment().subtract(7, "day").toDate(), moment().toDate())
    console.log(userStat)
    userStat=userStat.map(item=>Object.assign({},{"Cumulative Users":Number(item['Cumulative Users']),'Daily Users':Number(item['Daily Users']),date:new Date(item.Date).toLocaleDateString('en-uk'),}))
    let reqResCountDaily=await this.adminService.getReqResGrowth(startDate,endDate)
    console.log(reqResCountDaily)
   console.log(userStat)
      let userGrowth = Object.assign(
         {},
         {  data: userStat }
       );
       console.log(userGrowth)
    res.json({userGrowth:userGrowth,newUserList:newUser})
  }
  async getUser(req,res)
  {
    let userId=req.params.id
    console.log(req.params.id)
    let result=await this.adminService.getUser(userId)
    console.log(result)
    res.json(result)
  }
  async getUserBlocking(req,res)
  {
    let userId=req.params.id
    console.log(req.params.id)
    let result=await this.adminService.getUserBlocking(userId)
      console.log(result)
    
    res.json(result)
  }
  async putUserBlocking(req,res)
  {
    let userId=req.params.id
    let status=req.body.status
    console.log(req.params.id)
    let result=await this.adminService.putUserBlocking(userId,status)
    console.log(result)
    res.json(result)
  }
}

module.exports = AdminRouter;
