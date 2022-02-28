if ('serviceWorker' in navigator) {

    navigator.serviceWorker
  
      .register('service-worker.js') // à adapter à l'URL du projet
  
      .then(() => { console.log('Service Worker Registered'); });

}


// Create WebSocket connection.
var socket = new WebSocket('wss://ws.hothothot.dog:9502');

socket.onopen = () => {
    socket.send("Hello!");
  };

  
socket.onmessage = (data) => {
   let stockobj = JSON.parse(data)
   console.log(stockobj.p);
   console.log("data reçu");
  };