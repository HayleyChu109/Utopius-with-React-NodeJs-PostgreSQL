const express = require("express");

class MemberRouter {
  constructor(memberService) {
    this.memberService = memberService;
  }

  router() {
    let router = express.Router();

    router.get("/memberinfo/:id", this.getMemberInfo.bind(this));
    router.put("/memberinfo/:id", this.putMemberInfo.bind(this));

    return router;
  }

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

  putMemberInfo(req, res) {
    console.log("Submit member info");
    console.log(req.params);
    console.log(req.body);
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
}

module.exports = MemberRouter;
