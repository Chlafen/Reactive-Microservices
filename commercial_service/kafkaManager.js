import { Kafka } from 'kafkajs';

const connect = (clientId, broker) => {
  const kafka = new Kafka({
    clientId: clientId,
    brokers: [broker]
  })
  return kafka
}

const createConsumer = (kafka, topic) => {
  return kafka.consumer({ groupId: topic })
}

const createProducer = (kafka) => {
  return kafka.producer()
}

const subscribe = async (consumer, topic) => {
  await consumer.connect()
  await consumer.subscribe({ topic: topic })
}

const publish = async (producer, topic, messages) => {
  await producer.connect()
  await producer.send({
    topic: topic,
    messages: messages
  })
}

export {
  connect,
  createConsumer,
  createProducer,
  subscribe,
  publish
}