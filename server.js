
const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const mongojs = require('mongojs')

const PORT = process.env.PORT || 8080;

const db = require("./models");
const Workout = require("./models/workout");

const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));


mongoose.connect(
    process.env.MONGODB_URI || "mongodb://localhost/workoutdb", 
    {    
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
    });

app.post("/api/exercise", (req, res)=> {
    db.Exercise.create(req.body)
    .then(({_id}) => db.Workout.findOneAndUpdate({workoutName: req.body.workoutid}, {$push: {exercises: _id}},{new: true}))
    .then(data => {
        res.json(data)
    }).catch(err=>{
        res.json(err)
    })
})
app.put("/api/exercise", (req, res)=> {
    db.Workout.updateOne({workoutName: req.body.workoutName},
    {$push: {exercises:req.body._id}} )
    .then(data => {
        res.json(data)
    }).catch(err=>{
        res.json(err)
    })
})
app.post("/api/workout", (req, res)=> {
    db.Workout.create(req.body).then(data=>{
        res.json(data)
    }).catch(err=>{
        if(err){
            throw err
        }
    })
})
app.get("/api/workout", (req, res)=> {
    db.Workout.find({}).populate("exercises").then(data=>{
        res.json(data)
    }).catch(err=>{
        if(err){
            throw err
        }
    })
})
app.get("/api/get", (req, res)=> {
    db.Exercise.find({}).then(data=>{
        res.json(data)
    }).catch(err=>{
        if(err){
            throw err
        }
    })
})

app.delete("/api/exercise/:id", (req,res)=>{
    db.Exercise.remove({_id: mongojs.ObjectId(req.params.id)}).then(data=>{
        res.json(data)
    }).catch(err=>{
        if(err){
            throw err
        }
    })

})
app.delete("/workout/:id", (req,res)=>{
    db.Workout.remove({_id: mongojs.ObjectId(req.params.id)}).then(data=>{
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
  