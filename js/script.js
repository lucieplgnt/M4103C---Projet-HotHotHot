//Bouton notification - début
let notification = document.querySelector(".notification");

notification.onclick = function(){
  notification.classList.toggle("open");
}
//Bouton notification - fin

// activation du menu - début
let btn = document.querySelector(".bx-menu");
let menu = document.querySelector(".menu");
let test = document.querySelector(".open-menu");

btn.onclick = function() {
    menu.classList.toggle("large");
}

btn.addEventListener("click" , () =>{
    if(menu.classList.contains('large')){
        btn.classList.remove("bx-menu");
        btn.classList.add("bx-x");
        test.classList.remove("open-menu");
        test.classList.add("open-menu-large");
    } else{
        btn.classList.add("bx-menu");
        btn.classList.remove("bx-x");
        test.classList.add("open-menu");
        test.classList.remove("open-menu-large");
    }
});
// activation du menu - fin

// changement de thème - début
let section = document.querySelector("body");
let sun = document.querySelector(".bx-sun");

sun.addEventListener("click" , () =>{
  if(section.classList.contains('dark')){
    section.classList.add("light");
    section.classList.remove("dark");
    sun.classList.remove("bx-sun");
    sun.classList.add("bx-moon");
  } else if(section.classList.contains('light')){
    section.classList.add("dark");
    section.classList.remove("light");
    sun.classList.add("bx-sun");
    sun.classList.remove("bx-moon");
  }
});
// thème - fin

// systhème d'anglets - début
const onglets = Array.from(document.querySelectorAll(".onglets"));
const contenu = Array.from(document.querySelectorAll(".contenu"));

let index = 0;

onglets.forEach(onglet => {
  onglet.addEventListener('click', () => {

    if (onglet.classList.contains('active')){
      return;
    } else {
      onglet.classList.add('active');
    }

    index = onglet.getAttribute('data-block');
    for (i = 0; i < onglets.length; i++) {

      if (onglets[i].getAttribute('data-block') != index) {
        onglets[i].classList.remove('active');
      }
    }

    for (j = 0; j < contenu.length; j++){
      if (contenu[j].getAttribute('data-block') == index) {
        contenu[j].classList.add('activeContenu');
      } else {
        contenu[j].classList.remove('activeContenu');
      }

    }
  })
})

let element = Array.from(document.querySelectorAll(".element-liste"));

element.forEach(elements => {
  elements.addEventListener("click" , () =>{
    if (onglet.classList.contains('active')){
      return;
    } else {
      onglet.classList.add('active');
    }
    index = 2;
    for (i = 0; i < onglets.length; i++) {
  
      if (onglets[i].getAttribute('data-block') != index) {
        onglets[i].classList.remove('active');
      }
    }
  
    for (j = 0; j < contenu.length; j++){
      if (contenu[j].getAttribute('data-block') == index) {
        contenu[j].classList.add('activeContenu');
      } else {
        contenu[j].classList.remove('activeContenu');
      }
    }
  });
})
// anglets - fin

if ('serviceWorker' in navigator) {

  navigator.serviceWorker.register('/M4103C---Projet-HotHotHot/service-worker.js') // à adapter à l'URL du projet

  .then(() => { console.log('Service Worker Registered'); });

}

//capteurs

// Create WebSocket connection.
var socket = new WebSocket('wss://ws.hothothot.dog:9502'); 
/* var socket = new WebSocket('ws://localhost:8100'); */

IndiceTemp = 0;
socket.onopen = () => {
  socket.send("Connexion open");
};

