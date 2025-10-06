// 1. read the token from the req cookies
// 2. validae the token 
// 3. find the user
// const cookies =require("cookie-parser")
const jwt=require("jsonwebtoken")
const User =require("../models/user")
const userAuth=async(req,res, next)=>{
    // read the token from the req cookies
    
    try{
        const {token}=req.cookies;
    if(!token)
    {
        throw new Error("token is invalid")
    }
    const decodedobj=await jwt.verify(token,"swamy@212e3")
    const {_id}=decodedobj;
    const user=await User.findOne({_id:_id})
    if(!user)
    {
        throw new Error("user not found")
    }
        req.user=user;
        next();
    
    }catch(err){
        res.send("Error : "+ err.message)
    }
   
}
module.exports={
    
    userAuth
}