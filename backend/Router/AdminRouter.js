const express = require("express");

class AdminRouter {
  constructor(adminService) {
    this.adminService = adminService;
  }

  router() {
    let router = express.Router();
    router.post('/dashboard',this.postDashboard.bind(this))
    router.get('/user/:id',this.getUser.bind(this))
    return router;
  }
  async postDashboard(req,res)
  {
    console.log(req.body)
    let startDate=req.body.startDate
    let endDate=req.body.endDate
    let newUser=await this.adminService.getNewUser(10)
    console.log(newUser)
    let userStat=await this.adminService.getUserGrowth(startDate,endDate)
    console.log(userStat)
    userStat=userStat.map(item=>Object.assign({},{"Cumulative Users":Number(item['Cumulative Users']),'Daily Users':Number(item['Daily Users']),date:new Date(item.Date).toLocaleDateString('en-uk'),}))
   console.log(userStat)
      let userGrowth = Object.assign(
         {},
         { XAxisTitle: "date",line: ["Cumulative Users"], bar: ["Daily Users"], data: userStat }
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
}

module.exports = AdminRouter;
