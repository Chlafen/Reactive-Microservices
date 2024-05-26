const { Config } = require('../config');
const { BankService } = require('../services');

const handleScoredLoanApplication = async (kafka, message) => {
  const loanApplication = JSON.parse(message.value.toString());

  if (loanApplication.producer !== Config.services.commercialService) {
    console.error('Only commercial service can send loan applications');
    return;
  }
  
  if (!loanApplication.body.email || !loanApplication.body.fileUrl || !loanApplication.body.score) {
    console.error('Invalid loan application data');
    return;
  }

  const isApproved = BankService.approveLoan(loanApplication.body.email, loanApplication.body.score);
  await new Promise((resolve) => setTimeout(resolve, 2000));
  
  const content = {
    producer: Config.clientId,
    body: {
      email: loanApplication.body.email,
      fileUrl: loanApplication.body.fileUrl,
      isApproved: isApproved
    }
  }

  const buffer = {
    value: Buffer.from(JSON.stringify(content))
  }

  kafka.publish(Config.topics.APPROVAL_STATUS, [buffer])
    .then(() => {
      console.log('Loan application approval status published');
    })
    .catch((err) => {
      console.log(err);
    });
}

module.exports = {
  handleScoredLoanApplication
}
