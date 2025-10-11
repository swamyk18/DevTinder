const validator=require("validator");
const { validate } = require("../models/user");
const validsignup=(req)=>{
    const {firstName,lastName,emailID,password}=req.body;
    if(!firstName||!lastName)
    {
        throw new Error("invalid firstName");
    }
    else if(!validator.isEmail(emailID)){
        throw new Error("invalid email");
    }
    else if(!validator.isStrongPassword(password)){
        throw new Error("password is to weak");
    }
    
}
const validateProfileData=async (req,res)=>{
    const allowedEditFields=[
        "firstName",
        "lastName",
        "emailID",
        "password"
    ]
    const isEditallowed=await Object.keys(req.body).every(field=>allowedEditFields.includes(field))
    return isEditallowed;
}           
module.exports={
    validsignup,validateProfileData
}