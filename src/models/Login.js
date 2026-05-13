const mongoose=require('mongoose');

const loginschema=mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
});

// create model
const Login=mongoose.model('Login',loginschema);

module.exports={
    Login
};