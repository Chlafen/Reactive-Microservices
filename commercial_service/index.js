const Config = require('./config');
const KafkaManager = require('./kafkaManager');
const { handleLoanApplication, handleDataExtractionResult } = require('./consumers');

const kafka = new KafkaManager(Config.clientId, Config.kafkaBroker);

kafka.createProducer();
kafka.createConsumer(Config.clientId, [Config.topics.LOAN_APPLICATIONS, Config.topics.DATA_EXTRACTION_OUT]);

kafka.registerConsumerCallback(
  Config.topics.LOAN_APPLICATIONS,
  (message) => handleLoanApplication(kafka, message)
);

kafka.registerConsumerCallback(
  Config.topics.DATA_EXTRACTION_OUT,
  (message) => handleDataExtractionResult(kafka, message)
);

kafka.startConsumer();