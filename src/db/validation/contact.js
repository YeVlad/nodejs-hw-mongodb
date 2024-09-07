import Joi from "joi";

export const createContactSchema = Joi.object({
    name: Joi.string().min(3).max(20).required().messages({
        'string.base': 'Name should be a string',
        'string.min': 'Name should have at least {#limit} characters',
        'string.max': 'Name should have at most {#limit} characters',
        'any.required': 'Name is required',
    }),
    phoneNumber: Joi.string().required()
    .pattern(/^\+?[0-9]{10,15}$/),
    email: Joi.string().email(),
    isFavorite: Joi.boolean(),
    contactType: Joi.string().valid("work", "home", "personal")
    .required().messages({
    'any.required': 'Type of number is required',
    }),

});

export const updateContactSchema = Joi.object({
    name: Joi.string().min(3).max(20),
    phoneNumber: Joi.string().pattern(/^\+?[0-9]{10,15}$/),
    email: Joi.string().email(),
    isFavorite: Joi.boolean(),
    contactType: Joi.string().valid("work", "home", "personal"),
});
