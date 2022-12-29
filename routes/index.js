const { render } = require("ejs");
const express=require("express")
const {handleSignup,handleLogin}=require("../controllers")
const routes=express.Router();

routes.get("/signup",(req,res)=>{
    res.render("signup")
})

routes.post("/signup",handleSignup)

routes.get("/login",(req,res)=>{
    res.render("login")
})

routes.post("/login",handleLogin)

module.exports=routes;