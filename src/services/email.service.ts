import nodemailer from 'nodemailer';
import { EmailRequest, EmailResponse } from '../types/email.types';
import { smtpConfig } from '../config/smtp.config';

class EmailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport(smtpConfig);
  }

  /**
   * Verifica la conexión SMTP
   */
  async verifyConnection(): Promise<boolean> {
    try {
      console.log({smtpConfig});
      await this.transporter.verify();
      return true;
    } catch (error) {
      console.error('Error verificando conexión SMTP:', error);
      return false;
    }
  }

  /**
   * Envía un email
   */
  async sendEmail(emailData: EmailRequest): Promise<EmailResponse> {
    try {
      // Validar que al menos text o html estén presentes
      if (!emailData.text && !emailData.html) {
        return {
          success: false,
          message: 'Debe proporcionar al menos contenido en text o html',
          error: 'Missing content'
        };
      }

      const mailOptions = {
        from: emailData.from || smtpConfig.auth.user,
        to: emailData.to,
        subject: emailData.subject,
        text: emailData.text,
        html: emailData.html
      };

      const info = await this.transporter.sendMail(mailOptions);

      return {
        success: true,
        message: 'Email enviado exitosamente',
        messageId: info.messageId
      };

    } catch (error) {
      console.error('Error enviando email:', error);
      return {
        success: false,
        message: 'Error al enviar el email',
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  /**
   * Envía un email de prueba
   */
  async sendTestEmail(to: string): Promise<EmailResponse> {
    const testEmailData: EmailRequest = {
      to,
      subject: 'Email de Prueba - SMTP Tester',
      text: 'Este es un email de prueba enviado desde la API SMTP Tester.',
      html: `
        <h2>Email de Prueba</h2>
        <p>Este es un email de prueba enviado desde la <strong>API SMTP Tester</strong>.</p>
        <p>Si recibes este mensaje, la configuración SMTP está funcionando correctamente.</p>
        <hr>
        <small>Enviado el: ${new Date().toLocaleString()}</small>
      `
    };

    return this.sendEmail(testEmailData);
  }
}

export default new EmailService();
