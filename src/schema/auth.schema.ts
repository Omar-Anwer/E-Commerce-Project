import coreJoi, { ObjectSchema } from 'joi';
import joiDate from '@joi/date';
const Joi = coreJoi.extend(joiDate) as typeof coreJoi;

const PASSWORD_REGEX = new RegExp(
    '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!.@#$%^&*])(?=.{8,})'
);
const signupSchema: ObjectSchema = Joi.object().keys({
    // username: Joi.string().alphanum().min(3).max(10).required(),
    email: Joi.string()
        .required()
        .email({
            tlds: { allow: ['com'] },
        })
        .message('Please enter a valid email address.'),
    password: Joi.string().regex(PASSWORD_REGEX).required().messages({
        'any.only': 'Password must be at least 8 characters',
    }),
    // confirmPassword: Joi.string()
    //     .valid(Joi.ref('password'))
    //     .required()
    //     .messages({ 'any.only': 'Passwords do not match' }),
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    birthDate: Joi.date().format('YYYY-MM-DD'),
});

const loginSchema: ObjectSchema = Joi.object().keys({
    email: Joi.string().required(),
    password: Joi.string().required(),
});

export default signupSchema;
