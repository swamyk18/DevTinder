const express=require("express");
const app=express();


app.use(("/hello",(req,res)=>{
    res.send("Namaste Swamy");
}));
app.use(("/test",(req,res)=>{
    res.send("hello");
}));

app.listen(3000,()=>{
    console.log("server is successfully listening on port 3000");
});