class AdminRequestService {
    constructor(knex) {
      this.knex = knex;
    }
  
   
    getReqList(){
      return this.knex('request').select().orderBy('created_at')
    }
    getReqTag(){
      return this.knex('request').select('request.id','tagName').join('tagReqJoin','tagId','requestId').join('tag','tag.id','tagId')
    }
    getReqStat()
    {
      return this.knex('request').select('status').count({count:'id'}).select(this.knex.raw(`count(id)*100.0 / sum(count(id)) over () as "percentage"`)).groupBy('status')
    }
  
  
  }
  
  module.exports = AdminRequestService;
  