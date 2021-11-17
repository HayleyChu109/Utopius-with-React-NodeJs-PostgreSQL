const express = require("express");

class PublicRouter {
  constructor(publicService) {
    this.publicService = publicService;
  }

  router() {
    let router = express.Router();
    router.post("/message", this.postMsg.bind(this));
    return router;
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
