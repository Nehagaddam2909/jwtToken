const express= require("express")
const mongoose=require("mongoose")
const path=require("path")
const cookieparser=require("cookie-parser")
const app=express()
const route=require("./routes")
const {requireAuth}=require("./controllers/auth")
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use(cookieparser())
app.set('view engine','ejs')
app.use(express.static(path.join(__dirname,'public')))


app.use(route);




app.use("/receipe",requireAuth,(req,res)=>{
    res.send("ok");
})


app.use("/",(req,res)=>{
    res.send("<h1>Hello to the world</h1>")
})

mongoose.connect("mongodb+srv://neha:1234@cluster0.jhmqglq.mongodb.net/?retryWrites=true&w=majority").then(result=>{
    app.listen(4000,()=>{
        console.log("Listening to the port 4000")
    })
})

