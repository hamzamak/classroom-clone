import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
    firstName : { type : String , required : true} ,
    lastName : { type : String , required : true} ,
    email :  { type : String , required : true}  ,
    password :  { type : String , required : true}  ,
    isProfesseur :  { type : Boolean , required : true}  , // role
   
})

export default mongoose.model('User',UserSchema )