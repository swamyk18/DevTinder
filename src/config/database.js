const mongoose=require("mongoose")
const ConnectDb=async ()=>{
  await  mongoose.connect("mongodb+srv://swamy18:Cmrec%401234@namastenodejs.aekyj89.mongodb.net/devTinder")
}
module.exports=ConnectDb