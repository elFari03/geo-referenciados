const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Rutas principales
const rutas = require('./routes/rutas');
app.use('/', rutas);

// Ruta raíz
app.get('/', (req, res) => {
  res.send('✅ Servidor corriendo en Express 🚀');
});

// Middleware de errores
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: 'Error interno del servidor' });
});

app.listen(port, () => {
  console.log(`✅ Servidor corriendo en http://localhost:${port}`);
});
