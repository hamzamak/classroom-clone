import mongoose from "mongoose";

const RoomSchema = mongoose.Schema({
    etudiants :  [{ 
        etudiant: { type:  mongoose.Schema.Types.ObjectId ,ref : 'User' },
        chapitresConsultees: { type: [ mongoose.Schema.Types.ObjectId] ,ref : 'Chapitre'  }  
    }] ,
    professeur : { type : mongoose.Schema.Types.ObjectId ,ref : 'User' , required : true} , // creator du room
    cour :  { type : mongoose.Schema.Types.ObjectId ,ref : 'Cour' , required : true} ,
    code_room :  { type : String , required : true}  ,
    chapitres : {type : [mongoose.Schema.Types.ObjectId] ,ref : 'Chapitre' } , 
    createdAt : {type : Date , default : new Date()}  ,
    comments : {type : [mongoose.Schema.Types.ObjectId] ,ref : 'Comment' }
    
})

export default mongoose.model('Room',RoomSchema )