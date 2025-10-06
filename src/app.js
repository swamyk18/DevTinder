
const express=require("express")
const ConnectDb=require("./config/database")
const cookieParser=require("cookie-parser")
const jwt=require("jsonwebtoken")
const app=express();
const User=require("./models/user");
const {validsignup}=require("./utils/validation")
const bcrypt=require("bcrypt");
const { Error } = require("mongoose");
const {userAuth}=require("./Middlewares/auth")


app.use(express.json());
app.use(cookieParser())

app.post("/signup",async(req,res)=>{
    const {firstName,lastName,emailID,password}=req.body;
   try{
    // validating the data
      validsignup(req)

    //  encrypting the password into hash
        
        const hasedpassword=await bcrypt.hash(password,10);
        console.log(hasedpassword)
    // saving it into db 
    const user=new User({
        firstName,
        lastName,
        emailID,
        password:hasedpassword
    });
    await user.save();
    res.send("successfully added data to DB")
   }catch(err)
   {
    res.status(404).send("Error : "+err.message)
   }
})

// login user with email and password
app.post("/login",async (req,res)=>{
 
    try{
        const {emailID,password}=req.body;
        const user=await User.findOne({emailID: emailID})
        // console.log(user)
        if(!user)
        {
            throw new Error("invalid email")
        }
        const isvalidpassword=await user.validatepassword(password);
        if(isvalidpassword)
        {

            // create a jwt Token
             const token=await user.getJWT();

           
            // Add the Token to the cookie and send back to the user  
            res.cookie("token",token);
            res.send("login success")
        }else{
            throw new Error("password is invalid ")
        }
    }catch(err){
          res.status(404).send("ERROR : "+err.message)
    }
    
})
    // get profile info

    app.get("/profile",userAuth,async(req,res)=>{
        try{
        const user=req.user
        if(!user){
          throw new Error("User does not exist")
        }
        else{
            console.log("success")
            res.send(user)
        }
        
        }catch(err){
            res.status(404).send("Error :"+err)
        }
    })




// retreives the one the data from document
app.get("/info",async(req,res)=>{
    const userpassword=req.body.password;
   try{
       const value=await  User.findOne({password:userpassword})
        console.log(value)
       if(value!=null)
       {
        res.send(value)
       }
       else{
        res.send("information not found")
       }
   }
   catch(err)
   {
    res.send("error")
   }
})


// retreives the all the data from document
app.get("/feed",async(req,res)=>{
    // const userdata=req.body;
    try{
        const value= await User.find({})
        res.send(value)
    }
    catch(err)
    {
        res.status(400).send("error");
    }

})


app.delete("/user",async(req,res)=>{
    const userName=req.body.firstName;
    try{
      const user=await User.deleteOne({firstName:userName})
       res.send(user);
        
    }catch(err){
        res.status(404).send("error")
    }
})


app.patch("/user/:userId",async(req,res)=>{
    const userId=req.params?.userId;
    const data=req.body;
    const allowedUpdates=[
       "userId",
       "firstName",
       "lastName",
       "password",
       "userId",
       "skills"
    ]
    const isupdateallowed=Object.keys(data).every(k=>allowedUpdates.includes(k));
    console.log(isupdateallowed)
    if(!isupdateallowed)
    {
        res.status(404).send("Updates are not allowed");
    }
    if(data?.skills.length>10)
    {
        // throw new Error("you can not add more than 10 skills")
        throw new Error("you can not add more than 10 skills")
    }
    try{
        const user=await User.findByIdAndUpdate(userId,data,{
            returnDocument:"After",
            runValidators:true
        })
        res.send("successfully updated   " + user)
    }
    catch(err){
        res.status(404).send("error "+ err)
    }
})

    ConnectDb().then(()=>{
    console.log("database is connected")
    app.listen(3000,()=>{
        console.log("The port 3000 is listing")
    })
})