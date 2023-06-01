const express = require('express');
const http = require('http');
const WebSocket = require('ws');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

app.use(express.json());


app.post('/api/data', (req, res) => {
  const { air_quality, temperature, pressure, altitude } = req.body;

  const data = JSON.stringify({ air_quality, temperature, pressure, altitude });
  // Emitir los datos recibidos a través de WebSocket
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(data);
    }
  });

  console.log('Datos recibidos:');
  console.log('Calidad del aire:', air_quality);
  console.log('Temperatura:', temperature);
  console.log('Presión:', pressure);
  console.log('Altitud:', altitude);

  // Responder al ESP32 con un mensaje de éxito
  res.status(200).json({ message: 'Datos recibidos correctamente' });
});

app.post('/api/data1', (req, res) => {
  const { air_quality1, temperature1, pressure1, altitude1 } = req.body;

  const data1 = JSON.stringify({ air_quality1, temperature1, pressure1, altitude1 });

  // Emitir los datos recibidos a través de WebSocket
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(data1);
    }
  });

  console.log('Datos recibidos ruta 2:');
  console.log('Calidad del aire:', air_quality1);
  console.log('Temperatura:', temperature1);
  console.log('Presión:', pressure1);
  console.log('Altitud:', altitude1);

  // Responder al ESP32 con un mensaje de éxito
  res.status(200).json({ message: 'Datos recibidos correctamente' });
});

app.post('/api/data2', (req, res) => {
  const { air_quality2, temperature2, pressure2, altitude2 } = req.body;

  const data2 = JSON.stringify({ air_quality2, temperature2, pressure2, altitude2 });


  // Emitir los datos recibidos a través de WebSocket
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(data2);
    }
  });

  console.log('Datos recibidos:');
  console.log('Calidad del aire:', air_quality2);
  console.log('Temperatura:', temperature2);
  console.log('Presión:', pressure2);
  console.log('Altitud:', altitude2);

  // Responder al ESP32 con un mensaje de éxito
  res.status(200).json({ message: 'Datos recibidos correctamente' });
});

app.post('/api/data3', (req, res) => {
  const {altura} = req.body;

  const data3 = JSON.stringify({altura});

  // Emitir los datos recibidos a través de WebSocket
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(data3);
    }
  });

  console.log('Datos recibidos:');
  console.log('Altura:', altura);

  // Responder al ESP32 con un mensaje de éxito
  res.status(200).json({ message: 'Datos recibidos correctamente' });
});



  wss.on('connection', (ws) => {
    console.log('Nuevo cliente conectado');
  
    ws.on('message', (data) => {
      const parsedData = JSON.parse(data);
  
      if (parsedData.hasOwnProperty('air_quality')) {
        // Ruta 1
        console.log('Datos recibidos ruta 1:');
        console.log('Calidad del aire:', parsedData.air_quality);
        console.log('Temperatura:', parsedData.temperature);
        console.log('Presión:', parsedData.pressure);
        console.log('Altitud:', parsedData.altitude);
  
        // Emitir los datos recibidos a través de WebSocket
        wss.clients.forEach((client) => {
          if (client !== ws && client.readyState === WebSocket.OPEN) {
            client.send(data);
          }
        });
      } else if (parsedData.hasOwnProperty('air_quality1')) {
        // Ruta 2
        console.log('Datos recibidos ruta 2:');
        console.log('Calidad del aire:', parsedData.air_quality1);
        console.log('Temperatura:', parsedData.temperature1);
        console.log('Presión:', parsedData.pressure1);
        console.log('Altitud:', parsedData.altitude1);
  
        // Emitir los datos recibidos a través de WebSocket
        wss.clients.forEach((client) => {
          if (client !== ws && client.readyState === WebSocket.OPEN) {
            client.send(data);
          }
        });
      } else if (parsedData.hasOwnProperty('air_quality2')) {
        // Ruta 3
        console.log('Datos recibidos ruta 3:');
        console.log('Calidad del aire:', parsedData.air_quality2);
        console.log('Temperatura:', parsedData.temperature2);
        console.log('Presión:', parsedData.pressure2);
        console.log('Altitud:', parsedData.altitude2);
  
        // Emitir los datos recibidos a través de WebSocket
        wss.clients.forEach((client) => {
          if (client !== ws && client.readyState === WebSocket.OPEN) {
            client.send(data);
          }
        });
      } else if (parsedData.hasOwnProperty('altura')) {
        // Ruta 4
        console.log('Datos recibidos ruta 4:');
        console.log('Altura:', parsedData.altura);
  
        // Emitir los datos recibidos a través de WebSocket
        wss.clients.forEach((client) => {
          if (client !== ws && client.readyState === WebSocket.OPEN) {
            client.send(data);
          }
        });
      }
  
      // Envía los datos al cliente que los envió
      ws.send(data);
    });


  // Maneja la desconexión del cliente
  ws.on('close', () => {
    console.log('Cliente desconectado');
  });
});


const port = process.env.PORT || 3000; 
  server.listen(port, () => {
    console.log(' 🚀 El servidor ha despegado en el puerto ', port);
  });