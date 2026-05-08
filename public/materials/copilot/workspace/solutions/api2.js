const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
	res.send('Hola mundo desde mi API');
});

app.listen(PORT, () => {
	console.log(`API iniciada en el puerto ${PORT}`);
});

