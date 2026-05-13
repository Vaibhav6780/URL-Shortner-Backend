const jwt = require('jsonwebtoken');

const AuthMiddleware = (req,res,next)=>{

    console.log(req.cookies);

    try{

        const token = req.cookies.token;

        if(!token){

            return res.status(401).json({
                message:"Unauthorized"
            });

        }

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        req.userId = decoded.id;

        next();

    }catch(error){

        console.log(error);

        return res.status(500).json({
            message:"Middleware error"
        });

    }

}

module.exports = AuthMiddleware;