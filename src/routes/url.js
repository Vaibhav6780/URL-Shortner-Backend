const Url = require("../models/Url");
const express = require("express");
const router = express.Router();
require('dotenv').config()

const AuthMiddleware = require("../middlewares/AuthMiddleware");

router.post("/", AuthMiddleware, async (req, res) => {
   try {
      const { url } = req.body;

      let shortCode = Math.random().toString(36).substring(2, 8);

      let existedflag = await Url.findOne({ shortCode });

      while (existedflag) {

         shortCode = Math.random().toString(36).substring(2, 8);

         existedflag = await Url.findOne({ shortCode });

      }

      const newUrl = await Url.create({

         originalUrl: url,

         shortCode,

         createdBy: req.userId

      });

      return res.status(200).json({

         shortUrl: `${process.env.BASE_URL}/url/${shortCode}`

      });

   } catch (error) {

      console.log(error);

      return res.status(500).json({
         message: "Server error"
      });

   }

});

router.get("/:shortCode", async (req, res) => {

   try {

      const url = await Url.findOne({
         shortCode: req.params.shortCode
      });

      if (!url) {
         return res.status(404).json({
            message: "URL not found"
         });

      }
      url.clicks += 1;

      await url.save();

       res.redirect(url.originalUrl);

   } catch(error){

      return res.status(500).json({
         message: "Server error"
      });

   }

});


router.delete("/:shortCode", AuthMiddleware, async(req,res)=>{

   try{

      const url = await Url.findById(req.params.shortCode);

      if(!url){

         return res.status(404).json({
            message:"URL not found"
         });

      }

      // SECURITY CHECK
      if(url.createdBy.toString() !== req.userId){

         return res.status(401).json({
            message:"Unauthorized"
         });

      }  
      await Url.findByIdAndDelete(req.params.shortCode);

      return res.status(200).json({
         message:"URL deleted successfully"
      });

   }catch(error){

      return res.status(500).json({
         message:"Server error"
      });

   }

});

module.exports = router;