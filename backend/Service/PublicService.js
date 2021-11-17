class PublicService {
  constructor(knex) {
    this.knex = knex;
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
