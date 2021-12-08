const express = require("express");

class TaskRouter {
  constructor(taskService) {
    this.taskService = taskService;
  }

  router() {
    let router = express.Router();
    router.get('/',this.getTaskList.bind(this))
    router.put('/:id',this.putTask.bind(this))
    return router;
  }
  async getTaskList(req,res){
    let tagCount=await this.taskService.getTaskList()

    res.json(tagCount)
  }
 
  async putTask(req,res){
      let id=req.params.id
    let tagReq=await this.taskService.putTask(id,req.body.status,req.body.solution)
    let result=await this.taskService.getTaskList()
    res.json(result)
  }
}

module.exports = TaskRouter;
