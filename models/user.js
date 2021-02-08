const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: String,
  email:{
      type: String,
      match: [/.+@.+\..+/, "Please enter a valid e-mail address"]

  } ,

  
});

const User = mongoose.model("User", UserSchema);

module.exports = User;