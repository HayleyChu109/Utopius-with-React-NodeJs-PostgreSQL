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
          "token"
        )
        .where("id", memberId);
      if (memberInfo.length > 0) {
        return memberInfo[0];
      } else {
        return "No such member";
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
            created_at: new Date(
              Date.parse(result[i][0].created_at)
            ).toLocaleString(),
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
            created_at: new Date(
              Date.parse(result[i][0].created_at)
            ).toLocaleString(),
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
      console.log(review);
      if (review.length > 0) {
        for (let i = 0; i < review.length; i++) {
          review[i]["created_at"] = review[i]["created_at"].toLocaleString();
        }
        return review;
      } else {
        return "No review";
      }
    } catch (err) {
      throw new Error(err);
    }
  }
}

module.exports = MemberService;
