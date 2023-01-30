const mongoose = require('mongoose');
const classSchema =new mongoose.Schema({
    pkey: { type: String, unique: true },
   standard: { type: String,
    required: true
},
    division: { type: String,
        required: true,
        
    }
    
   
})
    
module.exports= mongoose.model('Class',classSchema);