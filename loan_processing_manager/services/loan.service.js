class LoanService {
  #config;
  constructor(config ){
    this.#config = config;
  }

  generateLoanApplication(email, fileUrl) {
    const messageContent = {
      producer: this.#config.clientId,
      destination: this.#config.services.commercial,
      body: {
        email: email,
        fileUrl: fileUrl
      }
    }
    return {
      value: Buffer.from(JSON.stringify(messageContent))
    }
  }
}

module.exports = {
  LoanService
}