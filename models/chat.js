const mongoose = require("mongoose")
const {Schema} = mongoose
ChatSchema = new Schema({
    username:{  
    type: String,
    required: true,
    unique: true
},
  message: {
    type: String,
    required: true
  },
  timestamp:{
    type: Date,
    default: Date.now
  }
})


mongoose.model('Chat', ChatSchema)
module.exports = chat;
