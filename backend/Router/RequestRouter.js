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
      let requesterDetail = await this.requestService.getRequesterDetail(
        reqDetail.requesterId
      );
      let reqTag = await this.requestService.getRequestTag(
        req.params.requestId
      );

      let gradeColor = "";
      switch (requesterDetail.grade) {
        case "S":
          gradeColor = "#fac77c";
        case "A":
          gradeColor = "#fa7c92";
        case "B":
          gradeColor = "#7c97fa";
        case "C":
          gradeColor = "#52b46e";
        case "D":
          gradeColor = "#152e87";
        case "E":
          gradeColor = "#875915";
        case "F":
          gradeColor = "#333333";
        default:
          gradeColor = "#c4c4c4";
      }

      let data = {
        id: reqDetail.id,
        title: reqDetail.title,
        detail: reqDetail.detail,
        reward: reqDetail.reward,
        requiredPpl: reqDetail.requiredPpl,
        district: reqDetail.district,
        status: reqDetail.status,
        createdAt: reqDetail.created_at,
        tag: reqTag,
        requesterId: reqDetail.requesterId,
        requesterUsername: requesterDetail.username,
        requesterGrade: requesterDetail.grade,
        requesterGradeColor: gradeColor,
        requesterProfilePath: requesterDetail.profilePath,
      };
      res.json(data);
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
