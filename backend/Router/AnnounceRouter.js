const express = require("express");

class AnnounceRouter {
  constructor(announceService) {
    this.announceService = announceService;
  }

  router() {
    let router = express.Router();
    router.get('/',this.getAnnounceList.bind(this))
    router.get('/:id',this.getAnnouncement.bind(this))
    router.post('/',this.postAnnouncement.bind(this))
    router.put('/:id',this.putAnnouncement.bind(this))
    router.delete('/:id',this.deleteAnnouncement.bind(this))
    return router;
  }
   getAnnounceList(req,res)
  {
   return this.announceService.getAnnounceList().then((data)=>{
       console.log(data)
       res.json(data)
   })
  }
   getAnnouncement(req,res)
  {
    let requestId=req.params.id
   console.log(req.params.id)
   this.announceService.getAnnouncement(requestId).then((data)=>{
       console.log(data)
       res.json(data)
   })
  }
   postAnnouncement(req,res)
  {
   let {title,content,isPrivate,startDate,endDate}=req.body
   this.announceService.postAnnouncement(title,content,isPrivate,startDate,endDate).then(()=>{
    return this.announceService.getAnnounceList().then((data)=>{
        console.log(data)
        res.json(data)
    }) 
   })
  }
   putAnnouncement(req,res)
  {
    let requestId=req.params.id
    let {title,content,isPrivate,startDate,endDate}=req.body
    this.announceService.putAnnouncement(requestId,title,content,isPrivate,startDate,endDate).then(()=>{
     return this.announceService.getAnnounceList().then((data)=>{
         console.log(data)
         res.json(data)
     }) 
    })

   
  }
   deleteAnnouncement(req,res)
  {
    let requestId=req.params.id
    this.announceService.deleteAnnouncement(requestId).then(()=>{
     return this.announceService.getAnnounceList().then((data)=>{
         console.log(data)
         res.json(data)
     }) 
    })
  }
}

module.exports = AnnounceRouter;
