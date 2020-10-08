



window.onload = async function chartIt () {

    let datum= [];
    let dnevni = [];
    let brojac = 0;
    await getData();
            
    document.getElementById("addPost")
    .addEventListener("submit", addPost);
            
    async function getData() {
        await fetch("http://localhost:3000/chart")
                    .then(res => res.json())
                    .then(data => {
    
                        data.forEach(item => {
                            datum.push(item.datum)
                            dnevni.push(item.zarada)

                        })
                    })
                    .catch(err => console.log(err))
        
        fetch("http://localhost:3000/chart")
            .then(res => res.json())
            .then(data => {

                data.forEach(item => {
                    var tabela = document.getElementById("tbody");
   
                    var id = brojac;
                    var dan = item.datum;
                    var hrs = item.sati;
                    var god = item.godina;
                    var izvjestaj = item.zarada;
                    setTimeout(addZero,1000)

                    var tr = document.createElement("tr");
                    var tr_id = document.createElement("th");
                    var tr_dan = document.createElement("th");
                    var tr_sati = document.createElement("th");
                    var tr_godina = document.createElement("th");
                    var tr_izvjestaj = document.createElement("th");


                    var text_id = document.createTextNode(id)
                    var text_dan = document.createTextNode(dan)
                    var text_hrs = document.createTextNode(hrs)
                    var text_god = document.createTextNode(god)
                    var text_izvj = document.createTextNode(izvjestaj)

                    tr_id.appendChild(text_id);
                    tr_dan.appendChild(text_dan);
                    tr_sati.appendChild(text_hrs);
                    tr_godina.appendChild(text_god);
                    tr_izvjestaj.appendChild(text_izvj);
                    
                    tr.appendChild(tr_id)
                    tr.appendChild(tr_dan)
                    tr.appendChild(tr_sati)
                    tr.appendChild(tr_godina)
                    tr.appendChild(tr_izvjestaj)

                    tabela.appendChild(tr);
                    brojac+= 1;
                })
            })
        }
        
        function addPost(e) {
            
            var datum  = new Date();

            hour = datum.getHours(),
            min = datum.getMinutes(),
            sec = datum.getSeconds(),
            year = datum.getFullYear();

            var month = datum.getMonth();
             
            var danas = datum.getDate();
            
            if(month === 0){
                month = "Januar"
            }
            
            if(month === 1){
                month = "Februar"
            }
            
            if(month === 2){
                month = "Mart"
            }
            
            if(month === 3){
                month = "April"
            }
            
            if(month === 4){
                month = "Maj"
            }
            
            if(month === 5){
                month = "Juni"
            }
            
            if(month === 6){
                month = "Juli"
            }
            
            if(month === 7){
                month = "August"
            }
            
            if(month === 8){
                month = "Septembar"
            }
            
            if(month === 9){
                month = "Oktobar"
            }
            
            if(month === 10){
                month = "Novembar"
            }
            
            if(month === 11){
                month = "Decembar"
            }
            var zarada = document.getElementById("input").value;
            
            fetch("http://localhost:3000/chart",{
                method:"POST",
                headers:{
                    "Accept": "application/json, text/plain, */*",
                    "Content-type": "application/json"
                },
                body: JSON.stringify({
                    datum:month +" "+ danas,
                    sati: hour +" : "+addZero(min),
                    godina:year,
                    zarada:zarada
                })
            })
            .then(res => res.json())
            .then(data => console.log(data))
            .then( () => window.location.reload());
            e.preventDefault();
            
        }
        
        var ctx = document.getElementById('myChart').getContext('2d');
        Chart.defaults.global.defaultFontFamily =" Arial";
        var myChart = new Chart(ctx, {

            backgroundColor: "white",
                type: 'bar',
                data: {
                    labels: datum,
                    datasets: [{
                        label: 'dnevni izvještaj',
                        data: dnevni,
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(255, 206, 86, 0.2)',
                            'rgba(75, 192, 192, 0.2)',
                            'rgba(153, 102, 255, 0.2)',
                            'rgba(255, 159, 64, 0.2)'
                                ],
                        borderColor: [
                            'rgba(255, 99, 132, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(75, 192, 192, 1)',
                            'rgba(153, 102, 255, 1)',
                            'rgba(255, 159, 64, 1)'
                            ],
                        borderWidth: 1
                        
                        }]
                    },
                    options: {
                        title:{
                            display:true,
                            fontSize:25
                        },
                        scales: {
                            yAxes: [{
                                backgroundColor:"white",
                                ticks: {
                                    beginAtZero: true
                                }
                            }]
                        },                           
                    }
                    }); 
                
                    
                    function addZero(n) {
                        return(parseInt(n,10) < 10 ? "0" : '') + n;
                        
                    }
                    
  

}

