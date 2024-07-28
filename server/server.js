const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const menuRoutes = require('./routes/menu');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use('/api/menu', menuRoutes);

const PORT = 5000;
mongoose.connect('mongodb://localhost:27017/cantina')
  .then(() => app.listen(PORT, () => console.log(`Servidor rodando em http://localhost:${PORT}`)))
  .catch(err => console.log(err));
