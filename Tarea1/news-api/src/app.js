require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const { authenticate } = require('./controllers/auth');

app.use(express.json());
app.use(authenticate); 

app.use('/api', require('./routes'));

app.get('/', (req, res) => {
  res.send('Bienvenido a la API de Noticias');
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});