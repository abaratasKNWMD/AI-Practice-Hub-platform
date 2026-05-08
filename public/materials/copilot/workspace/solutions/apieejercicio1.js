// apieejercicio1.js
// API básico en Node.js usando Express
// Endpoint: GET / => "Hola mundo desde mi API"
// Muestra información del arranque en consola

const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Hola mundo desde mi API');
});

app.listen(PORT, () => {
  console.log(`API escuchando en http://localhost:${PORT}`);
});
