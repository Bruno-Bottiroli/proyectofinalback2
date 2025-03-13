import transporter from '../config/nodemailer.js'

class MailService {
  constructor() {
    this.transporter = transporter
  }

  async getMessageTemplate({ type, email }) {
    let message = `
    <body style="width: 100%; height: 100%; display: flex; justify-content: center; align-items: center; flex-direction: column; font-family: Arial, sans-serif; color: #333; background-color: #f4f4f4; margin: 0; padding: 0;">
    
    <h2> Hola, ${email}! </h2>
    
    `;

    switch (type) {
      case 'WELCOME':
        message += `
          <h3 style="color: darkblue">
            Bienvenido a nuestra APP!
          </h3>
          <br>
          Gracias por registrarte!
        `;
        break;
      case 'THANK_YOU':
        message += `
          <h3 style="color: darkblue">
            Gracias por tu compra!
          </h3>
          <br>
          Agradecemos tu confianza en nuestra app.
        `;
        break
    }

    return message
  }

  async sendMail({ to, subject, type }) {
    try {
      const html = await this.getMessageTemplate({ type, email: to })

      const info = await this.transporter.sendMail({
        from: process.env.NODEMAILER_FROM,
        to,
        subject,
        html,
      });

      console.log('Message sent: ', info.messageId)
    } catch (error) {
      console.error('Error sending email: ', error)
    }
  }
}

export const mailService = new MailService()