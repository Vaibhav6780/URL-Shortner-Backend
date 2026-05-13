const mongoose=require('mongoose');

const registerschema= new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    }
});

// create model
const Register=mongoose.model('register',registerschema);

module.exports=Register

