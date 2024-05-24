
const clientId = 'commercial-service'

const topics = {
  LOAN_APPLICATIONS: 'loan-applications',
  INITIAL_SCORING: 'initial-scoring',
  APPROVAL_STATUS: 'approval-status',
  DATA_EXTRACTION_IN: 'data-extraction-in',
  DATA_EXTRACTION_OUT: 'data-extraction-out',
  NOTIFICATIONS: 'notifications'
}

const services = {
  dataExtraction: 'data-extraction',
}

const kafkaBroker = 'kafka:9092'


module.exports = {
  clientId,
  topics,
  kafkaBroker,
  services
}