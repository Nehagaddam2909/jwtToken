const mongoose=require("mongoose")
const Schema=mongoose.Schema;
const {isEmail}=require("validator")
const bcrypt=require("bcrypt")
const userShema=new Schema({
    email:{
        type:String,
        required:[true,"Email can't be null"],
        unique:[true,"Email is already taken"],
        lowercase:[true,"Enter valid email"],
        validate: [isEmail,"Please enter valid email"] 
    },
    
    password:{
        type:String,
        required:true,
        minLength:[6,"Min length of password is 6 characters"]

    }
})

//Adding the before saving function

userShema.pre('save',async function(next){
    const salt=await bcrypt.genSalt();

    this.password=await bcrypt.hash(this.password,salt);
    next();
})


//Creqating the static function in mongoose
userShema.statics.login=async function(email,password){
    const auth=await this.findOne({email})
    if(auth)
    {
        const dd=await bcrypt.compare(password,auth.password)
        
        if(dd) {
            // console.log(auth)
            return auth
        }
        throw Error("Incorrect password ");
    }
    throw Error("Incorrecet email");
}
module.exports=mongoose.model("Users",userShema);