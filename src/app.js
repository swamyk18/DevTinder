
const express=require("express")
const ConnectDb=require("./config/database")

const app=express();
const User=require("./models/user");
// const { use } = require("react");


app.use(express.json());

app.post("/signup",async(req,res)=>{
    const user=new User(req.body)
   try{
    await user.save();
    res.send("successfully added data to DB")
   }catch(err)
   {
    res.status(404).send("someThing wrong")
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

    ConnectDb().then(()=>{
    console.log("database is connected")
    app.listen(3000,()=>{
        console.log("The port 3000 is listing")
    })
})