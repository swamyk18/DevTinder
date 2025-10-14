
const express=require('express');
const { userAuth } = require('../Middlewares/auth');
const ConnectionRequest = require('../models/connectionrequest');
const { set } = require('mongoose');
const userRequest=express.Router();
const User=require("../models/user")
const USER_SAFE_DATA="firstName lastName bio "


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

// feed Router
userRequest.get("/user/feed",userAuth,async(req,res)=>{
  try{

      const loggedInUser=req.user;
        const page=parseInt(req.query.page)
        let limit=parseInt(req.query.limit)
        limit=limit>50? 50:limit;
        const skip=(page-1)*limit;


    const connectionrequests=await ConnectionRequest.find({
        $or:[
            {
                fromUserId:loggedInUser._id
            },
            {
                toUserId:loggedInUser._id
            }
        ]
    }).select("fromUserId toUserId")

    const hideconnection=new Set()
    connectionrequests.forEach((req)=>{
        hideconnection.add(req.fromUserId.toString());
        hideconnection.add(req.toUserId.toString());
    });
   

    const Userfeed=await User.find({
        $and:[
            {_id:{$nin:Array.from(hideconnection)}},
            {_id:{$ne:loggedInUser._id}}
        ]
    }).select(USER_SAFE_DATA).skip(skip).limit(limit)



    res.send(Userfeed)

  }catch(err){
    res.status(400).send("ERROR: "+err)
  }
})

module.exports=userRequest;