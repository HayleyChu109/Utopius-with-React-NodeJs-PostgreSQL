class MemberService {
  constructor(knex) {
    this.knex = knex;
  }

  async getMemberInfo(memberId) {
    try {
      let memberInfo = await this.knex("account")
        .select(
          "id",
          "username",
          "email",
          "firstName",
          "lastName",
          "phone",
          "district",
          "profilePath",
          "grade",
          "token",
          "created_at"
        )
        .where("id", memberId);
      if (memberInfo.length > 0) {
        return memberInfo[0];
      } else {
        return [];
      }
    } catch (err) {
      throw new Error(err);
    }
  }

  putMemberInfo(
    memberId,
    username,
    firstName,
    lastName,
    phone,
    district,
    profilePath
  ) {
    return this.knex("account")
      .update({
        username: username,
        firstName: firstName,
        lastName: lastName,
        phone: phone,
        district: district,
        profilePath: profilePath,
      })
      .where("account.id", memberId)
      .returning("account.id");
  }

  getMemberReqDetail(memberId) {
    let memberReq = this.knex("request")
      .join("account", "account.id", "request.requesterId")
      .join("tagReqJoin", "tagReqJoin.requestId", "request.id")
      .join("tag", "tag.id", "tagReqJoin.tagId")
      .select(
        "account.username",
        "account.grade",
        "request.id",
        "request.requesterId",
        "request.title",
        "request.detail",
        "request.reward",
        "request.requiredPpl",
        "request.district",
        "request.status",
        "request.reqPhotoPath",
        "request.created_at",
        "tag.tagName"
      )
      .where("requesterId", memberId);
    return memberReq.then((data) => {
      if (data.length > 0) {
        let result = [];
        let last = 0;
        for (let i = 1; i < data.length; i++) {
          if (data[i].id !== data[i - 1].id) {
            result.push(data.slice(last, i));
            last = i;
          }
        }
        result.push(data.slice(last));

        let reqList = [];
        for (let i = 0; i < result.length; i++) {
          let eachReq = {
            username: result[i][0].username,
            grade: result[i][0].grade,
            id: result[i][0].id,
            requesterId: result[i][0].requesterId,
            title: result[i][0].title,
            detail: result[i][0].detail,
            reward: result[i][0].reward,
            requiredPpl: result[i][0].requiredPpl,
            district: result[i][0].district,
            status: result[i][0].status,
            reqPhotoPath: result[i][0].reqPhotoPath,
            created_at: result[i][0].created_at,
            tag: [],
          };
          result[i].map((data) => {
            let tag = data.tagName;
            eachReq.tag.push(tag);
          });
          reqList.push(eachReq);
        }
        return reqList;
      } else {
        let reqList = [];
        return reqList;
      }
    });
  }
  catch(err) {
    throw new Error(err);
  }

  getMemberResDetail(memberId) {
    let memberRes = this.knex("request")
      .join("account", "account.id", "request.requesterId")
      .join("response", "response.requestId", "request.id")
      .join("tagReqJoin", "tagReqJoin.requestId", "request.id")
      .join("tag", "tag.id", "tagReqJoin.tagId")
      .select(
        "account.username",
        "account.grade",
        "request.id",
        "request.requesterId",
        "request.title",
        "request.detail",
        "request.reward",
        "request.requiredPpl",
        "request.district",
        "request.status",
        "request.reqPhotoPath",
        "request.created_at",
        "tag.tagName",
        "response.matched"
      )
      .where("responserId", memberId);

    return memberRes.then((data) => {
      if (data.length > 0) {
        let result = [];
        let last = 0;
        for (let i = 1; i < data.length; i++) {
          if (data[i].id !== data[i - 1].id) {
            result.push(data.slice(last, i));
            last = i;
          }
        }
        result.push(data.slice(last));

        let resList = [];
        for (let i = 0; i < result.length; i++) {
          let eachRes = {
            username: result[i][0].username,
            grade: result[i][0].grade,
            id: result[i][0].id,
            requesterId: result[i][0].requesterId,
            title: result[i][0].title,
            detail: result[i][0].detail,
            reward: result[i][0].reward,
            requiredPpl: result[i][0].requiredPpl,
            district: result[i][0].district,
            status: result[i][0].status,
            reqPhotoPath: result[i][0].reqPhotoPath,
            created_at: result[i][0].created_at,
            tag: [],
            matched: result[i][0].matched,
          };
          result[i].map((data) => {
            let tag = data.tagName;
            eachRes.tag.push(tag);
          });
          resList.push(eachRes);
        }
        return resList;
      } else {
        let resList = [];
        return resList;
      }
    });
  }
  catch(err) {
    throw new Error(err);
  }

  async getReview(revieweeId) {
    try {
      let review = await this.knex("review")
        .join("account", "account.id", "reviewerId")
        .select(
          "review.id",
          "review.requestId",
          "review.reviewerId",
          "review.rating",
          "review.ratingComment",
          "review.created_at",
          "account.id",
          "account.username",
          "account.grade",
          "account.profilePath"
        )
        .andWhere("review.revieweeId", revieweeId);
      if (review.length > 0) {
        return review;
      } else {
        return [];
      }
    } catch (err) {
      throw new Error(err);
    }
  }

  getBookmark(bookmarkId) {
    let bookmark = this.knex("request")
      .join("account", "account.id", "request.requesterId")
      .join("tagReqJoin", "tagReqJoin.requestId", "request.id")
      .join("tag", "tag.id", "tagReqJoin.tagId")
      .select(
        "account.username",
        "account.grade",
        "request.id",
        "request.requesterId",
        "request.title",
        "request.detail",
        "request.reward",
        "request.requiredPpl",
        "request.district",
        "request.reqPhotoPath",
        "request.created_at",
        "tag.tagName"
      )
      .where("request.id", bookmarkId);

    return bookmark.then((data) => {
      if (data.length > 0) {
        let result = [];
        let last = 0;
        for (let i = 1; i < data.length; i++) {
          if (data[i].id !== data[i - 1].id) {
            result.push(data.slice(last, i));
            last = i;
          }
        }
        result.push(data.slice(last));

        let bookmarkList = [];
        for (let i = 0; i < result.length; i++) {
          let eachBookmark = {
            username: result[i][0].username,
            grade: result[i][0].grade,
            id: result[i][0].id,
            requesterId: result[i][0].requesterId,
            title: result[i][0].title,
            detail: result[i][0].detail,
            reward: result[i][0].reward,
            requiredPpl: result[i][0].requiredPpl,
            district: result[i][0].district,
            reqPhotoPath: result[i][0].reqPhotoPath,
            created_at: result[i][0].created_at,
            tag: [],
          };
          result[i].map((data) => {
            let tag = data.tagName;
            eachBookmark.tag.push(tag);
          });
          bookmarkList.push(eachBookmark);
        }
        return bookmarkList;
      } else {
        let bookmarkList = [];
        return bookmarkList;
      }
    });
  }
  catch(err) {
    throw new Error(err);
  }

  async postReport(reporterId, reporteeId, title, message) {
    try {
      let email = await this.knex("account")
        .select("email")
        .where("id", reporterId);
      let reporterEmail = email[0].email;
      const reportId = await this.knex("reportMember")
        .insert({
          reporterId: reporterId,
          reporteeId: reporteeId,
          email: reporterEmail,
          title: title,
          message: message,
        })
        .returning("reportMember.id");
      if (reportId) {
        await this.knex("task").insert({
          reportMemberId: Number(reportId),
          status: "unread",
        });
        return reportId;
      }
    } catch (err) {
      throw new Error(err);
    }
  }

  async getFollowOrNot(followerId, followingId) {
    try {
      let friendshipId = await this.knex("friendship")
        .select("id")
        .where("followerId", followerId)
        .andWhere("followingId", followingId);
      if (friendshipId && friendshipId.length > 0) {
        return friendshipId;
      } else {
        return [];
      }
    } catch (err) {
      throw new Error(err);
    }
  }

  async postFollowMember(followerId, followingId) {
    try {
      let friendshipId = await this.knex("friendship")
        .insert({
          followerId: followerId,
          followingId: followingId,
        })
        .returning("id");
      return friendshipId;
    } catch (err) {
      throw new Error(err);
    }
  }

  async getAllUsername() {
    try {
      let allUsername = await this.knex("account").select("id", "username");
      return allUsername;
    } catch (err) {
      throw new Error(err);
    }
  }
}

module.exports = MemberService;
