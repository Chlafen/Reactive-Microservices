const Config = require('./config');
const KafkaManager = require('./kafkaManager');
const { handleLoanApplicationInitialScore, handleLoanApplicationStatus } = require('./consumers');

const kafka = new KafkaManager(Config.clientId, Config.kafkaBroker);

kafka.createProducer();
kafka.createConsumer(Config.clientId, [Config.topics.APPROVAL_STATUS, Config.topics.INITIAL_SCORING]);

kafka.registerConsumerCallback(
  Config.topics.INITIAL_SCORING,
  (message) => handleLoanApplicationInitialScore(kafka, message)
);

kafka.registerConsumerCallback(
  Config.topics.APPROVAL_STATUS,
  (message) => handleLoanApplicationStatus(kafka, message)
);

kafka.startConsumer();