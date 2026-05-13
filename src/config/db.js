require('dotenv').config();
const mongoose=require('mongoose');
const mongoose_URL=process.env.mongoose_URl;

mongoose.connect(mongoose_URL)
const db=mongoose.connection;

db.on('connected',()=>{
    console.log("DB connected");
})

db.on('disconnected',()=>{
    console.log("DB disconnected");
})
db.on('error',(error)=>{
    console.log("DB error",error);
})

module.exports=db;