require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 5001;
const controller = require('./controllers/controller')

app.use('/', controller);

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
