class MailingService {
  static async sendEmail(email, message) {
    console.log(`Sending email to ${email}: ${message}`);
    // Send email
  }
}

module.exports = {
  MailingService
}