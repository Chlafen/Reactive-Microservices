const { Config } = require('./config'); 
const { handleLoanApplication, handleDataExtractionResult } = require('./consumers');
const { KafkaService, DatabaseService } = require('./services');

const kafka = new KafkaService(Config.clientId, Config.kafkaBroker);
const database = new DatabaseService();

kafka.createProducer();
kafka.createConsumer(Config.clientId, [Config.topics.LOAN_APPLICATIONS, Config.topics.DATA_EXTRACTION_OUT]);

kafka.registerConsumerCallback(
  Config.topics.LOAN_APPLICATIONS,
  (message) => handleLoanApplication(kafka, message)
);

kafka.registerConsumerCallback(
  Config.topics.DATA_EXTRACTION_OUT,
  (message) => handleDataExtractionResult(kafka, database, message)
);

kafka.startConsumer();