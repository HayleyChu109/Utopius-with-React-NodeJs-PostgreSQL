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

  postMsg(email, name, title, message) {
    return this.knex
      .insert({
        email: email,
        name: name,
        title: title,
        message: message,
      })
      .into("guestMsg")
      .returning("*");
  }
}

module.exports = PublicService;
