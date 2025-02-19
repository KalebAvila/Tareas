require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const { authenticate } = require('./controllers/auth');

// Middlewares
app.use(express.json());
app.use(authenticate); // Aplica el middleware de autenticación a todas las rutas

// Routes
app.use('/api', require('./routes'));

// Root route
app.get('/', (req, res) => {
  res.send('Bienvenido a la API de Noticias');
});

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});