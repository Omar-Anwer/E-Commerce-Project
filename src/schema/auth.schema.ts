import coreJoi, { ObjectSchema } from 'joi';
import joiDate from '@joi/date';
import joiPassword from 'joi-password-complexity';

const Joi = coreJoi.extend(joiDate) as typeof coreJoi;

// Password complexity settings
const passwordComplexity = {
    min: 8,
    max: 32,
    lowerCase: 1,
    upperCase: 1,
    numeric: 1,
    symbol: 1,
};

export const signupSchema: ObjectSchema = Joi.object({
    firstName: Joi.string().trim().min(2).max(50).required(),
    lastName: Joi.string().trim().min(2).max(50).required(),

    birthDate: Joi.date().format('YYYY-MM-DD').max('now').messages({
        'date.format': 'Birth date must be in YYYY-MM-DD format.',
        'date.max': 'Birth date cannot be in the future.',
    }),
    email: Joi.string()
        .trim()
        .email({ tlds: { allow: ['com', 'net', 'org'] } })
        .required()
        .messages({
            'string.email': 'Email must be a valid email address',
            'string.trim':
                'Email may not contain any spaces at the beginning or end', // seems to be unnecessary
            'string.empty': 'Email is required',
        }),
    password: joiPassword(passwordComplexity).required().messages({
        'passwordComplexity.tooShort':
            'Password must be at least 8 characters.',
        'passwordComplexity.upperCase':
            'Password must contain at least one uppercase letter.',
        'passwordComplexity.lowerCase':
            'Password must contain at least one lowercase letter.',
        'passwordComplexity.numeric':
            'Password must contain at least one number.',
        'passwordComplexity.symbol':
            'Password must contain at least one special character.',
    }),
}); //.strict(); // Prevents ignored rules;

export const loginSchema: ObjectSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
});
