const express=require("express")
const requestRouter=express.Router();
const {userAuth}=require("../Middlewares/auth")
const ConnectionRequest=require("../models/connectionrequest")



requestRouter.post("/request/send/:status/:toUserId",userAuth,async(req , res)=>{
    try{
            const fromUserId=req.user._id;
            const toUserId=req.params.toUserId;
            const status=req.params.status;
            const alloweStatus=["intrested","ignored"]
            if(!alloweStatus.includes(status))
            {

            }
            const existingConnectionRequest=await ConnectionRequest.findOne({
                $or:[
                        {fromUserId,toUserId},
                        {fromUserId:toUserId,toUserId:fromUserId}
                ]
            })
            if(existingConnectionRequest)
            {
                return res.status(400).send("Connection already Exist")
            }
            const connectionRequest = new ConnectionRequest({
                fromUserId,
                toUserId,
                status,
            });
    
            const data=await connectionRequest.save();
             res.json({
                message:"connection request sent successfully",
                data
             })


    }catch(err){
        res.status(400).send("Error : "+err.message)
        console.log(err)
    }

})

requestRouter.post("/request/receive/:status/:requestId",userAuth,async(req,res)=>{
 try{
        const loggedInUser=req.user;
    const {status,requestId}=req.params;
    const allowedStatus=["accepted","rejected"]
    if(!allowedStatus.includes(status))
    {
        return res.status(404).send("invalid status")
    }
    const connectionRequest=await ConnectionRequest.findOne({
        _id:requestId,
        toUserId:loggedInUser._id,
        status:"intrested",
    })
    if(!connectionRequest)
    {
        res.status(404).send("connection not found")
    }
    connectionRequest.status=status
    await connectionRequest.save()
    res.status(200).json({message:`${loggedInUser.firstName} is ${status} your request`})

 }catch(err)
 {
    res.status(404).send("Error : "+err)
 }
})





module.exports=requestRouter;