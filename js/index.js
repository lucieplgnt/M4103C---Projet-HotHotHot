if ('serviceWorker' in navigator) {

    navigator.serviceWorker
  
      .register('service-worker.js') // à adapter à l'URL du projet
  
      .then(() => { console.log('Service Worker Registered'); });

}


// Create WebSocket connection.
 var socket = new WebSocket('wss://ws.hothothot.dog:9502'); 
/* var socket = new WebSocket('ws://localhost:8100'); */

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
    let interieur = capteurs['capteurs'][2];
    console.log(ext['Valeur']);
    console.log(interieur['Valeur']);
    console.log("data reçu");
  }
  else {
    console.log("changement de connection");
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
