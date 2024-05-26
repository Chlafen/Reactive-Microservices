class DatabaseService {
  
  async readUrl(fileUrl) {
    await new Promise((resolve) => setTimeout(resolve, 2000));

    return "Raw File data";
  }

  async write(data) {
    await new Promise((resolve) => setTimeout(resolve, 2000));

    return "http://db.com/processed-data/12345";
  }
}

module.exports = {
  DatabaseService
};