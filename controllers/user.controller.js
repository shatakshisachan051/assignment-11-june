const User= require("../models/user.model")

const bcrypt= require("bcrypt");

const jwt= require("jsonwebtoken")

require("dotenv").config();

const registerUser= async(req,res)=>{
     const {name, email, password,role}= req.body;

     console.log("getting register", req.body);

     try {
        const existingUser= await User.findOne({email});
   
        if(existingUser){
           return res.status(409).json({msg:" User exist already"});
           
        }

        const hashedPassword = await bcrypt.hash(password,10);

        const newUser = await User.create({
            name,
            email,
            password: hashedPassword,
            role:role|| "user"
        });

        console.log(" new User regiistered", newUser.email);

        res.status(201).json({msg: "User registered successfully"});
     } catch (err) {

        console.log("failed registration- ", err.message);
        res.status(500).json({msg:" Serverr error"});
        
     }


}

module.exports= {registerUser};