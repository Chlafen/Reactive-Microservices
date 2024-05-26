const Kafka = require('kafkajs');
const { Config } = require('../config');

class KafkaService {
  constructor(clientId, broker) {
      this.kafka = new Kafka.Kafka({
        clientId: clientId,
        brokers: [broker],
        logLevel: Kafka.logLevel.ERROR,
        logCreator: (logLevel) => (logEntry) =>  0,
      });
  
      this.producer = null;
  }

  async checkKafkaStatus() {
    try{
      const admin = this.kafka.admin();
      await admin.connect();
      await admin.listTopics();
      await admin.disconnect();
      return true;
    } catch (error) {
      return false;
    }
  }

  async createProducer() {
    while (true) {
      if (!await this.checkKafkaStatus()) {
        console.log("Kafka not ready, retrying...");
        await new Promise((resolve) => setTimeout(resolve, Config.retryInterval));
        continue;
      }

      try {
        this.producer = this.kafka.producer({ createPartitioner: Kafka.Partitioners.LegacyPartitioner });
        await this.producer.connect();
        console.log("Producer is ready");
        break;
      } catch (error) {
        console.log("Error in createProducer: ", error);
      }
    }
  }

  async createConsumer(groupId) {
    while (true) {
      if (!await this.checkKafkaStatus()) {
        console.log("Kafka not ready, retrying...");
        await new Promise((resolve) => setTimeout(resolve, Config.retryInterval));
        continue;
      }
      
      try {
        this.consumer = this.kafka.consumer({ groupId: groupId });
        await this.consumer.connect();
        console.log("Consumer is ready");
        break;
      } catch (error) {
        console.log("Error in createConsumer: ", error);
      }
    }
  }

  async publish(topic, messages) {
    await this.producer.send({
      topic: topic,
      messages: messages,
    }).catch((err) => {
      console.error("Error in publish: ", err);
      throw err;
    });
  }

  registerConsumerCallback(topic, callback) {
    this.callbacks = this.callbacks || {};
    this.callbacks[topic] = callback;
  }

  async startConsumer() {
    // check if consumer is ready
    while (!this.consumer) {
      console.log("Consumer not ready, retrying...");
      await new Promise((resolve) => setTimeout(resolve, Config.retryInterval));
    }
    console.log("Starting consumer");
    
    await this.consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        console.log("Topic:", topic, "Received message", {
          value: message.value.toString(),
        });
        if(this.callbacks[topic]) {
          this.callbacks[topic](message);
        } else {
          console.log("No callback registered for topic: ", topic);
        }
      },
    });
  }
}

module.exports = {
  KafkaService,
};