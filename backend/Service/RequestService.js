class RequestService {
  constructor(knex) {
    this.knex = knex;
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
        console.log("Member Service getRequestTag: ", requestQuery[0]);
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

  async postNewTag(newTag) {
    // Declare a function to check if tag already exist
    const addTag = async (tag) => {
      let matchedTag = await this.knex("tag").select("*").where("tagName", tag);
      console.log("MemberService postNewTag", matchedTag);
      // if tag is new, insert new tag
      if (!matchedTag || matchedTag.length < 1) {
        console.log("Posting new tag..");
        return this.knex.insert({ tagName: tag }).into("tag").returning("id");
      } else {
        console.log("This tag is duplicated");
        return matchedTag[0].id;
      }
    };
    try {
      let tagIdArr = newTag.map((tag) => addTag(tag));
      // console.log("tagIdArr: ", tagIdArr);
      return tagIdArr;
    } catch (err) {
      throw new Error(err);
    }
  }

  async postNewRequest(newRequest) {
    try {
      console.log("Posting new request..");
      let requestId = await this.knex
        .insert({
          requesterId: newRequest.userId,
          title: newRequest.title,
          detail: newRequest.detail,
          reward: newRequest.reward,
          requiredPpl: newRequest.requiredPpl,
          district: newRequest.district,
          status: newRequest.status,
        })
        .into("request")
        .returning("id");
      return requestId[0];
    } catch (err) {
      throw new Error(err);
    }
  }

  async postTagReqJoin(requestId, tagNameArr) {
    if (tagNameArr.length > 0) {
      let tagIdArray = [];
      for (let i = 0; i < tagNameArr.length; i++) {
        let tagname = tagNameArr[i];
        let tagQuery = await this.knex("tag")
          .select("id")
          .where("tagName", tagname);
        tagIdArray.push(tagQuery[0].id);
      }
      console.log("Tagidarr: ", tagIdArray);

      tagIdArray.forEach(
        async (tagId) =>
          await this.knex
            .insert({
              tagId: tagId,
              requestId: requestId,
            })
            .into("tagReqJoin")
      );
    } else {
      console.log("Tag array empty");
      return;
    }
  }
}

module.exports = RequestService;
