
const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 8080;

const db = require("./models");

const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));


mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workoutdb", { useNewUrlParser: true });
app.post("/api/post", ({body}, res)=> {
db.Workout.create(body).then(data=>{
    res.json(data)
}).catch(err=>{
    if(err){
        throw err
    }
})
})


app.listen(PORT, () => {
    console.log(`App running on port http://localhost:${PORT}`);
  });
  