//Creéation d'un graphique vide qui sera mis à jour avec les données reçus
google.load("visualization", "1", {packages:["corechart"]});
google.setOnLoadCallback(drawChart);
function drawChart() {
  var options = {
    title: 'Evolution température dans le temps'
  };
  var data = new google.visualization.DataTable();

  data.addColumn('string', 'Temps');
  data.addColumn('number', 'Température ext');
  data.addColumn('number', 'Température int')

  var chart = new google.visualization.LineChart(document.querySelector('.curve_chart'));
  chart.draw(data, options);

  numberOfData = 0;
  socket.onmessage = (msg) => {
    console.log("Received: "+msg.data.length);
    /* ajouter recup temp */
    if(msg.data.length > 0)
    { 
      let capteurs = JSON.parse(msg.data);

      let ext = capteurs['capteurs'][1];
      let interieur = capteurs['capteurs'][0];
      var tempext = ext['Valeur'];
      var tempint = interieur['Valeur'];
      let latempExt = "Température extérieure : ";
      let valTemp = tempext;
      let latempInt = "Température intérieure : ";
      let valTemp2 = interieur['Valeur'];

      console.log(latempExt + valTemp);
      console.log(latempInt + valTemp2);
      if (valTemp > 17) {
        console.log("c'est l'été ou quoi ?");
      }
      if (valTemp2 < 5) {
        console.log("wesh le glaçon !");
      }

      let tmp = document.querySelector(".temperature");
      tmp.textContent = latempExt;
      let valeurTemperature = document.querySelector(".la-temp");
      valeurTemperature.textContent = valTemp;

      let tmp2 = document.querySelector(".temperature2");
      tmp2.textContent= latempInt;
      let valeurTemperature2 = document.querySelector(".la-temp2");
      valeurTemperature2.textContent = valTemp2;

      var tabTemp = [];
      var tmpsAct = new Date();
      heure = tmpsAct.getHours();
      minute = tmpsAct.getMinutes();
      heure = heure < 10 ? "0" + heure : heure;
      minute = minute < 10 ? "0" + minute : minute;
      heureNminute = heure + "h : " + minute + "m";
      tempextGraph = JSON.parse(tempext);
      tempintGraph = JSON.parse(tempint);
      tabTemp.push(heureNminute);
      tabTemp.push(tempextGraph);
      tabTemp.push(tempintGraph);
      console.log(tabTemp);
      data.addRows([[tabTemp[0], tabTemp[1], tabTemp[2]]]);
      if (numberOfData >= 40)
      {
        numberOfData = 38;
        data.removeRow(0);
        data.removeRow(1);
      }
      else {
        numberOfData = numberOfData + 1;
      }

      var chart = new google.visualization.LineChart(document.querySelector('.curve_chart'));
      chart.draw(data, options);

      var tabtemExt = {tempext} 
      localStorage.setItem(temp[IndiceTemp], JSON.stringify(tabtemExt));
      tempJSON = localStorage.getItem(temp[IndiceTemp]);
      /* tempp = tempJSON && JSON.Parse(tempJSON); */
      let histor = document.querySelector(".historique");
      histor.textContent = tempJSON;
      IndiceTemp = IndiceTemp + 1;
    
      console.log("data bien reçu");
    }
    else {
      console.log("changement de connection");
      const UrlApi = "https://hothothot.dog/api/capteurs";
      fetch(UrlApi)
        .then((response) => reponse.json().then((data) => {

            let capteurs = JSON.parse(msg.data);
            let ext = capteurs['capteurs'][1];
            let interieur = capteurs['capteurs'][0];
            var tempext = ext['Valeur'];
            var tempint = interieur['Valeur'];
            let latempExt = "Température extérieure : ";
            let valTemp = tempext;
            let latempInt = "Température intérieure : ";
            let valTemp2 = interieur['Valeur'];
            console.log(latempExt + valTemp);
            console.log(latempInt + valTemp2);
            if (valTemp > 17) {
              console.log("c'est l'été ou quoi ?");
            }
            if (valTemp2 < 5) {
              console.log("wesh le glaçon !");
            }

            let tmp = document.querySelector(".temperature");
            tmp.textContent = latempExt;
            let valeurTemperature = document.querySelector(".la-temp");
            valeurTemperature.textContent = valTemp;

            let tmp2 = document.querySelector(".temperature2");
            tmp2.textContent= latempInt;
            let valeurTemperature2 = document.querySelector(".la-temp2");
            valeurTemperature2.textContent = valTemp2;

            var tabTemp = [];
            var tmpsAct = new Date();
            heure = tmpsAct.getHours();
            minute = tmpsAct.getMinutes();
            heure = heure < 10 ? "0" + heure : heure;
            minute = minute < 10 ? "0" + minute : minute;
            heureNminute = heure + "h : " + minute + "m";
            tempextGraph = JSON.parse(tempext);
            tempintGraph = JSON.parse(tempint);
            tabTemp.push(heureNminute);
            tabTemp.push(tempextGraph);
            tabTemp.push(tempintGraph);
            console.log(tabTemp);
            data.addRows([[tabTemp[0], tabTemp[1], tabTemp[2]]]);
            if (numberOfData >= 40)
            {
              numberOfData = 38;
              data.removeRow(0);
              data.removeRow(1);
            }
            else {
              numberOfData = numberOfData + 1;
            }

            var chart = new google.visualization.LineChart(document.querySelector('.curve_chart'));
            chart.draw(data, options);

            var tabtemExt = {tempext} 
            localStorage.setItem(temp[IndiceTemp], JSON.stringify(tabtemExt));
            tempJSON = localStorage.getItem(temp[IndiceTemp]);
            /* tempp = tempJSON && JSON.Parse(tempJSON); */
            let histor = document.querySelector(".historique");
            histor.textContent = tempJSON;
            IndiceTemp = IndiceTemp + 1;
          
            console.log("data bien reçu");
          
        }))
    };
    }
}   

