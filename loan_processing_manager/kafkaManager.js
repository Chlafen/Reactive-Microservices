const Kafka = require('kafkajs');

const connect = (clientId, broker) => {
  const kafka = new Kafka.Kafka({
    clientId: clientId,
    brokers: [broker]
  })
  return kafka
}

const admin = (kafka) => {
  return kafka.admin()
}

const listTopics = async (admin) => {
  await admin.connect()
  const topics = await admin.listTopics()
  console.log(topics)
}

const initTopics = async (admin, topics) => {
  await admin.connect()
  await admin.createTopics({
    topics: topics
  })
}

const createConsumer = (kafka, topic) => {
  return kafka.consumer({ groupId: topic })
}

const createProducer = (kafka) => {
  return kafka.producer({ createPartitioner: Kafka.Partitioners.LegacyPartitioner })
}

const subscribe = async (consumer, topic) => {
  await consumer.connect()
  await consumer.subscribe({ topic: topic })
}

const publish = async (producer, topic, messages) => {
  await producer.connect()
  await producer.send({
    topic: topic,
    messages: messages,
  })
}


const kafkaManager = {
  connect,
  createConsumer,
  createProducer,
  subscribe,
  publish,
  admin,
  initTopics,
  listTopics,
};

module.exports = kafkaManager;