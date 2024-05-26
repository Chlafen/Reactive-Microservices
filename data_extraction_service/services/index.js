const { KafkaService } = require('./kafka.service');
const { DatabaseService } = require('./database.service');
const { OCRService } = require('./ocr.service');

module.exports = {
  KafkaService,
  DatabaseService,
  OCRService
}