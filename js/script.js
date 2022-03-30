//Bouton notification - début
let notif = document.querySelector(".notification");

notif.onclick = function(){
  notif.classList.toggle("open");
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
// anglets - fin


if ('serviceWorker' in navigator) {

  navigator.serviceWorker

  .register('/M4103C---Projet-HotHotHot/service-worker.js') // à adapter à l'URL du projet

  // .register('M4103C---Projet-HotHotHot/service-worker.js') // à adapter à l'URL du projet

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


socket.onmessage = (msg) => {
console.log("Received: "+msg.data.length);
/* ajouter recup temp */
if(msg.data.length > 0)
{
  let capteurs = JSON.parse(msg.data);

  let ext = capteurs['capteurs'][1];
  let interieur = capteurs['capteurs'][0];
  var tempext = ext['Valeur'];
  let latempExt = "Température extérieur : " + tempext;
  let latempInt = "Température intérieur : " + interieur['Valeur'];

  console.log(latempExt);
  console.log(latempInt);

  let tmp = document.querySelector(".temperature");
  tmp.textContent = latempExt;
  let tmp2 = document.querySelector(".temperature2");
  tmp2.textContent= latempInt;

  var tabtemExt = {tempext} 
  localStorage.setItem(temp[IndiceTemp], JSON.stringify(tabtemExt));

  tempJSON = localStorage.getItem(temp[IndiceTemp]);
/*   tempp = tempJSON && JSON.Parse(tempJSON);
 */
  let histor = document.querySelector(".historique");
  histor.textContent = tempJSON;
  
  IndiceTemp = IndiceTemp + 1;

  console.log("data bien reçu");
}
else {
  console.log("changement de connection");
  fetch("https://hothothot.dog/api/capteurs/",
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
}


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
