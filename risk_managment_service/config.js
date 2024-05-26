class Config{
  static clientId = 'risk-management-service'
  
  static topics = {
    LOAN_APPLICATIONS: 'loan-applications',
    INITIAL_SCORING: 'initial-scoring',
    APPROVAL_STATUS: 'approval-status',
    DATA_EXTRACTION_IN: 'data-extraction-in',
    DATA_EXTRACTION_OUT: 'data-extraction-out',
    NOTIFICATIONS: 'notifications'
  }
  
  static services = {
    commercialService: 'commercial-service',
  }
  
  static kafkaBroker = 'kafka:9092'
  static retryInterval = 5000
}


module.exports = {
  Config
};