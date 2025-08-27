import { Request, Response } from 'express';
import emailService from '../services/email.service';
import { EmailRequest } from '../types/email.types';

export class EmailController {
  /**
   * Verifica el estado de la conexión SMTP
   */
  async checkStatus(req: Request, res: Response): Promise<void> {
    try {
      const isConnected = await emailService.verifyConnection();
      
      res.json({
        status: isConnected ? 'connected' : 'disconnected',
        message: isConnected 
          ? 'Conexión SMTP exitosa' 
          : 'Error en la conexión SMTP',
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      res.status(500).json({
        status: 'error',
        message: 'Error verificando conexión SMTP',
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  }

  /**
   * Verifica la configuración SMTP (sin mostrar credenciales)
   */
  async checkConfig(req: Request, res: Response): Promise<void> {
    res.json({
      config: {
        host: process.env.SMTP_HOST || 'No configurado',
        port: process.env.SMTP_PORT || 'No configurado',
        secure: process.env.SMTP_SECURE || 'No configurado',
        user: process.env.SMTP_USER ? '***configurado***' : 'No configurado',
        pass: process.env.SMTP_PASS ? '***configurado***' : 'No configurado'
      },
      timestamp: new Date().toISOString()
    });
  }

  /**
   * Envía un email personalizado
   */
  async sendEmail(req: Request, res: Response): Promise<void> {
    try {
      const emailData: EmailRequest = req.body;

      // Validaciones básicas
      if (!emailData.to || !emailData.subject) {
        res.status(400).json({
          success: false,
          message: 'Los campos "to" y "subject" son obligatorios'
        });
        return;
      }

      const result = await emailService.sendEmail(emailData);

      if (result.success) {
        res.json(result);
      } else {
        res.status(400).json(result);
      }
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error interno del servidor',
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  }

  /**
   * Envía un email de prueba
   */
  async sendTestEmail(req: Request, res: Response): Promise<void> {
    try {
      const { to } = req.body;

      if (!to) {
        res.status(400).json({
          success: false,
          message: 'El campo "to" es obligatorio'
        });
        return;
      }

      const result = await emailService.sendTestEmail(to);

      if (result.success) {
        res.json(result);
      } else {
        res.status(400).json(result);
      }
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error interno del servidor',
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  }
}

export default new EmailController();
