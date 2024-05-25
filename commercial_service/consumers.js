const Config = require('./config');

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

const handleDataExtractionResult = async (kafka, message) => {
  const extractedData = JSON.parse(message.value.toString());

  if (extractedData.destination !== Config.clientId) {
    console.log('Ignoring Data extraction result (not meant for this service)');
    return;
  }

  if (!extractedData.body.email || !extractedData.body.fileUrl) {
    console.error('Invalid data extraction result');
    return;
  }

  const fileData = readDataFromUrl(extractedData.body.fileUrl);
  const initialScore = await scoreApplication(fileData);

  const content = {
    producer: Config.clientId,
    body: {
      email: extractedData.body.email,
      fileUrl: extractedData.body.fileUrl,
      score: initialScore
    }
  }

  const buffer = {
    value: Buffer.from(JSON.stringify(content))
  }

  kafka.publish(Config.topics.INITIAL_SCORING, [buffer])
    .then(() => {
      console.log('Loan application published to initial scoring topic');
    })
    .catch((err) => {
      console.log(err);
    });
}

const scoreApplication = async (data) => new Promise((resolve) => 
  setTimeout(() => resolve(Math.floor(Math.random() * 100)), 3000)
);


const readDataFromUrl = (url) => 'file data';


module.exports = {
  handleLoanApplication,
  handleDataExtractionResult
}