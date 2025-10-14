const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());


const rutas = require('./routes/rutas');
app.use('/', rutas);


app.get('/', (_req, res) => {
  res.send('Hola desde mi servidor express c:');
});


app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(500).json({ message: 'Error interno del servidor' });
});

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
