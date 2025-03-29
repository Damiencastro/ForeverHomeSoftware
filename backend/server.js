const express = require('express');
const app = express();
const port = 3000;
const controller = require('./controllers/controller')

app.use('/', controller);

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});