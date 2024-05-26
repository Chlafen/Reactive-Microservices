const { KafkaService } = require('./kafka.service');
const { DatabaseService } = require('./database.service');
const { ScoringService } = require('./scoring.service');

module.exports = {
  KafkaService,
  DatabaseService,
  ScoringService,
}