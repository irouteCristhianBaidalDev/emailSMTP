# SMTP Email Tester API

API sencilla desarrollada en Node.js con TypeScript y Express para testear el envío de correos electrónicos por SMTP.

## Características

- ✅ Verificación de conexión SMTP
- ✅ Envío de emails personalizados
- ✅ Envío de emails de prueba
- ✅ Validación de formato de email
- ✅ Manejo de errores
- ✅ Logging de requests
- ✅ TypeScript para mayor seguridad de tipos

## Instalación

1. Instalar dependencias:
```bash
npm install
```

2. Configurar variables de entorno:
```bash
cp .env.example .env
```

3. Editar el archivo `.env` con tu configuración SMTP:
```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=tu-email@gmail.com
SMTP_PASS=tu-password-de-aplicacion
PORT=3000
```

## Scripts disponibles

```bash
# Desarrollo con recarga automática
npm run dev

# Compilar TypeScript
npm run build

# Ejecutar versión compilada
npm start

# Desarrollo con nodemon
npm run watch
```

## Endpoints

### GET /health
Verifica que la API esté funcionando.

**Respuesta:**
```json
{
  "status": "OK",
  "message": "SMTP Email Tester API está funcionando",
  "timestamp": "2023-12-07T10:30:00.000Z"
}
```

### GET /api/email/status
Verifica la conexión con el servidor SMTP.

**Respuesta:**
```json
{
  "status": "connected",
  "message": "Conexión SMTP exitosa",
  "timestamp": "2023-12-07T10:30:00.000Z"
}
```

### GET /api/email/config
Verifica que las variables de entorno estén configuradas correctamente.

**Respuesta:**
```json
{
  "config": {
    "host": "smtp.gmail.com",
    "port": "587",
    "secure": "false",
    "user": "***configurado***",
    "pass": "***configurado***"
  },
  "timestamp": "2023-12-07T10:30:00.000Z"
}
```

### POST /api/email/send
Envía un email personalizado.

**Body:**
```json
{
  "to": "destinatario@ejemplo.com",
  "subject": "Asunto del email",
  "text": "Contenido en texto plano",
  "html": "<h1>Contenido en HTML</h1>",
  "from": "remitente@ejemplo.com" // Opcional
}
```

**Respuesta:**
```json
{
  "success": true,
  "message": "Email enviado exitosamente",
  "messageId": "mensaje-id-generado"
}
```

### POST /api/email/test
Envía un email de prueba predefinido.

**Body:**
```json
{
  "to": "destinatario@ejemplo.com"
}
```

**Respuesta:**
```json
{
  "success": true,
  "message": "Email enviado exitosamente",
  "messageId": "mensaje-id-generado"
}
```

## Configuración SMTP

### Gmail
Para usar Gmail como servidor SMTP:

1. Habilita la verificación en 2 pasos en tu cuenta de Google
2. Genera una contraseña de aplicación específica
3. Usa estas configuraciones:
   - Host: `smtp.gmail.com`
   - Puerto: `587`
   - Secure: `false`
   - Usuario: tu email de Gmail
   - Contraseña: la contraseña de aplicación generada

### Otros proveedores
La API es compatible con cualquier servidor SMTP. Solo ajusta las variables de entorno según tu proveedor.

## Estructura del proyecto

```
src/
├── config/
│   └── smtp.config.ts      # Configuración SMTP
├── controllers/
│   └── email.controller.ts # Controladores de email
├── middleware/
│   └── validation.middleware.ts # Middlewares de validación
├── routes/
│   └── email.routes.ts     # Rutas de la API
├── services/
│   └── email.service.ts    # Lógica de negocio para emails
├── types/
│   └── email.types.ts      # Tipos TypeScript
└── index.ts               # Punto de entrada de la aplicación
```

## Ejemplos de uso

### Usando curl

```bash
# Verificar estado
curl http://localhost:3000/api/email/status

# Enviar email de prueba
curl -X POST http://localhost:3000/api/email/test \
  -H "Content-Type: application/json" \
  -d '{"to": "test@ejemplo.com"}'

# Enviar email personalizado
curl -X POST http://localhost:3000/api/email/send \
  -H "Content-Type: application/json" \
  -d '{
    "to": "destinatario@ejemplo.com",
    "subject": "Prueba desde API",
    "text": "Este es un mensaje de prueba",
    "html": "<p>Este es un <strong>mensaje de prueba</strong></p>"
  }'
```

## Manejo de errores

La API maneja diferentes tipos de errores:

- **400 Bad Request**: Datos de entrada inválidos
- **500 Internal Server Error**: Errores del servidor o SMTP
- **404 Not Found**: Endpoint no encontrado

Todas las respuestas de error incluyen un mensaje descriptivo y detalles adicionales cuando es apropiado.
