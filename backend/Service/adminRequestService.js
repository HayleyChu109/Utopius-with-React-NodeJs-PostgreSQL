const { response } = require("express");
const moment = require("moment");
class AdminRequestService {
  constructor(knex) {
    this.knex = knex;
  }

  getReqList() {
    return this.knex("request")
      .select(
        "request.id",
        "requesterId",
        "title",
        "request.detail",
        "reward",
        "requiredPpl",
        "request.district",
        "status",
        "username",
        "profilePath",
        "firstName",
        "lastName",
        "phone",
        "reqPhotoPath",
        "request.created_at"
      )
      .select(this.knex.raw(`array_agg(distinct tag."tagName") as "tag"`))
      .select(
        this.knex.raw(
          `count("response"."requestId") filter(where "matched"='true') as "matched"`
        )
      )
      .join("account", "requesterId", "account.id")
      .leftJoin("tagReqJoin", "request.id", "requestId")
      .leftJoin("response", "response.requestId", "response.id")
      .leftJoin("tag", "tag.id", "tagReqJoin.tagId")
      .orderBy("request.created_at")
      .groupBy("request.id", "account.id");
  }
  searchReqList(query) {
    query = query.split(" ").join("|");
    console.log(query, "this is query");
    return this.knex("request")
      .select(
        "request.id",
        "requesterId",
        "title",
        "request.detail",
        "reward",
        "requiredPpl",
        "request.district",
        "status",
        "username",
        "profilePath",
        "firstName",
        "lastName",
        "phone",
        "reqPhotoPath",
        "request.created_at"
      )
      .select(this.knex.raw(`array_agg(distinct tag."tagName") as "tag"`))
      .select(
        this.knex.raw(
          `count("response"."requestId") filter(where "matched"='true') as "matched"`
        )
      )
      .join("account", "requesterId", "account.id")
      .leftJoin("tagReqJoin", "request.id", "requestId")
      .leftJoin("response", "response.requestId", "response.id")
      .leftJoin("tag", "tag.id", "tagId")
      .orderBy("request.created_at")
      .whereRaw(
        ` to_tsvector(concat_ws(' ',"tagName","username","title","tag",request.status,request.district)::text) @@ to_tsquery('${query}:*')`
      )
      .groupBy("request.id", "account.id");
  }
  getReqStat() {
    return this.knex("request")
      .select("status")
      .count({ count: "id" })
      .select(
        this.knex.raw(
          `count(id)*100.0 / sum(count(id)) over () as "percentage"`
        )
      )
      .groupBy("status");
  }
  getReqMatched() {
    return this.knex("request")
      .select(
        this.knex.raw(
          `request.id,"requiredPpl",count(response.id) filter(where matched='true') as "matched", count(response.id) filter(where matched='true')::Decimal/ "requiredPpl"* 100 as "percentage"`
        )
      )
      .leftJoin("response", "request.id", "requestId")
      .groupBy("request.id");
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
          .groupBy("date_d");
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
}

module.exports = AdminRequestService;
