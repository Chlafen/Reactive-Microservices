const { sendEmail, MailingService } = require("../services/mailing.service");

const handleLoanApplicationStatus = (kafka, message) => {
  const loanApplication = JSON.parse(message.value.toString());

  if (!loanApplication.body.email || !loanApplication.body.fileUrl || loanApplication.body.isApproved === undefined) {
    console.error('Invalid loan application result data: ', loanApplication.body);
    return;
  }

  const subject = loanApplication.body.isApproved ? 'Loan Application Approved!' : 'Loan Application Rejected';

  MailingService.sendEmail(loanApplication.body.email, subject)
    .then(() => {
      console.log('Loan Application Status Email sent to: ', loanApplication.body.email);
    })
    .catch((err) => {
      console.error(err);
    });
}

module.exports = {
  handleLoanApplicationStatus,
}