const express = require('express');
const conectarDB = require('./config/db');

// Crear el servidor
const app = express();

// Conectar a la base de datos
conectarDB();

// Puerto de la app
const PORT = process.env.PORT || 4000;

app.get('/', (req, res) =>{
    res.send('Hola mundo');
});

// Arrancar la app
app.listen(PORT, () => {
    console.log(`El servidor esta funcionando en el puerto ${PORT}`);
});

