
const mysql = require('mysql2')
require('dotenv').config();
const {DB_USER,
    DB_PASSWORD,
    DB_HOST,
    DB_NAME,
    DB_PORT} = process.env;


const connection = mysql.createConnection(`mysql://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`); 

  connection.connect((error) => {
  if (error) {
    console.error('El error de conexión es: ' + error);
    return;
  }
  console.log('Conectado a la base de datos.');
});





module.exports = { connection};

