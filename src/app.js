
const express=require("express")
const ConnectDb=require("./config/database")
const app=express();
const cookieParser=require("cookie-parser")










app.use(express.json());
app.use(cookieParser())


const authRouter=require("./routes/auth")
const profileRouter=require("./routes/profile") 
const requestRouter=require("./routes/request")
 
app.use("/",authRouter)
app.use("/",profileRouter)
app.use("/",requestRouter)




// app.patch("/user/:userId",async(req,res)=>{
//     const userId=req.params?.userId;
//     const data=req.body;
//     const allowedUpdates=[
//        "userId",
//        "firstName",
//        "lastName",
//        "password",
//        "userId",
//        "skills"
//     ]
//     const isupdateallowed=Object.keys(data).every(k=>allowedUpdates.includes(k));
//     console.log(isupdateallowed)
//     if(!isupdateallowed)
//     {
//         res.status(404).send("Updates are not allowed");
//     }
//     if(data?.skills.length>10)
//     {
//         // throw new Error("you can not add more than 10 skills")
//         throw new Error("you can not add more than 10 skills")
//     }
//     try{
//         const user=await User.findByIdAndUpdate(userId,data,{
//             returnDocument:"After",
//             runValidators:true
//         })
//         res.send("successfully updated   " + user)
//     }
//     catch(err){
//         res.status(404).send("error "+ err)
//     }
// })

    ConnectDb().then(()=>{
    console.log("database is connected")
    app.listen(3000,()=>{
        console.log("The port 3000 is listing")
    })
})