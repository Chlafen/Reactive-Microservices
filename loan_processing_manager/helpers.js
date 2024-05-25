const Config = require('./config');

function generateLoanApplication(email, fileUrl) {
  const messageContent = {
    producer: Config.clientId,
    destination: Config.services.commercial,
    body: {
      email: email,
      fileUrl: fileUrl
    }
  }
  return {
    value: Buffer.from(JSON.stringify(messageContent))
  }
}

module.exports = {
  generateLoanApplication
}