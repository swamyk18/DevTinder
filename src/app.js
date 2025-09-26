const express=require("express");
const app=express();

app.use("/admin",(req,res,next)=>{
    console.log("checking Auth")
    const Aut="xyz";
    const isadminAut=Aut==="xyz";
    if(!isadminAut)
    {
        res.status(404).send("admin is fake");
    }
    else{
        next();
    }
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
    res.send("deleted successfully");
})
    
    


app.listen(3000,()=>{
    console.log("server is successfully listening on port 3000");
});