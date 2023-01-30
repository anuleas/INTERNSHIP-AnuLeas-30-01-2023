const mongoose = require('mongoose');
var Schema=mongoose.Schema
const studentSchema =new mongoose.Schema({
  pkey: { type: String, unique: true },
    name:  
     { type: String},
    rollno:  { type:Number,required: true},
    
    mobileno: { type:Number,
      required: true},
    /*classId:
    {
        type: Schema.Types.ObjectId,
        ref: "Class"
      }*/
      classId:{ type: String,required: true},
      
      

  
})
    
module.exports= mongoose.model('Student',studentSchema);
 