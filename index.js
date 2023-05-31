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
  const { air_quality, temperature, pressure, altitude } = req.body;

  const data1 = JSON.stringify({ air_quality, temperature, pressure, altitude });

  // Emitir los datos recibidos a través de WebSocket
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(data1);
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

app.post('/api/data2', (req, res) => {
  const { air_quality, temperature, pressure, altitude } = req.body;

  const data2 = JSON.stringify({ air_quality, temperature, pressure, altitude });


  // Emitir los datos recibidos a través de WebSocket
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(data2);
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

  // Envía los datos recibidos al cliente que los envió
  ws.on('message', (data) => {
    // Realiza acciones con los datos recibidos
    // Por ejemplo, puedes almacenarlos en una base de datos, procesarlos, etc.

    const { air_quality, temperature, pressure, altitude } = JSON.parse(data);

    console.log('Datos recibidos:');
    console.log('Calidad del aire:', air_quality);
    console.log('Temperatura:', temperature);
    console.log('Presión:', pressure);
    console.log('Altitud:', altitude);

    // Envía los datos al cliente que los envió
    ws.send(data);

    // Envía los datos a todos los clientes conectados
    wss.clients.forEach((client) => {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(data);
      }
    });
  });

  ws.on('message', (data1) => {

    const { air_quality, temperature, pressure, altitude } = JSON.parse(data1);

    console.log('Datos recibidos:');
    console.log('Calidad del aire:', air_quality);
    console.log('Temperatura:', temperature);
    console.log('Presión:', pressure);
    console.log('Altitud:', altitude);

    // Envía los datos al cliente que los envió
    ws.send(data1);

    // Envía los datos a todos los clientes conectados
    wss.clients.forEach((client) => {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(data1);
      }
    });
  });

  ws.on('message', (data2) => {

    const { air_quality, temperature, pressure, altitude } = JSON.parse(data2);

    console.log('Datos recibidos:');
    console.log('Calidad del aire:', air_quality);
    console.log('Temperatura:', temperature);
    console.log('Presión:', pressure);
    console.log('Altitud:', altitude);

    // Envía los datos al cliente que los envió
    ws.send(data2);

    // Envía los datos a todos los clientes conectados
    wss.clients.forEach((client) => {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(data2);
      }
    });
  });

  ws.on('message', (data3) => {

    const {altura} = JSON.parse(data3);

    console.log('Datos recibidos:');
    console.log('Altura:', altura);

    // Envía los datos al cliente que los envió
    ws.send(data3);
    
    // Envía los datos a todos los clientes conectados
    wss.clients.forEach((client) => {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(data3);
      }
    });
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