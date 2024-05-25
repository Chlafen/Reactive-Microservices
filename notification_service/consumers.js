const { sendEmail } = require("./mailingService");

const handleLoanApplicationInitialScore = (kafka, message) => {
  const loanApplication = JSON.parse(message.value.toString());

  if (!loanApplication.body.email || !loanApplication.body.fileUrl || !loanApplication.body.score) {
    console.error('Invalid loan application data');
    return;
  }

  const subject = 'Initial Score was' + loanApplication.body.score + '/100 for your loan application.';

  sendEmail(loanApplication.body.email, subject)
    .then(() => {
      console.log('Loan Application Initial Score Email sent to: ', loanApplication.body.email);
    })
    .catch((err) => {
      console.error(err);
    });
}

const handleLoanApplicationStatus = (kafka, message) => {
  const loanApplication = JSON.parse(message.value.toString());

  if (!loanApplication.body.email || !loanApplication.body.fileUrl || loanApplication.body.isApproved === undefined) {
    console.error('Invalid loan application result data: ', loanApplication.body);
    return;
  }

  const subject = loanApplication.body.isApproved ? 'Loan Application Approved!' : 'Loan Application Rejected';

  sendEmail(loanApplication.body.email, subject)
    .then(() => {
      console.log('Loan Application Status Email sent to: ', loanApplication.body.email);
    })
    .catch((err) => {
      console.error(err);
    });
}




module.exports = {
  handleLoanApplicationInitialScore,
  handleLoanApplicationStatus
}