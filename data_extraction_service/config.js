
class Config{
  static clientId = 'data-extraction'
  
  static topics = {
    LOAN_APPLICATIONS: 'loan-applications',
    INITIAL_SCORING: 'initial-scoring',
    APPROVAL_STATUS: 'approval-status',
    DATA_EXTRACTION_IN: 'data-extraction-in',
    DATA_EXTRACTION_OUT: 'data-extraction-out',
    NOTIFICATIONS: 'notifications'
  }
  
  static services = {
    loanApplication: 'loan-processing',
    commercial: 'commercial-service',
    riskManagement: 'risk-management-service'
  }
  
  static kafkaBroker = 'kafka:9092'
  static retryInterval = 5000
}


module.exports = Config;