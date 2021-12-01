const express = require("express");

class MemberRouter {
  constructor(memberService) {
    this.memberService = memberService;
  }

  router() {
    let router = express.Router();

    router.get("/memberinfo/:id", this.getMemberInfo.bind(this));
    router.put("/memberinfo/:id", this.putMemberInfo.bind(this));
    router.get("/memberreq/:id", this.getMemberReqDetail.bind(this));
    router.get("/memberres/:id", this.getMemberResDetail.bind(this));
    router.get("/review/:revieweeId", this.getReview.bind(this));
    router.get("/bookmark/:bookmarkid", this.getBookmark.bind(this));
    router.post("/report/", this.postReport.bind(this));
    // Friendship
    router.get("/followinglist/:id", this.getFollowinglist.bind(this));
    router.get("/followerlist/:id", this.getFollowerlist.bind(this));
    router.post("/follow", this.postFollow.bind(this));
    router.delete(
      "/unfollow/:followerId/:followingId",
      this.deleteFollow.bind(this)
    );
    router.get("/allusername", this.getAllUsername.bind(this));

    return router;
  }

  // Get member profile
  async getMemberInfo(req, res, next) {
    try {
      let info = await this.memberService.getMemberInfo(req.params.id);
      if (info) {
        // console.log("Get member info", info);
        res.json(info);
      }
    } catch (err) {
      next(err);
      throw new Error(err);
    }
  }

  // Edit member profile
  putMemberInfo(req, res) {
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
        // console.log("Member response", memberRes);
        res.json(memberRes);
      } else {
        res.json([]);
      }
    } catch (err) {
      next(err);
      throw new Error(err);
    }
  }

  // Get member review
  async getReview(req, res, next) {
    try {
      let review = await this.memberService.getReview(req.params.revieweeId);
      if (review) {
        console.log("Review", review);
        res.json(review);
      } else {
        res.json([]);
      }
    } catch (err) {
      next(err);
      throw new Error(err);
    }
  }

  // Get member bookmark
  async getBookmark(req, res, next) {
    try {
      const bookmarkId = req.params.bookmarkid.split(",");
      let bookmarkList = [];
      for (let i = 0; i < bookmarkId.length; i++) {
        let bookmark = await this.memberService.getBookmark(
          Number(bookmarkId[i])
        );
        bookmarkList.push(bookmark[0]);
      }
      if (bookmarkList) {
        res.json(bookmarkList);
      } else {
        res.json([]);
      }
    } catch (err) {
      next(err);
      throw new Error(err);
    }
  }

  // Post member report
  async postReport(req, res, next) {
    try {
      let reportId = await this.memberService.postReport(
        req.body.reporterId,
        req.body.reporteeId,
        req.body.title,
        req.body.message
      );
      if (reportId) {
        res.json(reportId);
      } else {
        res.json([]);
      }
    } catch (err) {
      next(err);
      throw new Error(err);
    }
  }

  // Get following list
  async getFollowinglist(req, res, next) {
    try {
      let followinglist = await this.memberService.getFollowinglist(
        req.params.id
      );
      res.json(followinglist);
    } catch (err) {
      next(err);
      throw new Error(err);
    }
  }

  // Get follower list
  async getFollowerlist(req, res, next) {
    try {
      let followerlist = await this.memberService.getFollowerlist(
        req.params.id
      );
      res.json(followerlist);
    } catch (err) {
      next(err);
      throw new Error(err);
    }
  }

  // Follow member
  async postFollow(req, res, next) {
    try {
      console.log(req.body);
      let friendshipId = await this.memberService.postFollow(
        req.body.followerId,
        req.body.followingId
      );
      let followerlist = await this.memberService.getFollowerlist(
        req.body.followingId
      );
      console.log("post follower list", followerlist);
      res.json(followerlist);
    } catch (err) {
      next(err);
      throw new Error(err);
    }
  }

  // Unfollow member
  async deleteFollow(req, res, next) {
    try {
      await this.memberService.deleteFollow(
        req.params.followerId,
        req.params.followingId
      );
      let followerlist = await this.memberService.getFollowerlist(
        req.params.followingId
      );
      console.log("delete Follower list", followerlist);
      res.json(followerlist);
    } catch (err) {
      next(err);
      throw new Error(err);
    }
  }

  // Get all username
  async getAllUsername(req, res, next) {
    try {
      let allUsername = await this.memberService.getAllUsername();
      if (allUsername) {
        res.json(allUsername);
      } else {
        res.json([]);
      }
    } catch (err) {
      next(err);
      throw new Error(err);
    }
  }
}

module.exports = MemberRouter;
