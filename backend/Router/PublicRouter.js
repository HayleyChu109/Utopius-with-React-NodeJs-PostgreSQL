const express = require("express");

class PublicRouter {
  constructor(publicService, requestService) {
    this.publicService = publicService;
    this.requestService = requestService;
  }

  router() {
    let router = express.Router();
    // Getting all open announcements
    router.get("/announcementlist", this.getAnnouncementList.bind(this));
    // Getting all open request
    router.get("/requestList/:userId", this.getRequestList.bind(this));
    // Posting guest message
    router.post("/message", this.postMsg.bind(this));
    return router;
  }

  async getAnnouncementList(req, res, next) {
    try {
      let announcementList =
        await this.publicService.getPublicAnnouncementList();
      res.json({ announcementList });
    } catch (err) {
      next(err);
      throw new Error(err);
    }
  }

  async getRequestList(req, res, next) {
    try {
      let openReq = await this.publicService.getOpenRequest();
      for (let i = 0; i < openReq.length; i++) {
        let tag = await this.requestService.getRequestTag(openReq[i].id);
        let tagNameArr = [];
        tag.forEach((tagObj) => {
          tagNameArr.push(tagObj.tagName);
        });
        openReq[i].tag = tagNameArr;
        let requesterInfo = await this.requestService.getRequesterDetail(
          openReq[i].requesterId
        );
        openReq[i].requesterId = requesterInfo.id;
        openReq[i].username = requesterInfo.username;
        openReq[i].grade = requesterInfo.grade;
        openReq[i].profilePath = requesterInfo.profilePath;
      }
      res.json(openReq);
    } catch (err) {
      next(err);
      throw new Error(err);
    }
  }

  postMsg(req, res) {
    return this.publicService
      .postMsg(req.body.email, req.body.name, req.body.title, req.body.message)
      .then((guestMsgId) => {
        res.json(guestMsgId);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  }
}

module.exports = PublicRouter;
