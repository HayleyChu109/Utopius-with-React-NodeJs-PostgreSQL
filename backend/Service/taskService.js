class TaskService {
    constructor(knex) {
      this.knex = knex;
    }
  
   
    getTaskList(){
      return this.knex('task').select(this.knex.raw(`task.id,task.status,coalesce("guestMsg".created_at,"reportMember".created_at) as "created_at",coalesce("guestMsg".email,"reportMember".email) as "email",coalesce("guestMsg".title,"reportMember".title) as "title",coalesce("guestMsg".message,"reportMember".message) as "message", case when "reporteeId" is null then null else "username" end as "reporteeId", case when "reporteeId" is null then null else "username" end as "reportee",case when "reporterId" is null then "guestMsg".name else "username" end as "reporter",case when "reporterId" is null then null else "reporterId" end as "reporterId"`)).leftJoin('guestMsg','guestMsgId','guestMsg.id').leftJoin('reportMember','reportMemberId','reportMember.id').leftJoin('account',function(){
          this.on('reporteeId','=','account.id').orOn('reporterId','=','account.id')
      })
    }
    putTask(id,newStatus){
        console.log('hello')
      return this.knex('task').update({status:newStatus}).where({id:id})
    }
  
   
  }
  
  module.exports = TaskService;
  