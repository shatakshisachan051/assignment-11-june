const User= require("../models/user.model")

const bcrypt= require("bcrypt");

const jwt= require("jsonwebtoken")

require("dotenv").config();


// registering users
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


// login users

const loginUser= async (req,res)=>{

    const {email, password}= req.body;
    console.log(" attempted login", email);

   try {
     const user = await User.findOne({email});
 
 
     if(!user){
         console.log(" user not found ");
         return res.status(404).json({msg: "Invalid credentiial- user not found"})
     }
 
     const match = await bcrypt.compare(password,user.password);
 
     // checking password
     if(!match){
         console.log(" password not correct");
 
         return res.status(401).json({msg:"Invaild credentials"});
     }
 
     const token = jwt.sign(
         { userId: user._id,role: user.role },process.env.JWT_SECRET,{expiresIn: "1h"}
     );
 
 
     console.log("login success- ",user.email);
 
     res.status(200).json({msg:"Login successfull", token});
 
   } catch (error) {
        console.log("login failed- ",err.message)

        res.status(500).json({msg: "Server error"});
   }


}

module.exports= {registerUser, loginUser};