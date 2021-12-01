class TaskService {
    constructor(knex) {
      this.knex = knex;
    }
  
   
    getTaskList(){
      return this.knex.with("reporter",this.knex.raw(`select account.id,username from account join "reportMember" on "reporterId"=account.id`)).select(this.knex.raw(`task.id,task.status,coalesce("guestMsg".created_at,"reportMember".created_at) as "created_at",coalesce("guestMsg".email,"reportMember".email) as "email",coalesce("guestMsg".title,"reportMember".title) as "title",coalesce("guestMsg".message,"reportMember".message) as "message", case when "reporteeId" is null then null else "reporteeId" end as "reporteeId", case when "reporteeId" is null then null else "account".username end as "reportee",case when "reporterId" is null then "guestMsg".name else "reporter".username end as "reporter",case when "reporterId" is null then null else "reporterId" end as "reporterId"`)).from('task').leftJoin("guestMsg","guestMsg.id","guestMsgId").leftJoin("reportMember","reportMemberId","reportMember.id").leftJoin('account','account.id','reporteeId').leftJoin('reporter','reporter.id','reporterId')
    }
    putTask(id,newStatus){
        console.log('hello')
      return this.knex('task').update({status:newStatus}).where({id:id})
    }
  
   
  }
  
  module.exports = TaskService;
  