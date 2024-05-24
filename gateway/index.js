const express = require('express');
const proxy = require('http-proxy-middleware');
const config =  require('./config.js');

const app = express();
const port = 8080;


const optionsLoanProcessing = {
  target: config.LOAN_PROCESSING_URL,
  changeOrigin: true, 
  logger: console,
};


const productsProxy = proxy.createProxyMiddleware(optionsLoanProcessing);

app.get('/', (req, res) => res.send('Hello Gateway API'));
app.use('/loan-processing', productsProxy);

app.listen(port, () => console.log(`App listening on port ${port}!`));