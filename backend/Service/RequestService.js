class RequestService {
  constructor(knex) {
    this.knex = knex;
  }

  /**************** Request service ****************/
  async getRequestDetail(requestId) {
    console.log("Service: ", requestId);
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

  async getRequesterDetail(requesterId) {
    try {
      let requesterQuery = await this.knex
        .select("id", "username", "grade", "profilePath")
        .from("account")
        .where("id", requesterId);
      return requesterQuery[0];
    } catch (err) {
      throw new Error(err);
    }
  }

  async postNewRequest(newRequest) {
    try {
      let requestId = await this.knex
        .insert({
          requesterId: newRequest.userId,
          title: newRequest.title,
          detail: newRequest.detail,
          reward: newRequest.reward,
          requiredPpl: newRequest.requiredPpl,
          district: newRequest.district,
          reqPhotoPath: newRequest.photoPath,
          status: newRequest.status,
        })
        .into("request")
        .returning("id");
      return requestId[0];
    } catch (err) {
      throw new Error(err);
    }
  }

  async putRequestService(requestId, newStatus) {
    try {
      await this.knex("request")
        .where("id", requestId)
        .update({ status: newStatus });
      if (newStatus === "cancelled") {
        return { message: "Request cancelled" };
      } else if (newStatus === "completed") {
        return { message: "Request completed" };
      }
    } catch (err) {
      throw new Error(err);
    }
  }
  /**************** Request service ****************/

  /**************** Tag service ****************/
  async getRequestTag(requestId) {
    try {
      let requestQuery = await this.knex("tagReqJoin")
        .join("tag", "tagReqJoin.tagId", "tag.id")
        .select("*")
        .where("requestId", requestId);
      if (requestQuery.length > 0) {
        // console.log("Member Service getRequestTag: ", requestQuery[0]);
        return requestQuery;
      } else {
        return [];
      }
    } catch (err) {
      throw new Error(err);
    }
  }

  async postNewTag(newTag) {
    const addTag = async (tag) => {
      let matchedTag = await this.knex("tag").select("*").where("tagName", tag);
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
      return tagIdArr;
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
        if (tagQuery && tagQuery.length > 0) {
          tagIdArray.push(tagQuery[0].id);
        }
      }
      // console.log("Tagidarr: ", tagIdArray);

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
  /**************** Tag service ****************/

  /**************** Bookmark service ****************/
  async getBookmarkList(userId) {
    try {
      let bookmarkQuery = await this.knex("bookmark")
        .select("*")
        .where("accountId", userId);
      if (bookmarkQuery && bookmarkQuery.length > 0) {
        return bookmarkQuery;
      } else {
        console.log("This man has no bookmark");
        return [];
      }
    } catch (err) {
      console.log(err);
    }
  }

  async postBookmark(requestId, userId) {
    try {
      let repeatedBookmark = await this.knex("bookmark")
        .select("id")
        .where("accountId", userId)
        .andWhere("requestId", requestId);
      if (repeatedBookmark && repeatedBookmark.length > 0) {
        console.log("Bookmark already exist");
      } else {
        console.log("Posting new bookmark");
        return this.knex
          .insert({ accountId: userId, requestId: requestId })
          .into("bookmark");
      }
    } catch (err) {
      console.log(err);
    }
  }

  async deleteBookmark(requestId, userId) {
    try {
      return await this.knex("bookmark")
        .where("requestId", requestId)
        .andWhere("accountId", userId)
        .del();
    } catch (err) {
      console.log(err);
    }
  }
  /**************** Bookmark service ****************/

  /**************** Comment service ****************/
  async getPublicComment(requestId) {
    try {
      let commentQuery = await this.knex("comment")
        .select("*")
        .where("requestId", requestId)
        .andWhere("private", false);
      // .orderBy("created_at", "desc");
      if (commentQuery.length > 0) {
        // console.log(commentQuery);
        return commentQuery;
      } else {
        return [];
      }
    } catch (err) {
      throw new Error(err);
    }
  }

  async getPrivateComment(requestId) {
    try {
      let commentQuery = await this.knex("comment")
        .select("*")
        .where("requestId", requestId)
        .andWhere("private", true);
      if (commentQuery.length > 0) {
        // console.log(commentQuery);
        return commentQuery;
      } else {
        return [];
      }
    } catch (err) {
      throw new Error(err);
    }
  }

  async postNewComment(userId, requestId, comment, type) {
    console.log("Inserting comment..", userId, requestId, comment, type);
    try {
      await this.knex
        .insert({
          commenterId: userId,
          requestId: Number(requestId),
          detail: comment,
          private: type,
        })
        .into("comment");
    } catch (err) {
      console.log(err);
    }
  }
  /**************** Comment service ****************/

  /**************** Response service ****************/
  async getResponseList(requestId) {
    try {
      let requestQuery = await this.knex("response")
        .select("*")
        .where("requestId", requestId)
        .orderBy("created_at", "desc");
      if (requestQuery.length > 0) {
        // console.log(requestQuery[0]);
        return requestQuery;
      } else {
        return [];
      }
    } catch (err) {
      throw new Error(err);
    }
  }

  async postNewResponse(userId, requestId, detail, matched) {
    try {
      await this.knex
        .insert({
          responserId: userId,
          requestId: requestId,
          detail: detail,
          matched: matched,
        })
        .into("response");
      console.log("Inserting response..");
    } catch (err) {
      throw new Error(err);
    }
  }

  async putResponse(requestId, userId, responseMsg) {
    try {
      await this.knex("response")
        .where("requestId", requestId)
        .andWhere("responserId", userId)
        .update({ detail: responseMsg, matched: false });
      return { message: "Successfully updated" };
    } catch (err) {
      throw new Error(err);
    }
  }

  async deleteResponse(requestId, userId) {
    try {
      return await this.knex("response")
        .where("requestId", requestId)
        .andWhere("responserId", userId)
        .del();
    } catch (err) {
      throw new Error(err);
    }
  }

  async putMatchedResponse(matchedRes, requestId) {
    try {
      await this.knex("request")
        .where("id", requestId)
        .update({ status: "matched" });
      for (let i = 0; i < matchedRes.length; i++) {
        await this.knex("response")
          .where("id", matchedRes[i])
          .andWhere("requestId", requestId)
          .update({ matched: true });
      }
      return { message: "Matched ! Let's meet your team !" };
    } catch (err) {
      throw new Error(err);
    }
  }

  async getTeamList(requestId) {
    try {
      let teamQuery = await this.knex("response")
        .select("id", "responserId")
        .where("requestId", requestId)
        .andWhere("matched", true)
        .orderBy("created_at", "desc");
      if (teamQuery && teamQuery.length > 0) {
        return teamQuery;
      } else {
        return [];
      }
    } catch (err) {
      throw new Error(err);
    }
  }
  /**************** Response service ****************/

  /**************** Review service ****************/
  async getReviewList(requestId, userId) {
    try {
      let reviewQuery = await this.knex("review")
        .select("*")
        .where("reviewerId", userId)
        .andWhere("requestId", requestId);
      return reviewQuery;
    } catch (err) {
      throw new Error(err);
    }
  }

  async postReview(
    requestId,
    reviewerId,
    revieweeId,
    rating,
    contributed,
    ratingComment
  ) {
    try {
      return await this.knex
        .insert({
          requestId,
          reviewerId,
          revieweeId,
          rating: rating ? rating : 0,
          contributed: contributed,
          ratingComment: ratingComment ? ratingComment : null,
        })
        .into("review");
    } catch (err) {
      throw new Error(err);
    }
  }
}

module.exports = RequestService;
