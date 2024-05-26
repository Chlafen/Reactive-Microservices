const express = require('express');
const bodyParser = require('body-parser');

const { Config } = require('./config');
const { KafkaService, LoanService } = require('./services');

const kafka = new KafkaService(Config.clientId, Config.kafkaBroker);
const loanService = new LoanService(Config);
kafka.createProducer();

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/process', (req, res) => {
  console.log('New loan application request received');

  const message = loanService.generateLoanApplication(req.body.email, req.body.fileUrl)
  
  kafka.publish(Config.topics.LOAN_APPLICATIONS, [message])
    .then(() => {
      console.log('Loan application published to loan applications topic');
      res.send('Your Loan application is being processed');
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Failed to process loan application');
    });
});


app.listen(3000, () => {
  console.log('Loan Processing Manager server is running')
});