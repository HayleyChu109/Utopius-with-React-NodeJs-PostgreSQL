const express = require("express");

class PublicRouter {
  constructor(publicService, requestService) {
    this.publicService = publicService;
    this.requestService = requestService;
  }

  router() {
    let router = express.Router();
    router.get("/allusername", this.getAllUsername.bind(this));
    router.get("/requestList/:userId", this.getRequestList.bind(this));
    router.post("/message", this.postMsg.bind(this));
    return router;
  }

  // Get all username
  async getAllUsername(req, res, next) {
    try {
      let allUsername = await this.publicService.getAllUsername();
      if (allUsername) {
        res.json(allUsername);
      } else {
        res.json([]);
      }
    } catch (err) {
      next(err);
      throw new Error(err);
    }
  }

  async getRequestList(req, res, next) {
    console.log("Getting all the open request");
    try {
      let openReq = await this.publicService.getOpenRequest();
      for (let i = 0; i < openReq.length; i++) {
        let tag = await this.requestService.getRequestTag(openReq[i].id);
        let tagNameArr = [];
        tag.forEach((tagObj) => {
          tagNameArr.push(tagObj.tagName);
          // console.log(tagObj.tagName, "<<< TagName");
        });
        openReq[i].tag = tagNameArr;
        let requesterInfo = await this.requestService.getRequesterDetail(
          openReq[i].requesterId
        );
        openReq[i].requesterId = requesterInfo.id;
        openReq[i].username = requesterInfo.username;
        openReq[i].grade = requesterInfo.grade;
        openReq[i].profilePath = requesterInfo.profilePath;
        // console.log("PubRouter getRequestList requesterInfo: ", requesterInfo);
      }
      console.log("PubRouter getReqList OpenReq: ", openReq);
      res.json(openReq);
    } catch (err) {
      next(err);
      throw new Error(err);
    }
  }

  postMsg(req, res) {
    console.log("LEAVE A MESSAGE");
    return this.publicService
      .postMsg(req.body.email, req.body.name, req.body.title, req.body.message)
      .then((msg) => {
        console.log("Msg added", msg);
        res.json(msg);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  }
}

module.exports = PublicRouter;
