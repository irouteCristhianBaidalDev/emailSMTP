import { Request, Response, NextFunction } from 'express';

/**
 * Middleware para validar formato de email
 */
export const validateEmail = (req: Request, res: Response, next: NextFunction): void => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const { to } = req.body;

  if (to && !emailRegex.test(to)) {
    res.status(400).json({
      success: false,
      message: 'Formato de email inválido'
    });
    return;
  }

  next();
};

/**
 * Middleware para logging de requests
 */
export const logRequest = (req: Request, res: Response, next: NextFunction): void => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
};
