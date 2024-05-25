const Config = require('./config');
const KafkaManager = require('./kafkaManager');
const { handleScoredLoanApplication } = require('./consumers');

const kafka = new KafkaManager(Config.clientId, Config.kafkaBroker);

kafka.createProducer();
kafka.createConsumer(Config.clientId, [Config.topics.INITIAL_SCORING]);

kafka.registerConsumerCallback(
  Config.topics.INITIAL_SCORING,
  (message) => handleScoredLoanApplication(kafka, message)
);

kafka.startConsumer();