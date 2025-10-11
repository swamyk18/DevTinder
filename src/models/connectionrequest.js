const mongoose=require('mongoose')


const connectionRequestSchema=new mongoose.Schema({
    fromUserId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"User"
    },
    toUserId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"User"
    },
    status:{
        type:String,
        required:true,
        enum:["ignored","intrested","rejected","accepted"]
        
    }
},{
    timestamps:true
})
connectionRequestSchema.pre("save",function(next){
    const connectionRequest=this;

    // checks if fromUser sending request to himself
    if(connectionRequest.fromUserId.equals(connectionRequest.toUserId))
    {
         throw new Error("cannot send request to yourself")
    }
    next();
})
const ConnectionRequest= mongoose.model("Connectionrequest",connectionRequestSchema)
module.exports=ConnectionRequest
