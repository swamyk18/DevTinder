const mongoose=require("mongoose")
const validator=require("validator")
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")
const UserSchema=new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        minlength:4

    },
    lastName:{
        type:String
    },
    emailID:{
        type:String,
          required:true,
          unique:true,
          lowercase:true,
          trim:true,
        //  validate(value){
        //     if(!validator.isEmail(value)){
        //         throw new Error("enter correct Email ")
        //     }
        //  }
    },
    password:{
        type:String,
        required:true,
        validate(value){
            if(!validator.isStrongPassword(value)){
                throw new Error("set new strong password")
            }
        }

    },
    gender:{
        type:String,
        enum:["male","female","other"]

    },
    age:{
        type:Number,
        min:18
    },
    bio:{
        type:String,
        default:"welcome to devTinder"
    }
},{

timestamps:true

})

UserSchema.methods.getJWT= async function(){
    const user=this;
    const token=await jwt.sign({_id:user._id},"swamy@212e3",{expiresIn:"7d"})
    return token;
}
UserSchema.methods.validatepassword=async function(passwordbyUserinput){
    const user=this;
    const passwordHash=user.password
    const isvalidpassword=await bcrypt.compare(passwordbyUserinput,passwordHash)
    return isvalidpassword
}
const User=mongoose.model("User",UserSchema);
 module.exports=User;
