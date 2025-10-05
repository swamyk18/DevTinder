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

module.exports={
    validsignup
}