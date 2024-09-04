import Joi from 'joi';

export const createContactSchema = Joi.object({
  name: Joi.string().min(3).max(20).required().messages({
    'string.base': `"Name" should be a type of 'text'`,
    'string.empty': `"Name" cannot be an empty field`,
    'string.min': `"Name" should have a minimum length of {#limit}`,
    'string.max': `"Name" should have a maximum length of {#limit}`,
    'any.required': `"Name" is a required field`,
  }),
  phoneNumber: Joi.string().min(3).max(20).required().messages({
    'string.base': `"Phone number" should be a type of 'text'`,
    'string.empty': `"Phone number" cannot be an empty field`,
    'string.min': `"Phone number" should have a minimum length of {#limit}`,
    'string.max': `"Phone number" should have a maximum length of {#limit}`,
    'any.required': `"Phone number" is a required field`,
  }),
  email: Joi.string().email().min(3).max(20).messages({
    'string.email': `"Email" must be a valid email address`,
    'string.min': `"Email" should have a minimum length of {#limit}`,
    'string.max': `"Email" should have a maximum length of {#limit}`,
  }),
  isFavourite: Joi.boolean().messages({
    'boolean.base': `"Is Favourite" should be a boolean value`,
  }),
  contactType: Joi.string()
    .valid('work', 'home', 'personal')
    .required()
    .messages({
      'string.base': `"Contact Type" should be a type of 'text'`,
      'any.only': `"Contact Type" must be one of ['work', 'home', 'personal']`,
      'any.required': `"Contact Type" is a required field`,
    }),
  userId: Joi.string(),
});

export const updateContactSchema = Joi.object({
  name: Joi.string().min(3).max(20).messages({
    'string.base': `"Name" should be a type of 'text'`,
    'string.empty': `"Name" cannot be an empty field`,
    'string.min': `"Name" should have a minimum length of {#limit}`,
    'string.max': `"Name" should have a maximum length of {#limit}`,
  }),
  phoneNumber: Joi.string().min(3).max(20).messages({
    'string.base': `"Phone number" should be a type of 'text'`,
    'string.empty': `"Phone number" cannot be an empty field`,
    'string.min': `"Phone number" should have a minimum length of {#limit}`,
    'string.max': `"Phone number" should have a maximum length of {#limit}`,
  }),
  email: Joi.string().email().min(3).max(20).messages({
    'string.email': `"Email" must be a valid email address`,
    'string.min': `"Email" should have a minimum length of {#limit}`,
    'string.max': `"Email" should have a maximum length of {#limit}`,
  }),
  isFavourite: Joi.boolean().messages({
    'boolean.base': `"Is Favourite" should be a boolean value`,
  }),
  contactType: Joi.string().valid('work', 'home', 'personal').messages({
    'string.base': `"Contact Type" should be a type of 'text'`,
    'any.only': `"Contact Type" must be one of ['work', 'home', 'personal']`,
  }),
  userId: Joi.string(),
});
