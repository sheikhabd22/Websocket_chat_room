const mongoose = require("mongoose")
const {Schema} = mongoose
UserSchema = new Schema({
    username:{  
    type: String,
    required: true,
    unique: true
},
  passwordHash: {
    type: String,
    required: true
  }
})


mongoose.model('User', UserSchema)
module.exports = user;
