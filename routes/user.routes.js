const express = require("express");


const {authenticate} = require("../middlewares/auth.middleware")
const {authorize} = require("../middlewares/role.middleware");
const {registerUser, loginUser}= require("../controllers/user.controller");

const router= express.Router();

router.post("/register", registerUser);

router.post("/login",loginUser);


router.get("/me",authenticate,(req,res)=>{
    res.json({
        msg:" user is authentiicated",
        user: req.user

    })
})


// role based dashboard

router.get("/admin-dashboard",authenticate,authorize(["admin"]),(req,res)=>{
    res.send(" Admin dashboard")
})

router.get("/user-dashboard",authenticate,authorize(["admin","user"]),(req,res)=>{
    res.send("Userr dashboard")
})


module.exports= router;