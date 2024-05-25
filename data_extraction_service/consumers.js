const Config = require('./config');


const handleOCRInput = async (kafka, message)  =>  {
  const data = JSON.parse(message.value.toString());

  if (!data.body.email || !data.body.fileUrl || !data.producer) {
    console.error('Invalid data');
    return;
  }

  console.log('Processing data using OCR');
  const file = readDataFromDb(data.body.fileUrl);
  const processedDataUrl = await ocrProcess(file);
  console.log('Data processed, publishing to data extraction output topic');

  const content = {
    producer: Config.clientId,
    destination: data.producer,
    body: {
      email: data.body.email,
      fileUrl: processedDataUrl,
    }
  }

  const buffer = {
    value: Buffer.from(JSON.stringify(content))
  }

  kafka.publish(Config.topics.DATA_EXTRACTION_OUT, [buffer])
    .then(() => {
      console.log('Data published to data extraction output topic');
    })
    .catch((err) => {
      console.log(err);
    });   
}

function readDataFromDb(fileUrl) {
  return "Raw File data";
}

function writeDataToDb(data) {
  return "http://db.com/processed-data/12345";
}

async function ocrProcess(fileUrl)  {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const data = "Processed data";
      console.log('Data processed, saving to database');
      const url = writeDataToDb(data);
      resolve(url);
    }, 2000);
  });
}

module.exports = {
  handleOCRInput
}