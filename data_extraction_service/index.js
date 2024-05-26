const { Config } = require('./config');
const { handleOCRInput } = require('./consumers');
const { KafkaService } = require('./services');
const { DatabaseService } = require('./services');

const kafka = new KafkaService(Config.clientId, Config.kafkaBroker);
const database = new DatabaseService();
kafka.createProducer();
kafka.createConsumer(Config.clientId, [Config.topics.DATA_EXTRACTION_IN]);

kafka.registerConsumerCallback(
  Config.topics.DATA_EXTRACTION_IN,
  (message) => handleOCRInput(kafka, database, message)
);

kafka.startConsumer();