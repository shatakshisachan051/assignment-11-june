const express = require("express");


const {authenticate} = require("../middlewares/auth.middleware")
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


module.exports= router;