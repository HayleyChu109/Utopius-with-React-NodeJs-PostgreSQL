const express = require("express");

class RequestRouter {
  constructor(requestService, memberService, tokenService) {
    this.requestService = requestService;
    this.memberService = memberService;
    this.tokenService = tokenService;
  }

  router() {
    let router = express.Router();
    // Routers for request
    router.get(
      "/request/detail/:requestId/:userId",
      this.getRequestDetail.bind(this)
    );
    router.post("/request/create", this.postNewRequest.bind(this));
    router.put("/request/status/:requestId", this.putRequestStatus.bind(this));
    // Routes for bookmark
    router.get("/bookmarklist/:userId", this.getBookmarkList.bind(this));
    router.post("/bookmark", this.postBookmark.bind(this));
    router.delete(
      "/bookmark/:requestId/:userId",
      this.deleteBookmark.bind(this)
    );
    // Routes for comments
    router.get("/request/comment/:requestId/:type", this.getComment.bind(this));
    router.post("/request/comment", this.postNewComment.bind(this));
    // Routes for resposne
    router.get("/request/response/:requestId", this.getResponseList.bind(this));
    router.post("/request/response/new", this.postNewResponse.bind(this));
    router.put("/request/response/edit", this.putResponse.bind(this));
    router.delete(
      "/request/response/delete/:requestId/:userId",
      this.deleteResponse.bind(this)
    );
    router.put("/request/response/match", this.putMatchedResponse.bind(this));
    router.get(
      "/request/:requestId/response/team",
      this.getTeamList.bind(this)
    );
    // Routes for review
    router.get(
      "/request/review/:requestId/:reviewerId",
      this.getReviewList.bind(this)
    );
    router.post("/request/review/new", this.postNewReview.bind(this));
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
        reqPhotoPath: reqDetail.reqPhotoPath,
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
        await this.tokenService.postTokenTransaction(
          newReqId,
          req.body.newRequest.userId,
          1,
          req.body.newRequest.reward * req.body.newRequest.requiredPpl
        );
        res.json({ newReqId });
      } else {
        console.log("Something goes wrong: ", tagArray);
      }
    } catch (err) {
      next(err);
      res.status(500).json(err);
    }
  }

  async putRequestStatus(req, res, next) {
    try {
      let message = await this.requestService.putRequestService(
        req.params.requestId,
        req.body.newStatus
      );
      if (req.body.newStatus === "cancelled") {
        await this.tokenService.postTokenTransaction(
          req.params.requestId,
          1,
          req.body.userId,
          req.body.reward
        );
      }
      res.json({ message });
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
        bookmarkIdList.push(bookmarkList[i].requestId);
      }
      res.json({ bookmarkIdList });
    } catch (err) {
      next(err);
      res.status(500).json(err);
    }
  }

  async getComment(req, res, next) {
    try {
      if (req.params.type === "true") {
        // console.log("Loading private comments..", req.params.type);
        let privateCommentList = await this.requestService.getPrivateComment(
          req.params.requestId
        );
        for (let i = 0; i < privateCommentList.length; i++) {
          let memberQuery = await this.memberService.getMemberInfo(
            privateCommentList[i].commenterId
          );
          privateCommentList[i].commenterUsername = memberQuery.username;
          privateCommentList[i].commenterGrade = memberQuery.grade;
          privateCommentList[i].commenterProfilePath = memberQuery.profilePath;
          privateCommentList[i].isAdmin = memberQuery.isAdmin;
        }
        res.json({ privateCommentList });
      } else {
        let publicCommentList = await this.requestService.getPublicComment(
          req.params.requestId
        );
        for (let i = 0; i < publicCommentList.length; i++) {
          let memberQuery = await this.memberService.getMemberInfo(
            publicCommentList[i].commenterId
          );
          publicCommentList[i].commenterUsername = memberQuery.username;
          publicCommentList[i].commenterGrade = memberQuery.grade;
          publicCommentList[i].commenterProfilePath = memberQuery.profilePath;
          publicCommentList[i].isAdmin = memberQuery.isAdmin;
        }
        res.json({ publicCommentList });
      }
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
        let privateCommentList = await this.requestService.getPrivateComment(
          req.body.requestId
        );
        for (let i = 0; i < privateCommentList.length; i++) {
          let memberQuery = await this.memberService.getMemberInfo(
            privateCommentList[i].commenterId
          );
          privateCommentList[i].commenterUsername = memberQuery.username;
          privateCommentList[i].commenterGrade = memberQuery.grade;
          privateCommentList[i].commenterProfilePath = memberQuery.profilePath;
          privateCommentList[i].isAdmin = memberQuery.isAdmin;
        }
        res.json({ privateCommentList });
      } else {
        let publicCommentList = await this.requestService.getPublicComment(
          req.body.requestId
        );
        for (let i = 0; i < publicCommentList.length; i++) {
          let memberQuery = await this.memberService.getMemberInfo(
            publicCommentList[i].commenterId
          );
          publicCommentList[i].commenterUsername = memberQuery.username;
          publicCommentList[i].commenterGrade = memberQuery.grade;
          publicCommentList[i].commenterProfilePath = memberQuery.profilePath;
          publicCommentList[i].isAdmin = memberQuery.isAdmin;
        }
        res.json({ publicCommentList });
      }
    } catch (err) {
      next(err);
      res.status(500).json(err);
    }
  }

  async getResponseList(req, res, next) {
    try {
      let responseList = await this.requestService.getResponseList(
        req.params.requestId
      );
      for (let i = 0; i < responseList.length; i++) {
        let memberQuery = await this.memberService.getMemberInfo(
          responseList[i].responserId
        );
        responseList[i].responserUsername = memberQuery.username;
        responseList[i].responserGrade = memberQuery.grade;
        responseList[i].responserProfilePath = memberQuery.profilePath;
        responseList[i].isAdmin = memberQuery.isAdmin;
      }
      res.json({ responseList });
    } catch (err) {
      next(err);
      res.status(500).json(err);
    }
  }

  async postNewResponse(req, res, next) {
    try {
      await this.requestService.postNewResponse(
        req.body.userId,
        req.body.requestId,
        req.body.detail,
        req.body.matched
      );
      let responseList = await this.requestService.getResponseList(
        req.body.requestId
      );
      res.json({ responseList });
    } catch (err) {
      next(err);
      res.status(500).json(err);
    }
  }

  async putResponse(req, res, next) {
    try {
      let result = await this.requestService.putResponse(
        req.body.requestId,
        req.body.userId,
        req.body.responseMsg
      );
      if (result.message) {
        res.json({ result });
      }
    } catch (err) {
      next(err);
      res.status(500).json(err);
    }
  }

  async deleteResponse(req, res, next) {
    try {
      await this.requestService.deleteResponse(
        req.params.requestId,
        req.params.userId
      );
      res.json({ message: "Successfully deleted response" });
    } catch (err) {
      next(err);
      res.status(500).json(err);
    }
  }

  async putMatchedResponse(req, res, next) {
    try {
      let result = await this.requestService.putMatchedResponse(
        req.body.matchedRes,
        req.body.requestId
      );
      if (result.message) {
        res.json({ result });
      }
    } catch (err) {
      next(err);
      res.status(500).json(err);
    }
  }

  async getTeamList(req, res, next) {
    console.log("RequestId: ", req.params.requestId);
    try {
      let teamList = await this.requestService.getTeamList(
        req.params.requestId
      );
      let teamResId = teamList.map((idObj) => idObj.id);
      for (let i = 0; i < teamList.length; i++) {
        let memberQuery = await this.memberService.getMemberInfo(
          teamList[i].responserId
        );
        teamList[i].responserUsername = memberQuery.username;
        teamList[i].responserGrade = memberQuery.grade;
        teamList[i].responserProfilePath = memberQuery.profilePath;
        teamList[i].responserId = memberQuery.id;
      }
      console.log("TeamList: ", teamList);
      res.json({ teamList, teamResId });
    } catch (err) {
      next(err);
      res.status(500).json(err);
    }
  }

  async getReviewList(req, res, next) {
    try {
      console.log(req.params.requestId, req.params.reviewerId);
      let reviewList = await this.requestService.getReviewList(
        req.params.requestId,
        req.params.reviewerId
      );
      res.json({ reviewList });
    } catch (err) {
      next(err);
      res.status(500).json(err);
    }
  }

  async postNewReview(req, res, next) {
    console.log("ReviewInfo: ", req.body.reviewInfo);
    try {
      // Post review
      for (let reviewee in req.body.reviewInfo) {
        let rating = req.body.reviewInfo[reviewee].rating;
        let contributed = req.body.reviewInfo[reviewee].contributed;
        let ratingComment = req.body.reviewInfo[reviewee].ratingComment;
        if (contributed === undefined) {
          contributed = true;
        }
        console.log(rating, contributed, ratingComment);
        await this.requestService.postReview(
          req.body.requestId,
          req.body.userId,
          reviewee,
          rating,
          contributed,
          ratingComment
        );
      }
      // Post token transaction if reviewer is the requester
      if (req.body.userId === req.body.requestDetail.requesterId) {
        for (let reviewee in req.body.reviewInfo) {
          let contributed = req.body.reviewInfo[reviewee].contributed;
          if (contributed === undefined) {
            contributed = true;
          }
          console.log(contributed);
          if (contributed) {
            await this.tokenService.postTokenTransaction(
              req.body.requestId,
              1,
              reviewee,
              req.body.requestDetail.reward
            );
          } else {
            await this.tokenService.postTokenTransaction(
              req.body.requestId,
              1,
              req.body.userId,
              req.body.requestDetail.reward
            );
          }
        }
      }
      res.json({ message: "Review completed !" });
    } catch (err) {
      next(err);
      res.status(500).json(err);
    }
  }
}

module.exports = RequestRouter;
