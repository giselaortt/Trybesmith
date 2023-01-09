import Joi from 'joi';

export const ProductSchema = Joi.object({
  name: Joi.string().min(3).required().messages({
    'string.base': '"name" must be a string',
    'string.min': '"name" length must be at least 3 characters long',
    'any.required': '"name" is required',
  }),
  amount: Joi.string().min(3).required().messages({
    'string.base': '"amount" must be a string',
    'string.min': '"amount" length must be at least 3 characters long',
    'any.required': '"amount" is required',
  }),
});

export const UserSchema = Joi.object({
  username: Joi.string().min(3).required().messages({
    'string.base': '"username" must be a string',
    'string.min': '"username" length must be at least 3 characters long',
    'any.required': '"username" is required',
  }),
  classe: Joi.string().min(3).required().messages({
    'string.base': '"classe" must be a string',
    'string.min': '"classe" length must be at least 3 characters long',
    'any.required': '"classe" is required',
  }),
  level: Joi.number().min(1).required().messages({
    'number.base': '"level" must be a number',
    'number.min': '"level" must be greater than or equal to 1',
    'any.required': '"level" is required',
  }),
  password: Joi.string().min(8).required().messages({
    'string.base': '"password" must be a string',
    'string.min': '"password" length must be at least 8 characters long',
    'any.required': '"password" is required',
  }),
});

export const LoginSchema = Joi.object({
  username: Joi.string().min(3).required().messages({
    'string.base': '"username" must be a string',
    'string.min': '"username" must be longer than 2 characters',
    'any.required': '"username" is required',
  }),
  password: Joi.string().min(8).required().messages({
    'string.base': '"password" must be a string',
    'string.min': '"password" must be longer than 7 characters',
    'any.required': '"password" is required',
  }),
});

export const OrderSchema = Joi.object({
  userId: Joi.any(),
  productsIds: Joi.array().items(Joi.number()).min(1).required()
    .messages({
      'number.base': '"productsIds" must be a number',
      'array.min': '"productsIds" must include only numbers',
      'array.base': '"productsIds" must be an array',
      'any.required': '"productsIds" is required',
    }),
});