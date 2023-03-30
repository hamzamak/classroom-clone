import mongoose from "mongoose";

const ChapitreSchema = mongoose.Schema({
    titre : { type : String , required : true} ,
    contenu : { type : String , required : true} ,
    createdAt : {type : Date , default : new Date()}  
})
export default mongoose.model('Chapitre',ChapitreSchema )
