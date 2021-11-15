const express = require("express");

class MemberRouter {
  constructor(memberService) {
    this.memberService = memberService;
  }

  // router() {
  //   let router = express.Router();

  //   return router;
  // }
}

module.exports = MemberRouter;
