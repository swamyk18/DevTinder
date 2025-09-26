
const errorHandling=(err,req,res,next)=>{
    if(err)
    {
        res.status(500).send("something went wrong")
    }
}
module.exports={
    errorHandling
}