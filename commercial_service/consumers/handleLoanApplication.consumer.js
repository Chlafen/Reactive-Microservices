const { Config } = require('../config');

const handleLoanApplication = (kafka, message) => {
  const loanApplication = JSON.parse(message.value.toString());

  if (!loanApplication.body.email || !loanApplication.body.fileUrl) {
    console.error('Invalid loan application data');
    return;
  }
  
  const content = {
    producer: Config.clientId,
    body: {
      email: loanApplication.body.email,
      fileUrl: loanApplication.body.fileUrl
    }
  }

  const buffer = {
    value: Buffer.from(JSON.stringify(content))
  }

  kafka.publish(Config.topics.DATA_EXTRACTION_IN, [buffer])
    .then(() => {
      console.log('Loan application published to data extraction input topic');
    })
    .catch((err) => {
      console.log(err);
    });
}

module.exports = {
  handleLoanApplication
}