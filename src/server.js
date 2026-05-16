const express=require('express');
const app=express();
const db=require('./config/db.js');
const Authroutes=require('./routes/Authroutes.js')
const urlroutes=require('./routes/url.js');
const dashboardroutes=require('./routes/dashboard.js')
const cookieParser = require("cookie-parser");
require('dotenv').config();
const cors=require('cors');
app.use(cookieParser());
app.use(express.json());

app.use(cors({
    origin: process.env.CLIENT_URL,

    credentials: true
}));


app.get('/',(req,res)=>{
    res.status(200).send("this is on just slash request");
})

app.use('/auth',Authroutes);

app.use('/url',urlroutes);

app.use('/dashboard',dashboardroutes);



const PORT =process.env.PORT || 3000;

app.listen(PORT,()=>{
    console.log(`server listening on port ${PORT}`)
})

