const { Config } = require('../config');
const { OCRService } = require('../services');

const handleOCRInput = async (kafka, db, message)  =>  {
  const data = JSON.parse(message.value.toString());

  if (!data.body.email || !data.body.fileUrl || !data.producer) {
    console.error('Invalid data');
    return;
  }

  
  console.log('Processing data using OCR');

  const file = await db.readUrl(data.body.fileUrl);

  const processedFile = await OCRService.processFile(file);
  const processedFileUrl = await db.write(processedFile);
  
  console.log('Data processed, publishing to data extraction output topic');

  const content = {
    producer: Config.clientId,
    destination: data.producer,
    body: {
      email: data.body.email,
      fileUrl: processedFileUrl,
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


module.exports = {
  handleOCRInput
}