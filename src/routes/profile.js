const express=require("express")
const profileRouter=express.Router();
const {userAuth}=require("../Middlewares/auth")




profileRouter.get("/profile",userAuth,async(req,res)=>{
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







module.exports=profileRouter;
