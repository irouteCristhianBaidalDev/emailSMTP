import { Router } from 'express';
import emailController from '../controllers/email.controller';

const router = Router();

// Ruta para verificar el estado de la conexión SMTP
router.get('/status', emailController.checkStatus);

// Ruta para verificar la configuración SMTP
router.get('/config', emailController.checkConfig);

// Ruta para enviar un email personalizado
router.post('/send', emailController.sendEmail);

// Ruta para enviar un email de prueba
router.post('/test', emailController.sendTestEmail);

export default router;
