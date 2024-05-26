class BankService {
  static getRiskScore(email) {
    return Math.floor(Math.random() * 101);
  }
  
  static approveLoan(email, initialScore) {
    const riskScore = this.getRiskScore(email);
    return initialScore > 50 && riskScore < 50;
  }
}


module.exports = {
  BankService
}
