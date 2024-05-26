const { MailingService } = require("../services");

const handleLoanApplicationInitialScore = (kafka, message) => {
  const loanApplication = JSON.parse(message.value.toString());

  if (!loanApplication.body.email || !loanApplication.body.fileUrl || !loanApplication.body.score) {
    console.error('Invalid loan application data');
    return;
  }

  const subject = 'Initial Score was' + loanApplication.body.score + '/100 for your loan application.';

  MailingService.sendEmail(loanApplication.body.email, subject)
    .then(() => {
      console.log('Loan Application Initial Score Email sent to: ', loanApplication.body.email);
    })
    .catch((err) => {
      console.error(err);
    });
}


module.exports = {
  handleLoanApplicationInitialScore,
}