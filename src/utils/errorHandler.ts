import { ErrorRequestHandler } from 'express';
import Joi from 'joi';
import CustomError from './CustomError';

export const joiHandler : ErrorRequestHandler = (err, _req, res, next) => {
  if (Joi.isError(err)) {
    let status;
    if (err.details[0].message.includes('required')) status = 400;
    return res.status(status || 422).json({ message: err.message });
  }
  next(err);
};

export const CustomHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  const jwtError = err.message === 'jwt malformed';
  if (jwtError) return res.status(401).json({ error: 'Invalid token' });

  if (err instanceof CustomError) {
    return res.status(err.status).json({ message: err.message });
  }
  return res.status(500).json({ error: 'Deu ruim' });
};
