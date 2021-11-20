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
      console.log(memberInfo);
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

  async getMemberReqDetail(memberId) {
    try {
      let memberReq = await this.knex("request")
        .select("*")
        .where("requesterId", memberId);
      return memberReq;
    } catch (err) {
      throw new Error(err);
    }
  }

  async getMemberResDetail(memberId) {
    try {
      let memberRes = await this.knex("response")
        .select("*")
        .where("responserId", memberId);
      return memberRes;
    } catch (err) {
      throw new Error(err);
    }
  }

  async getRequestDetail(requestId, userId) {
    try {
      let requestQuery = await this.knex
        .select("*")
        .from("request")
        .where("id", requestId);
      return requestQuery[0];
    } catch (err) {
      throw new Error(err);
    }
  }

  async getRequestTag(requestId) {
    try {
      let requestQuery = await this.knex("tagReqJoin")
        .join("tag", "tagReqJoin.tagId", "tag.id")
        .select("*")
        .where("requestId", requestId);
      if (requestQuery.length > 0) {
        console.log(requestQuery[0]);
        return requestQuery[0];
      } else {
        return [];
      }
    } catch (err) {
      throw new Error(err);
    }
  }

  async getRequestResponse(requestId) {
    try {
      let requestQuery = await this.knex("response")
        .select("*")
        .where("requsetId", requestId);
      if (requestQuery.length > 0) {
        console.log(requestQuery[0]);
        return requestQuery[0];
      } else {
        return [];
      }
    } catch (err) {
      throw new Error(err);
    }
  }

  async getRequestPublicComment(requestId) {
    try {
      let requestQuery = await this.knex("comment")
        .select("*")
        .where("requestId", requestId)
        .andWhere("private", false);
      if (requestQuery.length > 0) {
        console.log(requestQuery[0]);
        return requestQuery[0];
      } else {
        return [];
      }
    } catch (err) {
      throw new Error(err);
    }
  }

  async getRequestPrivateComment(requestId) {
    try {
      let requestQuery = await this.knex("comment")
        .select("*")
        .where("requestId", requestId)
        .andWhere("private", true);
      if (requestQuery.length > 0) {
        console.log(requestQuery);
        return requestQuery[0];
      } else {
        return [];
      }
    } catch (err) {
      throw new Error(err);
    }
  }
}

module.exports = MemberService;
