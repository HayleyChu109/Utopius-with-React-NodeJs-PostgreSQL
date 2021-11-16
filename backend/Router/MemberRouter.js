const express = require("express");

class MemberRouter {
  constructor(memberService) {
    this.memberService = memberService;
  }

  router() {
    let router = express.Router();
    router.put("/bookmark", this.postBookmark.bind(this));

    return router;
  }

  postBookmark(req, res) {
    this.memberService.update
  }
}

module.exports = MemberRouter;
