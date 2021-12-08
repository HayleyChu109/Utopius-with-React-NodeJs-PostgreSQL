const { request } = require("express");
const moment = require("moment");
class AdminService {
  constructor(knex) {
    this.knex = knex;
  }

  getUserGrowth(startDate, endDate) {
    startDate = moment(startDate).format("YYYY-MM-DD HH:mm");
    endDate = moment(endDate).format("YYYY-MM-DD HH:mm");
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
          .where("created_at", ">=", startDate)
          .andWhere("created_at", "<=", endDate)
          .where({ isAdmin: false })
          .groupBy("date_d");
      })
      .select(
        this.knex.raw(
          `date_ranges.date_d AS "Date",COALESCE(user_counts.cnt,0)as "Daily Users",SUM(COALESCE(user_counts.cnt,0))OVER(ORDER BY date_ranges.date_d)as "Cumulative Users"`
        )
      )
      .from("date_ranges")
      .leftJoin("user_counts", "user_counts.date_d", "date_ranges.date_d");
  }
  getUserGrowthMonthly(startDate, endDate) {
    startDate = moment(startDate).startOf('month').format("YYYY-MM-DD HH:mm");
    endDate = moment(endDate).endOf('month').format("YYYY-MM-DD HH:mm");
    return this.knex
      .with("date_ranges", (qb) => {
        qb.select(this.knex.raw(`date_trunc('month',date_d::date) as date_d`)).from(
          this.knex.raw(
            `GENERATE_SERIES(date '${startDate}'::DATE,'${endDate}'::DATE,'1 month'::INTERVAL)date_d`
          )
        );
      })
      .with("user_counts", (qb) => {
        qb.select(this.knex.raw(`date_trunc('month',created_at::date) as date_d`))
          .select(this.knex.raw(`count(id)as cnt`))
          .from("account")
          .where("created_at", ">=", startDate)
          .andWhere("created_at", "<=", endDate)
          .where({ isAdmin: false })
          .groupBy("date_d");
      })
      .select(
        this.knex.raw(
          `to_char(date_ranges.date_d,'YYYY-MM')AS "month",COALESCE(user_counts.cnt,0)as "Monthly Users",SUM(COALESCE(user_counts.cnt,0))OVER(ORDER BY date_ranges.date_d)as "Cumulative Users"`
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
      .count({
        request: "request.id",
        requestMatched: "request.matched",
        response: "response.id",
      })
      .leftJoin("request", "account.id", "request.requesterId")
      .leftJoin("response", "account.id", "response.responserId")
      .where({ "account.id": userId })
      .groupBy("account.id");
  }
  getUserReview(userId) {
    return this.knex("account")
      .select(
        this.knex.raw(
          `account.id,avg(rating) as "average_rating", count(review.id) filter (where contributed) as "contributed",count(review.id) "people_reviewed", json_agg(json_build_object('comment',review."ratingComment",'rating',review.rating,'contributed',review.contributed,'requestId',review."requestId",'reviewerId',"reviewerId",'request',request.title)) filter (where review.id is not null) as "review"`
        )
      )
      .leftJoin("review", "account.id", "revieweeId").leftJoin('request','request.id','requestId')
      .groupBy("account.id", "revieweeId")
      .where("account.id", userId);
  }
  getUserResponse(userId) {
    return this.knex("account")
      .select(
        this.knex.raw(
          `count(matched) as "matched",count(response.id) as "total_response",json_agg(json_build_object ('detail',response."detail",'request',request.title,'requestId',"requestId")) filter (where response.id is not null) as "response"`
        )
      )
      .leftJoin("response", "account.id", "responserId")
      .leftJoin("request", "requestId",'request.id')
      .where({ responserId: userId })
      .groupBy("account.id");
  }

  getUserComment(userId) {
    return this.knex("account")
      .select(
        this.knex.raw( 
          `json_agg(json_build_object ( 'detail',comment."detail",'request',request.title,'requestId',"requestId")) filter (where comment.id is not null) as "response"`
        )
      )
      .leftJoin("comment", "commenterId", "account.id")
      .leftJoin("request", "requestId", "request.id").where({ "account.id": userId })
      .groupBy("account.id");
  }
  getUserList(col, order) {
    return this.knex("account")
      .select(
        "account.id",
        "username",
        "profilePath",
        "token",
        "blacklist",
        "grade",
        "account.district",
        "token",
        "account.created_at"
      )
      .count({ requestCount: "request.id", responseCount: "response.id" })
      .avg("rating as rating")
      .leftJoin("request", "account.id", "requesterId")
      .leftJoin("response", "account.id", "responserId")
      .leftJoin("review", "revieweeId", "account.id")
      .where({ isAdmin: false })
      .groupBy("account.id")
      .orderBy(col, order);
  }
  getReqResGrowth(startDate, endDate) {
    startDate = moment(startDate).format("YYYY-MM-DD HH:mm");
    endDate = moment(endDate).format("YYYY-MM-DD HH:mm");
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
      .leftJoin("request_counts", "request_counts.date_d", "date_ranges.date_d")
      .leftJoin(
        "response_counts",
        "response_counts.date_d",
        "date_ranges.date_d"
      );
  }
  getUserBlocking(reqId) {
    return this.knex("account").select("blacklist").where({ id: reqId });
  }
  putUserBlocking(reqId, blockStatus) {
    return this.knex("account")
      .update({ blacklist: blockStatus })
      .where({ id: reqId })
      .returning("blacklist");
  }
  putUserGroupBlocking(reqId) {
    return this.knex("account")
      .update({ blacklist:  this.knex.raw('NOT ??',  ['blacklist'] )})
      .whereIn( 'id', reqId )
      
  }
}

module.exports = AdminService;
