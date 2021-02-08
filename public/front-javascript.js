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
       console.log(res)
    })
})