class AdminRequestService {
    constructor(knex) {
      this.knex = knex;
    }
  
   
    getReqList(){
      return this.knex('request').select('request.id','title','detail','reward','requiredPpl','request.district','status','username','profilePath','firstName','lastName','phone','reqPhotoPath','request.created_at').join('account','requesterId','account.id').orderBy('request.created_at')
    }
    getReqTag(){
      return this.knex('request').select('request.id','tagName').join('tagReqJoin','tagId','requestId').join('tag','tag.id','tagId')
    }
    getReqStat()
    {
      return this.knex('request').select('status').count({count:'id'}).select(this.knex.raw(`count(id)*100.0 / sum(count(id)) over () as "percentage"`)).groupBy('status')
    }
    getReqMatched(){
      return this.knex('response').select(this.knex.ref('requestId').as('id')).count({matched:'requestId'}).where({matched:true}).groupBy('requestId')
    }
  
  }
  
  module.exports = AdminRequestService;
  