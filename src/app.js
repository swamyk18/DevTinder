const express=require("express");
const app=express();

app.get("/user",(req,res)=>{
    res.send({firstname:"Swamy"});
})
app.post("/user",(req,res)=>{
    // need to connect to database
    res.send("successfully connected to databse")
})
app.delete("/user",(req,res)=>{
    res.send("deleted ")
})
app.use(("/test",(req,res)=>{
    res.send("hello");
}));
app.use("/user",(req,res)=>{
    res.send("hahaha")
})
app.listen(3000,()=>{
    console.log("server is successfully listening on port 3000");
});