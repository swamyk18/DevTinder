const mongoose=require("mongoose")
const ConnectDb=async ()=>{
  await  mongoose.connect("XXX")
}
module.exports=ConnectDb
