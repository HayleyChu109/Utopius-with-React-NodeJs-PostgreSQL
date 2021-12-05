const { response } = require("express");

class AdminRequestService {
    constructor(knex) {
      this.knex = knex;
    }
  
   
    getReqList(){
      return this.knex('request').select('request.id',"requesterId",'title','request.detail','reward','requiredPpl','request.district','status','username','profilePath','firstName','lastName','phone','reqPhotoPath','request.created_at').select(this.knex.raw(`array_agg(tag."tagName") as "tag"`)).count({matched:"response.requestId"}).join('account','requesterId','account.id').leftJoin('tagReqJoin','request.id','requestId').leftJoin('response','response.requestId','response.id').leftJoin('tag','tag.id','tagId').orderBy('request.created_at').groupBy('request.id','account.id')
    }
    searchReqList(query)
    {
      query=query.split(" ").join('|')
      console.log(query ,"this is query")
      return this.knex('request').select('request.id',"requesterId",'title','request.detail','reward','requiredPpl','request.district','status','username','profilePath','firstName','lastName','phone','reqPhotoPath','request.created_at').select(this.knex.raw(`array_agg(tag."tagName") as "tag"`)).count({matched:"response.requestId"}).join('account','requesterId','account.id').leftJoin('tagReqJoin','request.id','requestId').leftJoin('response','response.requestId','response.id').leftJoin('tag','tag.id','tagId').orderBy('request.created_at').whereRaw(` to_tsvector(concat_ws(' ',"tagName","username","title","tag",request.status,request.district)::text) @@ to_tsquery('${query}:*')`).groupBy('request.id','account.id')
    }
    getReqStat()
    {
      return this.knex('request').select('status').count({count:'id'}).select(this.knex.raw(`count(id)*100.0 / sum(count(id)) over () as "percentage"`)).groupBy('status')
    }
   
  
  }
  
  module.exports = AdminRequestService;
  