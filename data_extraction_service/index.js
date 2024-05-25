const Config = require('./config');
const KafkaManager = require('./kafkaManager');
const { handleOCRInput } = require('./consumers');


const kafka = new KafkaManager(Config.clientId, Config.kafkaBroker);

kafka.createProducer();
kafka.createConsumer(Config.clientId, [Config.topics.DATA_EXTRACTION_IN]);

kafka.registerConsumerCallback(
  Config.topics.DATA_EXTRACTION_IN,
  (message) => handleOCRInput(kafka, message)
);

kafka.startConsumer();