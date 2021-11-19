const express = require("express");

class RequestRouter {
  constructor(requestService) {
    this.requestService = requestService;
  }

  router() {
    let router = express.Router();

    router.get(
      "/request/detail/:requestId/:userId",
      this.getRequestDetail.bind(this)
    );
    router.post("/request/create", this.postNewRequest.bind(this));

    return router;
  }

  async getRequestDetail(req, res, next) {
    try {
      let reqDetail = await this.requestService.getRequestDetail(
        req.params.requestId
      );
      let reqTag = await this.requestService.getRequestTag(
        req.params.requestId
      );
      let reqPublicComment = await this.requestService.getRequestPublicComment(
        req.params.requestId
      );
      res.json({ reqDetail, reqTag, reqPublicComment });
    } catch (err) {
      next(err);
      res.status(500).json(err);
    }
  }

  async getRequestPrivateComment(req, res, next) {
    try {
      let reqPrivateComment =
        await this.requestService.getRequestPrivateComment(
          req.params.requestId
        );
      res.json({ reqPrivateComment });
    } catch (err) {
      next(err);
      res.status(500).json(err);
    }
  }

  async postNewRequest(req, res, next) {
    try {
      let tagIdArray = await this.requestService.postNewTag(
        req.body.newRequest.tag
      );
      if (tagIdArray) {
        let newReqId = await this.requestService.postNewRequest(
          req.body.newRequest
        );
        console.log("Router newReqId: ", newReqId);
        await this.requestService.postTagReqJoin(
          newReqId,
          req.body.newRequest.tag
        );
        console.log("Post req finish");
        res.json({ newReqId });
      } else {
        console.log("Something goes wrong: ", tagArray);
      }
    } catch (err) {
      next(err);
      res.status(500).json(err);
    }
  }
}

module.exports = RequestRouter;
