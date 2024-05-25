const { getRiskScore } = require("./bankService");

const approveLoan = (email, initialScore) => {
  const riskScore = getRiskScore(email);
  return initialScore > 50 && riskScore < 50;
}

module.exports = {
  approveLoan
}
