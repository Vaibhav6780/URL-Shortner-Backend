const jwt=require('jsonwebtoken');

const AuthMiddleware=(req,res,next)=>{
    const token=req.cookies.token;
    if(!token){
        
         return res.status(400).json({message:"U are unauthorised"});
    }
    try{
        const decoded=jwt.verify(token,process.env.JWT_SECRET);
        req.userId=decoded.id;
        next();
    }catch(error){
        return res.status(401).json({message:"error occured",error:error});
    }
}

module.exports=AuthMiddleware;