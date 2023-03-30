import mongoose from "mongoose";

const CourSchema = mongoose.Schema({
    titre : { type : String , required : true} ,
    description : { type : String } ,
    tags : [String] ,
    theme : {type : String},
    createdAt : {type : Date , default : new Date()}   
})


export default mongoose.model('Cour',CourSchema )