setInterval(()=>{
  if(socket.readyState != 1) {
    const UrlApi = "https://hothothot.dog/api/capteurs";
    fetch(UrlApi)
      .then((response) => response.json().then((data) => {
              console.log("Received: "+msg.data.length);
              /* ajouter recup temp */
              if(msg.data.length > 0)
              { 
                let capteurs = JSON.parse(msg.data);
              
                let ext = capteurs['capteurs'][1];
                let interieur = capteurs['capteurs'][0];
                var tempext = ext['Valeur'];
                var tempint = interieur['Valeur'];
                let latempExt = "Température extérieur : " + tempext;
                let latempInt = "Température intérieur : " + interieur['Valeur'];
                console.log(latempExt);
                console.log(latempInt);
              
                let tmp = document.querySelector(".temperature");
                tmp.textContent = latempExt;
                let tmp2 = document.querySelector(".temperature2");
                tmp2.textContent= latempInt;
            
                var tabTemp = [];
                var tmpsAct = new Date();
                heureNminute = tmpsAct.getHours();
                heureNminute = heureNminute + "h : " + tmpsAct.getMinutes() + "m | ";
                tempext = JSON.parse(tempext);
                tempint = JSON.parse(tempint);
                tabTemp.push(heureNminute);
                tabTemp.push(tempext);
                tabTemp.push(tempint);
                console.log(heureNminute);
                console.log(tabTemp);
                data.addRows([[tabTemp[0], tabTemp[1], tabTemp[2]]]);
                if (numberOfData >= 40)
                {
                  numberOfData = 38;
                  data.removeRow(0);
                  data.removeRow(1);
                }
                else {
                  numberOfData = numberOfData + 1;
                }

                var chart = new google.visualization.LineChart(document.querySelector('.curve_chart'));
                chart.draw(data, options);
              
                console.log("data bien reçu");
              }
        
      }))
  }
}, 60000)

socket.onerror = function(response) {
fetch("https://hothothot.dog/api/capteurs/exterieur",
{
headers: {
'Accept': 'application/json',
'Content-Type': 'application/json'
},
method: "POST",
body: JSON.stringify({param1: 'valeur'})
})
.then(function(response){
return response.json.then(function(O_json){
});
})
.catch(function(){

});
};

console.log();

let deferredPrompt;
const addBtn = document.querySelector('.add-button');
addBtn.style.display = 'none';

window.addEventListener('beforeinstallprompt', (e) => {
  // Prevent Chrome 67 and earlier from automatically showing the prompt
  e.preventDefault();
  // Stash the event so it can be triggered later.
  deferredPrompt = e;
  // Update UI to notify the user they can add to home screen
  addBtn.style.display = 'block';

  addBtn.addEventListener('click', (e) => {
    // hide our user interface that shows our A2HS button
    addBtn.style.display = 'none';
    // Show the prompt
    deferredPrompt.prompt();
    // Wait for the user to respond to the prompt
    deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted the A2HS prompt');
        } else {
          console.log('User dismissed the A2HS prompt');
        }
        deferredPrompt = null;
      });
  });
});


