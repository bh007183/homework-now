let elems = document.querySelectorAll('.modal');
let instances = M.Modal.init(elems);
let valArray = []

$.ajax({
    url: "/api/workout",
    method: "get"

}).then(res=>{
    console.log(res)
 for(let i = 0; i < res.length; i++){

     $('#added').append($("<div>").addClass(`card ex row ${res[i]._id}`).append(
      `            <div class="row">
                   <div class="col m12"  style="display: flex; justify-content: center;">
                   <h5><h5>
                   <button  class="deleteworkout"  data-id="${res[i]._id}">Delete ${res[i].workoutName}</button>
                   </div>
                   </div>
     
      
   `
     ))
     
        res[i].exercises.forEach(element => {
            
            $(`.${res[i]._id}`).prepend(`<div class="card col m2"  >
                             <div>${element.name}</div>
                             <div>${element.reps} reps</div>
                             <div>${element.sets} sets</div>
                             <div>${element.type}</div>
                             <div>${element.weight} weight</div>
                             <div>${element.distance} miles</div>
                             <div>${element.duration} minutes</div>
                             </div>`
     
         )
         })

     
 }
 $(".deleteworkout").on("click", function(event){
     console.log($(event.target).data("id"))

 console.log("blam")
        $.ajax({
            url: "/workout/" + $(event.target).data("id"),
            method: "DELETE"
    
    }).then(res=>{
        location.reload()
    })
    
    })

     

})

$.ajax({
    url: "/api/get",
    method: "get"
}).then(res =>{
    for(let i = 0; i < res.length; i++){
        $(".all_exer").append(

        `            
                    <div class="one col s6 m2 card">
                    ${res[i].name} <br>
                    ${res[i].type} <br>
                    ${res[i].weight} lbs<br>
                    ${res[i].reps} reps<br>
                    ${res[i].sets} sets<br>
                    ${res[i].distance} miles<br>
                    ${res[i].duration} minutes<br>
                    <button class="delete" data-id="${res[i]._id}">Delete</button>
                    <button data-target="modal1" class="edit modal-trigger" href="#modal1" data-id="${res[i]._id}">Add To Workout</button>
                    </div>
                    
                    
                   
                 `
        )
        
       

    }
    $(".edit").on("click", function(e){
        console.log($(e.target).data("id"))
        valArray.unshift($(e.target).data("id"))
        if(valArray.length > 1){
            valArray.pop()
        }
       console.log(valArray)
    })
 
    $(".delete").on("click", function(event){
        console.log("blam")
        $.ajax({
            url: "/api/exercise/" + $(event.target).data("id"),
            method: "DELETE"
    
    }).then(res=>{
        location.reload()
    })
    
    })

  
        
})
$(".subad").on('click', function(event){
    event.preventDefault()
    const addedExercise = {
        workoutName: $(".added").val(),
        _id: valArray[0]
        
    }
    $.ajax({
        url: "/api/exercise",
        method: "put",
        data: addedExercise
    }).then(res=>{
        location.reload()
    })

    


})

$(".workoutcreate").on("click", function(event){
    console.log("click")
    event.preventDefault()
    const workouts = {
        workoutName: $("#workout").val(),

    }
    $.ajax({
        url: "/api/workout",
        method: "POST",
        data: workouts,
    }).then(res=>{
       
      location.reload()
       
    })
})

$(".button").on("click", function(event){
    event.preventDefault()
   
    console.log("click")
    
    const stats = {
        name: $("#name").val(),
        type:$("#type").val(),
        weight: $("#weight").val(),
        sets: $("#sets").val(),
        reps:$("#reps").val(),
        duration: $("#duration").val(),
        distance: $("#Distance").val(),
        workoutid: $("#workoutas").val()
       
    }
    $.ajax({
        url: "/api/exercise",
        method: "POST",
        data: stats
    }).then(res=>{
    location.reload()
        
       
    })
})
