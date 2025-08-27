import dotenv from 'dotenv';
import { SMTPConfig } from '../types/email.types';

// Cargar variables de entorno al inicio
dotenv.config();

export const smtpConfig: SMTPConfig = {
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER || '',
    pass: process.env.SMTP_PASS || ''
  }
};

// Validar que las variables críticas estén configuradas
if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
  console.warn('⚠️  ADVERTENCIA: SMTP_USER y SMTP_PASS no están configurados en las variables de entorno');
}
