const jwt=  require("jsonwebtoken")

require("dotenv").config();


const authenticate = (req,res,next)=>{
    const token= req.headers.authorization?.split(" ")[1];

    if(!token){
        return res.status(401).json({msg: "Token not found- unautharized"});
    }
   // console.log(process.env.JWT_SECRET)

    try {

        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        req.user = decoded;

        console.log("Auth successs- ", decoded);
        next();
        
    } catch (err) {
        console.error("Token not valid--", err.message);

        return res.status(403).json({msg:"invalid tokenn"});

        
    }
};

module.exports= {authenticate};