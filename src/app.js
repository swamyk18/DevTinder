const express=require("express");
const {connectDb}=require("./config/database")
const app=express();

const User=require("./models/user")

app.post("/signup",async(req,res)=>{

    // creating a new instance model
    const user=new User({
        firstName:"Akshay",
        lastName:"saini",
        email:"akshay@gmail.com",
        password:"akshay@1234"
    })
    await user.save();
    res.send("user added successfully")
})


connectDb().then(()=>{
    console.log("Database is Connected")
    app.listen(3000,()=>{
    console.log("server is successfully listening on port 3000");
});
}).catch((err)=>{
    console.log("Database Not connected")
})


