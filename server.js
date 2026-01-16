// server.js
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const mongodb = require('./data/database');
const app = express();

const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true })); 


app.use('/', require('./routes'));

app.use((req, res) => {
  res.status(404).json({ error: 'NotFound', message: 'Route not found' });
});

app.use((err, req, res, next) => {
  console.error(err);

  const status = err.status || 500;

  res.status(status).json({
    error: err.name || 'ServerError',
    message: err.message || 'Something went wrong'
  });
});

mongodb.initDb((err) => {
  if(err) {
    console.log(err);
  }
  else {
    app.listen(port, () => {console.log(`Database is listening and node Running on port ${port}`)});
  }
  
});
