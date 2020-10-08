const time = document.getElementById("time")
function showTime() {
              let today = new Date(),
              hour = today.getHours(),
              min = today.getMinutes(),
              sec = today.getSeconds();
          
              //set AM or PM
          
              const amPm = hour >= 12 ? 'PM' : "AM";
          
              hour = hour % 12  || 12 ; 
          
                  time.innerHTML = `${hour}<span>:</span>${addZero(min)}<span>:</span>${addZero(sec)}`;
              
             
              setTimeout(showTime, 1000);    
              document.getElementById("ampm").innerHTML = amPm;
             
              
          }
          
          function addZero(n) {
              return(parseInt(n,10) < 10 ? "0" : '') + n;
              
          }
          
          showTime();