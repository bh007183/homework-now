const mongoose = require("mongoose");
const { stringify } = require("querystring");
const Schema = mongoose.Schema;

const workOutSchema = new Schema({
    
       
          name: String,
          type: String,
          weight: Number,
          sets: Number,
          reps: Number,
          duration: Number,
          distance: Number,
          


  
});

const Exercise = mongoose.model("Exercise", workOutSchema);

module.exports = Exercise;