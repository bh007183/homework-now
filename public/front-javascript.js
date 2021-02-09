

$.ajax({
    url: "/api/workout",
    method: "get"

}).then(res=>{
    console.log(res)
 for(let i = 0; i < res.length; i++){

     $('#added').append($("<div>").addClass(`card ex row ${res[i]._id}`).append(
      `            <div class="row">
                   <h6>${res[i].workoutName}<h6>
                   </div>
     
      <button class="delete" data-id="${res[i]._id}">Add</button>
      <button data-target="modal1" class="edit modal-trigger" href="#modal1" data-id="${res[i].id}">Edit</button>
   `
     ))
     
        res[i].exercises.forEach(element => {
            
            $(`.${res[i]._id}`).append(`<div class="card col m2"  >
                             <div>${element.name}</div>
                             <div>${element.reps}</div>
                             <div>${element.sets}</div>
                             <div>${element.type}</div>
                             <div>${element.weight}</div>
                             <div>${element.distance}</div>
                             <div>${element.duration}</div>
                             </div>`
     
         )
         })

     
 }
     

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
                    ${res[i].weight} <br>
                    ${res[i].reps} <br>
                    ${res[i].sets} <br>
                    ${res[i].distance} <br>
                    ${res[i].duration} <br>
                    <button class="delete" data-id="${res[i]._id}">Delete</button>
                    <button data-target="modal1" class="edit modal-trigger" href="#modal1" data-id="${res[i]._id}">Edit</button>
                    </div>
                    
                    
                   
                 `
        )

    }
        
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
