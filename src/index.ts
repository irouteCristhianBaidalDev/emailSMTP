// Cargar variables de entorno PRIMERO
import dotenv from 'dotenv';
dotenv.config();

// Debug: Verificar que las variables se cargaron
console.log('🔧 Variables de entorno cargadas:');
console.log('SMTP_HOST:', process.env.SMTP_HOST || 'NO CONFIGURADO');
console.log('SMTP_PORT:', process.env.SMTP_PORT || 'NO CONFIGURADO');
console.log('SMTP_USER:', process.env.SMTP_USER ? '***configurado***' : 'NO CONFIGURADO');
console.log('SMTP_PASS:', process.env.SMTP_PASS ? '***configurado***' : 'NO CONFIGURADO');

import express from 'express';
import cors from 'cors';
import emailRoutes from './routes/email.routes';
import { logRequest } from './middleware/validation.middleware';

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(logRequest);

// Rutas
app.use('/api/email', emailRoutes);

// Ruta de salud
app.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    message: 'SMTP Email Tester API está funcionando',
    timestamp: new Date().toISOString()
  });
});

// Ruta por defecto
app.get('/', (req, res) => {
  res.json({
    message: 'SMTP Email Tester API',
    version: '1.0.0',
    endpoints: {
      health: 'GET /health',
      status: 'GET /api/email/status',
      sendEmail: 'POST /api/email/send',
      testEmail: 'POST /api/email/test'
    }
  });
});

// Manejo de rutas no encontradas
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Endpoint no encontrado'
  });
});

// Manejo global de errores
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Error no manejado:', err);
  res.status(500).json({
    success: false,
    message: 'Error interno del servidor',
    error: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error'
  });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor ejecutándose en http://localhost:${PORT}`);
  console.log(`📧 API de pruebas SMTP lista para usar`);
});
