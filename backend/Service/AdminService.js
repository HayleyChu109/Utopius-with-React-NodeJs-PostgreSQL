const e = require("express");
const moment = require("moment");
class AdminService {
  constructor(knex) {
    this.knex = knex;
  }

  getUserGrowth(startDate, endDate) {
    startDate = moment(startDate).format("YYYY-MM-DD");
    endDate = moment(endDate).format("YYYY-MM-DD");
    return this.knex
      .with("date_ranges", (qb) => {
        qb.select(this.knex.raw(`date_d::date as date_d`)).from(
          this.knex.raw(
            `GENERATE_SERIES(date '${startDate}'::DATE,'${endDate}'::DATE,'1 day'::INTERVAL)date_d`
          )
        );
      })
      .with("user_counts", (qb) => {
        qb.select(this.knex.raw(`created_at::date as date_d`))
          .select(this.knex.raw(`count(id)as cnt`))
          .from("account")
          .whereBetween("created_at", [startDate, endDate])
          .where({ isAdmin: false })
          .groupBy("created_at");
      })
      .select(
        this.knex.raw(
          `date_ranges.date_d AS "Date",COALESCE(user_counts.cnt,0)as "Daily Users",SUM(COALESCE(user_counts.cnt,0))OVER(ORDER BY date_ranges.date_d)as "Cumulative Users"`
        )
      )
      .from("date_ranges")
      .leftJoin("user_counts", "user_counts.date_d", "date_ranges.date_d");
  }

  getNewUser(number) {
    return this.knex("account")
      .select("id", "username", "firstName", "lastName")
      .where({ isAdmin: false })
      .limit(number)
      .orderBy("created_at");
  }
  getUser(userId) {
    return this.knex("account")
      .select(
        "account.id",
        "username",
        "firstName",
        "lastName",
        "email",
        "account.district",
        "grade",
        "token",
        "blacklist",
        "profilePath"
      )
      .count({ request: "request.id", response: "response.id" })
      .leftJoin("request", "account.id", "request.requesterId")
      .leftJoin("response", "account.id", "response.responserId")
      .where({ "account.id": userId })
      .groupBy("account.id");
  }
  getUserReview(userId) {
    return this.knex("review")
      .select("rating", "ratingComment")
      .join("account", "reviewerId", "account.id")
      .where({ isAdmin: false })
      .orderBy("created_at")
      .groupBy("requestId");
  }
  getUserRequest(number) {
    return this.knex("request")
      .select(
        "id",
        "title",
        "detail",
        "reward",
        "requirePpl",
        "district",
        "status"
      )
      .join("account", "requesterId", "account.id")
  }
}

module.exports = AdminService;
