

const isadminAut=(req,res, next)=>{
    const token="xyz";
    const isAdminAuthorized= token === "xyz";
    if(!isAdminAuthorized)
    {
        res.status(404).send("you are not a admin");
    }
    else{
        next();
    }
}
const userAuth=(req,res, next)=>{
    console.log("step-1")
    const token="xyz";
    const isAdminAuthorized= token === "xyz";
    if(!isAdminAuthorized)
    {
        res.status(404).send("you are not a admin");
    }
    else{
        console.log("step-2")
        next();
    }
}
module.exports={
    isadminAut,
    userAuth
}