const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.send('Risk managment Service is running!');
});

app.listen(3000, () => {
  console.log('Risk managment Service is running on port 3000');
});
