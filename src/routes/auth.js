const express=require("express");
const authRouter=express.Router();
const User=require("../models/user");
const {validsignup}=require("../utils/validation")
const bcrypt=require("bcrypt");


authRouter.post("/signup",async(req,res)=>{
    const {firstName,lastName,emailID,password}=req.body;
   try{
        validsignup(req)
        const hasedpassword=await bcrypt.hash(password,10);
        // console.log(hasedpassword)
        const user=new User({
        firstName,
        lastName,
        emailID,
        password:hasedpassword
    });
        await user.save();
        res.send("successfully added data to DB")
   }catch(err){
        res.status(404).send("Error : "+err.message)
   }
})

authRouter.post("/login",async (req,res)=>{
 
    try{
            const {emailID,password}=req.body;
            const user=await User.findOne({emailID: emailID})
            if(!user)
            {
                throw new Error("invalid email")
            }
            const isvalidpassword=await user.validatepassword(password);
        if(isvalidpassword)
        {
             const token=await user.getJWT();  
             res.cookie("token",token);
             res.send("login success")
        }else{
             throw new Error("password is invalid ")
        }
    }catch(err){
             res.status(404).send("ERROR : "+err.message)
    }
    
})

authRouter.post("/Logout",async(req,res)=>{
    res.cookie("token",null,{exipres: new Date(Date.now)})
    res.send("Logout successfull")
})
module.exports=authRouter;