const express = require("express");

class RequestRouter {
  constructor(requestService) {
    this.requestService = requestService;
  }

  router() {
    let router = express.Router();
    // Routers for request
    router.get(
      "/request/detail/:requestId/:userId",
      this.getRequestDetail.bind(this)
    );
    router.post("/request/create", this.postNewRequest.bind(this));
    // Routes for bookmark
    router.get("/bookmarklist/:userId", this.getBookmarkList.bind(this));
    router.post("/bookmark", this.postBookmark.bind(this));
    router.delete(
      "/bookmark/:requestId/:userId",
      this.deleteBookmark.bind(this)
    );
    // Routes for comments
    router.post("/request/comment", this.postNewComment.bind(this));
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

  async getBookmarkList(req, res, next) {
    try {
      let bookmarkList = await this.requestService.getBookmarkList(
        req.params.userId
      );
      let bookmarkIdList = [];
      for (let i = 0; i < bookmarkList.length; i++) {
        bookmarkIdList.push(bookmarkList[i].requestId);
      }
      res.json({ bookmarkIdList });
    } catch (err) {
      next(err);
      res.status(500).json(err);
    }
  }

  async postBookmark(req, res, next) {
    try {
      await this.requestService.postBookmark(
        req.body.requestId,
        req.body.userId
      );
      let bookmarkList = await this.requestService.getBookmarkList(
        req.body.userId
      );
      let bookmarkIdList = [];
      for (let i = 0; i < bookmarkList.length; i++) {
        bookmarkIdList.push(bookmarkList[i].requestId);
      }
      res.json({ bookmarkIdList });
    } catch (err) {
      next(err);
      res.status(500).json(err);
    }
  }

  async deleteBookmark(req, res, next) {
    try {
      await this.requestService.deleteBookmark(
        req.params.requestId,
        req.params.userId
      );
      let bookmarkList = await this.requestService.getBookmarkList(
        req.params.userId
      );
      let bookmarkIdList = [];
      for (let i = 0; i < bookmarkList.length; i++) {
        bookmarkIdList.push(bookamrkList[i].requestId);
      }
      res.json({ bookmarkIdList });
    } catch (err) {
      next(err);
      res.status(500).json(err);
    }
  }

  async postNewComment(req, res, next) {
    try {
      await this.requestService.postNewComment(
        req.body.userId,
        req.body.requestId,
        req.body.comment,
        req.body.type
      );
      if (req.body.type) {
        let privateCommentList =
          await this.requestService.getRequestPrivateComment(
            req.body.requsetId
          );
        console.log("Private cm list(Arr of obj): ", privateCommentList);
        res.json({ privateCommentList });
      } else {
        let publicCommentList = await this.requestService.getPublicComment(
          req.body.requestId
        );
        console.log("Public cm list(Arr of obj): ", publicCommentList);
        res.json({ publicCommentList });
      }
    } catch (err) {
      next(err);
      res.status(500).json(err);
    }
  }
}

module.exports = RequestRouter;
