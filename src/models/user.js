const mongoose=require("mongoose")
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
          trim:true
    },
    password:{
        type:String,
        required:true,

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
    },
    skills:{
        type:[String]
    },
    winpercentage:{
        type:Number,
        validate(value){
            if(value<40)
            {
                throw new Error("not allowed to get captaincy")
            }
            
        }
    }
},{

timestamps:true

})

const User=mongoose.model("User",UserSchema);
 module.exports=User;
