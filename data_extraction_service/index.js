const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.send('Data extraction Service is running!');
});

app.listen(3000, () => {
  console.log('Data extraction is running on port 3000');
});
