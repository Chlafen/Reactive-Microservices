const express = require('express');
const config = require('./config');
const kafkaManager = require('./kafkaManager');

const app = express();

app.get('/', (req, res) => {
  res.send('Commercial Service is running!');
});

app.listen(3000, () => {
  console.log('Commercial Service is running on port 3000');
});

const kafka = kafkaManager.connect(config.clientId, config.kafkaBroker);
const consumer = kafkaManager.createConsumer(kafka, config.topics.LOAN_APPLICATIONS);
const producer = kafkaManager.createProducer(kafka);

kafkaManager.subscribe(consumer, config.topics.LOAN_APPLICATIONS)

consumer.run({
  eachMessage: async ({ topic, partition, message }) => {
    const loanApplication = JSON.parse(message.value.toString());
    console.log('New loan application received');
    console.log(loanApplication);
    
    const content = {
      producer: config.clientId,
      destination: config.services.dataExtraction,
      body: {
        email: loanApplication.email,
        fileUrl: loanApplication.fileUrl
      }
    }

    const message = {
      value: Buffer.from(JSON.stringify(content))
    }

    kafkaManager.publish(producer, config.topics.DATA_EXTRACTION_IN, [message])
      .then(() => {
        console.log('Loan application is being processed');
      })
      .catch((err) => {
        console.log(err);
      });
  }
})