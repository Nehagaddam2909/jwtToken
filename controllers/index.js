const Users=require("../models/user")
const jwt=require("jsonwebtoken")
const cookieParser=require("cookie-parser")

const age=24*60*60*3;
const createToken=(id)=>{
    return jwt.sign({id},'scret key',{
        expiresIn:age,

    });
}
const handleSignup=async (req,res)=>{
    const email=req.body.email
    const password=req.body.password

    let errors={email:"",password:""};
    try{
        const user=await Users.create({email,password});
        
        const token=createToken(user._id)
        res.cookie("jwt",token,{httpOnly:true,maxAge:age*1000})
        res.json({"successs":user._id});

    }
    catch(err)
    {
        if(err.errors)
       {
        Object.values(err.errors).forEach(element => {
        errors[element.path]=element.properties.message
       });}

       res.json({"errors":errors})
    }
    
    // console.log(req.body)
    //  res.send("jnj")  
}




const handleLogin=async (req,res)=>{
    const {email,password}=req.body
    try{
        const user=await Users.login(email,password);
        const token=createToken(user._id)
        res.cookie("jwt",token,{httpOnly:true,maxAge:age*1000})
        res.json({"successs":user._id});
    }
    catch(err)
    {
        res.json({"errors":err})
    }
}

module.exports={handleLogin,handleSignup}