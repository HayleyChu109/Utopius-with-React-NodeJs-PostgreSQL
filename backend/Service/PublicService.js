class PublicService {
  constructor(knex) {
    this.knex = knex;
  }

  async getOpenRequest() {
    try {
      let openReq = await this.knex("request")
        .select("*")
        .where("status", "open")
        .orderBy("created_at", "desc");
      if (openReq && openReq.length > 0) {
        return openReq;
      } else {
        return [];
      }
    } catch (err) {
      throw new Error(err);
    }
  }

  async postMsg(email, name, title, message) {
    try {
      let guestMsgId = await this.knex("guestMsg")
        .insert({ email: email, name: name, title: title, message: message })
        .returning("id");
      if (guestMsgId) {
        await this.knex("task").insert({
          guestMsgId: Number(guestMsgId),
          status: "unread",
        });
        console.log(guestMsgId);
        return guestMsgId;
      }
    } catch (err) {
      throw new Error(err);
    }
  }
}

module.exports = PublicService;
