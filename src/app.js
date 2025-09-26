const express=require("express");
const app=express();
const {isadminAut,userAuth}=require("./Middlewares/adminAuth")
const {errorHandling}=require("./errorHandling")

app.use("/admin",isadminAut)

app.get("/user",userAuth,(req,res)=>{
    console.log("step-3")
    res.send("user data is fetched")
})
app.get("/admin/info",(req,res,next)=>{
    console.log("adminInfo")
    res.send("info is correct")
})
app.get("/admin/bio",(req,res)=>{
     console.log("adminbio")
    res.send("bio is correct");
})
app.get("/admin/deleteadmin",(req,res)=>{
   throw("error")
})
    
    
app.use("/",errorHandling)

app.listen(3000,()=>{
    console.log("server is successfully listening on port 3000");
});