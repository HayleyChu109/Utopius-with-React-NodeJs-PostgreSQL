const express = require("express");

class MemberRouter {
  constructor(memberService) {
    this.memberService = memberService;
  }

  router() {
    let router = express.Router();
    // Profile routes
    router.get("/memberinfo/:id", this.getMemberInfo.bind(this));
    router.put("/memberinfo/:id", this.putMemberInfo.bind(this));
    router.get("/memberreq/:id", this.getMemberReqDetail.bind(this));
    router.get("/memberres/:id", this.getMemberResDetail.bind(this));

    // Request routes
    router.get(
      "/request/detail/:requestId/:userId",
      this.getRequestDetail.bind(this)
    );

    return router;
  }

  // Get member profile
  async getMemberInfo(req, res, next) {
    console.log("Get member info");
    try {
      let info = await this.memberService.getMemberInfo(req.params.id);
      if (info) {
        console.log("Get member info", info);
        res.json(info);
      }
    } catch (err) {
      next(err);
      throw new Error(err);
    }
  }

  // Edit member profile
  putMemberInfo(req, res) {
    console.log("Submit member info");
    return this.memberService
      .putMemberInfo(
        req.params.id,
        req.body.username,
        req.body.firstName,
        req.body.lastName,
        req.body.phone,
        req.body.district,
        req.body.profilePath
      )
      .then((id) => {
        console.log(id);
        res.json(id);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  }

  // Get member request details
  async getMemberReqDetail(req, res, next) {
    try {
      let memberReq = await this.memberService.getMemberReqDetail(
        req.params.id
      );
      if (memberReq) {
        console.log("Member request", memberReq);
        res.json(memberReq);
      } else {
        res.json([]);
      }
    } catch (err) {
      next(err);
      throw new Error(err);
    }
  }

  // Get member response details
  async getMemberResDetail(req, res, next) {
    try {
      let memberRes = await this.memberService.getMemberResDetail(
        req.params.id
      );
      if (memberRes) {
        console.log("Member response", memberRes);
        res.json(memberRes);
      } else {
        res.json([]);
      }
    } catch (err) {
      next(err);
      throw new Error(err);
    }
  }

  async getRequestDetail(req, res, next) {
    try {
      let reqDetail = await this.memberService.getRequestDetail(
        req.params.requestId
      );
      let reqTag = await this.memberService.getRequestTag(req.params.requestId);
      let reqPublicComment = await this.memberService.getRequestPublicComment(
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
      let reqPrivateComment = await this.memberService.getRequestPrivateComment(
        req.params.requestId
      );
      res.json({ reqPrivateComment });
    } catch (err) {
      next(err);
      res.status(500).json(err);
    }
  }
}

module.exports = MemberRouter;
