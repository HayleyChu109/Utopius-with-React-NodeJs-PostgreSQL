class TagService {
    constructor(knex) {
      this.knex = knex;
    }
  
   
    getTagList(){
      return this.knex('tagReqJoin').select("tagName").count({count:'tagId'}).join('tag','tag.id','tagId').groupBy('tagName').orderBy('count')
    }
    getTagCount(){
        console.log('hello')
      return this.knex('tagReqJoin').select("tagName").count({count:'tagId'}).select(this.knex.raw(`count('tagId')*100.0 / sum(count('tagId')) over () as "percentage"`)).join('tag','tag.id','tagId').groupBy('tagName').orderBy('count')
    }
  
   getTagReq(tagId){
    return this.knex('tagReqJoin').select('request.id','title','detail','reward','requiredPpl','request.district','status','username','profilePath').join('request','requestId','request.id').join('account','requestId','account.id').where('tagId',tagId)
   }
  }
  
  module.exports = TagService;
  