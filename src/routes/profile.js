const express=require("express")
const profileRouter=express.Router();
const {userAuth}=require("../Middlewares/auth")
const {validateProfileData}=require("../utils/validation")



profileRouter.get("/profile/view",userAuth,async(req,res)=>{
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

profileRouter.patch("/updateProfile",userAuth,async(req,res)=>{
    try{
        if(!validateProfileData(req)){
            throw new Error("Invalid edit request")
        }
        const loggedInUser=req.user;
        console.log(loggedInUser)
        res.send(loggedInUser)

    }catch(err){
        res.status(404).send("Error "+err.message)
    }
})





module.exports=profileRouter;
