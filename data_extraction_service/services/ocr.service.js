class OCRService {
  static async processFile(fileUrl)  {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    return "Processed data";
  }
}

module.exports = {
  OCRService
};