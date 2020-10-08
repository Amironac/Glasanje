const form = document.getElementById("vote-form");

form.addEventListener("submit", (e) => {
    
    const choice = document.querySelector("input[name=os]:checked").value;

    const data = {
        os: choice
    };

    fetch("http://localhost:4000/add", {
            method: "POST",

            headers: new Headers({
                "Content-Type": "application/json"
            }),
            body: JSON.stringify(data)
        })
        .then(res => res.json())
        .then(data => {
            fetch("http://localhost:4000/statistika")
                 .then(() => setTimeout(() => {
                    window.location.reload()
                 }, 1000) )
            console.log(data)
        })
        .catch(err => console.log(err))

    e.preventDefault();

    
    
})
window.onload = function () {

           
 
let Lamija = 0;
let Medina = 0;
let Anel = 0;
let Mirza = 0;
let dataPoints = [
    {label: "Lamija",y: Lamija},
    {label: "Medina",y: Medina},
    {label: "Anel",y: Anel},
    {label: "Mirza",y: Mirza}
    
]

let arr = []
$.ajax({
        url: 'http://localhost:4000/files',
        dataType: 'application/json',
        complete: function (data) {
            

            let get = JSON.parse(data.responseText);

            let array = get["votes"]

            for (let i = 0; i < array.length; i++) {
                arr.push(array[i].os)
            }
            for (let i = 0; i < arr.length; i++) {
                if (arr[i] == "Lamija") {
                    Lamija += 1;
                  
                } else if (arr[i] == "Medina") {
                    Medina += 1;
                } else if (arr[i] == "Anel") {
                    Anel += 1;
                } else if (arr[i] == "Mirza") {
                    Mirza += 1;
                }

              
            }

            
            
            let points = [
                {label: "Lamija", y: Lamija},
                {label: "Medina",y: Medina},
                {label: "Anel",y: Anel},
                {label: "Mirza",y:Mirza}
                
            ]
    
            const chartContainer = document.getElementById("chartContainer");
            if (chartContainer) {
                var chart = new CanvasJS.Chart("chartContainer", {
                    theme: "light1", // "light2", "dark1", "dark2"
                    animationEnabled: true, // change to true		
                    title: {
                        text: "Glasovi kupaca"
                    },
                    data: [{
                        // Change type to "bar", "area", "spline", "pie",etc.
                        type: "pie",
                        dataPoints: points
                    }]
                });
                chart.render();
            }
        },
        success: function (data) {
            console.log("Success !");
        }
}) 


Pusher.logToConsole = true;
var pusher = new Pusher('48e85979e8fd1563cbed', {
    cluster: 'eu',
    forceTLS: true
});

var channel = pusher.subscribe('os-poll');
channel.bind('os-vote', function (data) {
    dataPoints = dataPoints.map(x => {
        if (x.label == data.os) {
            x.y += data.points;
            
            return x;
        } else {
            return x;
        }
    })
});
}