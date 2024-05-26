const { Config } = require("../config"); 
const { ScoringService } = require("../services");

const handleDataExtractionResult = async (kafka, db, message) => {
  const extractedData = JSON.parse(message.value.toString());

  if (extractedData.destination !== Config.clientId) {
    console.log('Ignoring Data extraction result (not meant for this service)');
    return;
  }

  if (!extractedData.body.email || !extractedData.body.fileUrl) {
    console.error('Invalid data extraction result');
    return;
  }

  const fileData = await db.readUrl(extractedData.body.fileUrl);
  const initialScore = await ScoringService.scoreApplication(fileData);

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


module.exports = {
  handleDataExtractionResult
}