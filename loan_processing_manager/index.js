const express = require('express');
const config = require('./config');
const kafkaManager = require('./kafkaManager');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const kafka = kafkaManager.connect(config.clientId, config.kafkaBroker);
const producer = kafkaManager.createProducer(kafka);
const admin = kafkaManager.admin(kafka);

admin.listTopics()
kafkaManager.listTopics(admin);

kafkaManager.initTopics(admin, [{
    topic: config.topics.LOAN_APPLICATIONS,
}]);

app.post('/process', (req, res) => {
  console.log('New loan application request received');

  const email = req.body.email;
  const fileUrl = req.body.fileUrl;

  const messageContent = {
    producer: config.clientId,
    destination: config.services.commercial,
    body: {
      email: email,
      fileUrl: fileUrl
    }
  }
  const message = {
    value: Buffer.from(JSON.stringify(messageContent))
  }
  
  kafkaManager.publish(producer, config.topics.LOAN_APPLICATIONS, [message])
    .then(() => {
      res.send('Loan application is being processed');
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Failed to process loan application');
    });
});

app.listen(3000, () => {
  console.log('Loan Processing Manager is running')
});