
const express=require('express');
const { userAuth } = require('../Middlewares/auth');
const ConnectionRequest = require('../models/connectionrequest');
const userRequest=express.Router();

userRequest.get("/user/request/recevied",userAuth,async(req,res)=>{
    try{
        const loggedInUser=req.user

    const connectionRequests=await ConnectionRequest.find({
                toUserId:loggedInUser._id,
                status:"intrested" ,
                
    }).populate("fromUserId",["firstName","lastName"])
    // const data=connectionRequests.map(row =>{
    //     return row.fromUserId
    // })
    res.status(200).send({connectionRequests})
    }catch(err)
    {
        res.status(404).send("ERROR: "+err.message)
    }

})


userRequest.get("/user/request/connections",userAuth,async(req,res)=>{
    try{
        const loggedInUser=req.user;
    const connectionRequests=await ConnectionRequest.find({
        $or:[
            {toUserId:loggedInUser._id,
                status:"accepted"
            },{
                fromUserId:loggedInUser._id,
                status:"accepted"
            }
        ]
    }).populate("fromUserId",["firstName","lastName","emailId","bio","age"])
    .populate("toUserId",["firstName","lastName","emailId","bio","age"])
    
    const data=connectionRequests.map(row=>{
        if(row.fromUserId._id.toString() == loggedInUser._id.toString())
        {
            return  row.toUserId;
        }
        return row.fromUserId;
    })
    res.status(200).send(data)
    }catch(err){
        res.status(404).send("ERROR: "+err.message)
        console.log(err)
    }
})
module.exports=userRequest;