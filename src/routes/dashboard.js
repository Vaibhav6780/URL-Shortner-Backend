const express=require('express');
const router=express.Router();
const AuthMiddleware=require('../middlewares/AuthMiddleware')
const Url=require('../models/Url');


router.get("/",AuthMiddleware, async(req,res)=>{

   try{

      const urls = await Url.find({
         createdBy:req.userId
      });

      return res.status(200).json(urls);

   }catch(error){

      return res.status(500).json({
         message:"Server error"
      });

   }

});

module.exports=router;