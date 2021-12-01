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
  
  getReqResGrowth(startDate, endDate) {
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
      .with("request_counts", (qb) => {
        qb.select(this.knex.raw(`created_at::date as date_d`))
          .select(this.knex.raw(`count(id)as cnt`))
          .from("request")
          .whereBetween("created_at", [startDate, endDate])
          .groupBy("created_at");
      })
      .with("response_counts", (qb) => {
        qb.select(this.knex.raw(`created_at::date as date_d`))
          .select(this.knex.raw(`count(id)as cnt`))
          .from("response")
          .whereBetween("created_at", [startDate, endDate])
          .groupBy("created_at");
      })
      .select(
        this.knex.raw(
          `date_ranges.date_d AS "Date",COALESCE(request_counts.cnt,0)as "Request Count",date_ranges.date_d AS "Date",COALESCE(response_counts.cnt,0)as "Response Count"`
        )
      )
      .from("date_ranges")
      .leftJoin("request_counts", "request_counts.date_d", "date_ranges.date_d").leftJoin("response_counts", "response_counts.date_d", "date_ranges.date_d");
  }
  getUserBlocking(reqId)
  {
    return this.knex('account').select('blacklist').where({id:reqId})
  }
  putUserBlocking(reqId,blockStatus)
  {
    return this.knex('account').update({blacklist:blockStatus}).where({id:reqId}).returning('blacklist')
  }
 
}

module.exports = AdminService;

