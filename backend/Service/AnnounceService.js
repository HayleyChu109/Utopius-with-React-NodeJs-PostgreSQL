const moment = require("moment");
class AdminService {
  constructor(knex) {
    this.knex = knex;
  }
  getAnnounceList() {
    return this.knex("announcement").select();
  }
  getAnnouncement(requestId) {
    return this.knex("announcement").select().where({ id: requestId });
  }
  postAnnouncement(newTitle, newContent, privateBoolean, start, end) {
    return this.knex("announcement").insert({
      title: newTitle,
      content: newContent,
      isPrivate: privateBoolean,
      start_date: start,
      end_date: end,
    });
  }

  putAnnouncement(requestId, newTitle, newContent, privateBoolean, start, end) {
    return this.knex("announcement")
      .update({
        content: newContent,
        title: newTitle,
        isPrivate: privateBoolean,
        start_date: start,
        end_date: end,
      })
      .where({ id: requestId });
  }
  deleteAnnouncement(requestId) {
    return this.knex("announcement").delete().where({ id: requestId });
  }
}

module.exports = AdminService;
