const express = require("express");
const moment = require("moment");
class AdminRouter {
  constructor(adminService) {
    this.adminService = adminService;
  }

  router() {
    let router = express.Router();
    router.get("/user/stat/daily", this.getUserGrowth.bind(this));
    router.get("/user/stat/monthly", this.getUserGrowthMonthly.bind(this));
    router.get("/user/list/", this.getUserList.bind(this));
    router.get("/user/req/:id", this.getUser.bind(this));
    router.get("/user/block/:id", this.getUserBlocking.bind(this));
    router.put("/user/block/:id", this.putUserBlocking.bind(this));
    router.put("/user/block/", this.putUserListBlocking.bind(this));
    return router;
  }
  async getUserGrowth(req, res) {
    console.log(req.query)
    let startDate = moment(req.query.start).toDate();
    console.log(startDate)
    let endDate = moment(req.query.end).toDate();
    console.log(endDate)
    let userStat = await this.adminService.getUserGrowth(
     startDate,endDate
    );
    console.log(userStat);
    userStat = userStat.map((item) =>
      Object.assign(
        {},
        {
          "Cumulative Users": Number(item["Cumulative Users"]),
          "Daily Users": Number(item["Daily Users"]),
          date: new Date(item.Date).toLocaleDateString("en-uk"),
        }
      )
    );
   
    console.log(userStat);
    let userGrowth = Object.assign({}, { data: userStat });
    console.log(userGrowth);
    res.json({ userGrowth: userGrowth});
  }
  async getUserGrowthMonthly(req, res) {
    console.log(req.query)
    console.log(moment('2013-02-10').toDate())
    let startDate = moment(req.query.start).toDate();
    console.log(startDate)
    let endDate = moment(req.query.end).toDate();
    let userStat = await this.adminService.getUserGrowthMonthly(
     startDate,endDate
    );
    console.log(userStat);
    let userGrowth = Object.assign({}, { data: userStat });
    console.log(userGrowth);
    res.json({ userGrowth: userGrowth});
  }
  async getUser(req, res) {
    let userId = req.params.id;
    let review=await this.adminService.getUserReview(userId)
    let response=await this.adminService.getUserResponse(userId)
    let comment=await this.adminService.getUserComment(userId)
    let result=Object.assign({},{review:review,response:response,comment:comment})
    console.log(result);
    res.json(result);
  }
  async getUserBlocking(req, res) {
    let userId = req.params.id;
    console.log(req.params.id);
    let result = await this.adminService.getUserBlocking(userId);
    console.log(result);

    res.json(result);
  }
  async putUserBlocking(req, res) {
    let userId = req.params.id;
    let status = req.body.status;
    console.log(req.params.id);
    let result = await this.adminService.putUserBlocking(userId, status);
    console.log(result);
    res.json(result);
  }
  async putUserListBlocking(req, res) {
    let userId = req.body.user;
    console.log(userId);
    let result = await this.adminService.putUserGroupBlocking(userId);
    let userList=await this.adminService.getUserList('id','asc')
    console.log(result);
    res.json(userList);
  }
  async getUserList(req, res) {
    try {
      console.log(req.query)
      let result
        if(req.query.column&&req.query.order)
        {
          console.log(req.query.order)
          
          result = await this.adminService.getUserList(req.query.column,req.query.order);
        }else{
          
          result = await this.adminService.getUserList('id','asc');
        }
     

          console.log(result);
          res.json(result);
        }
     catch (error) {}
  }
}

module.exports = AdminRouter;
