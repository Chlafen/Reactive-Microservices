class ScoringService {
  static async scoreApplication(data) {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    return Math.floor(Math.random() * 100)
  }
}

module.exports = {
  ScoringService
};