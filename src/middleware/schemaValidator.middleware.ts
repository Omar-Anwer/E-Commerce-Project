import { Request, Response, NextFunction, RequestHandler } from 'express';
import { Schema } from 'joi';
import { ValidationError } from '../errors/validation.error';

// Function to trim all string fields in an object
const trimStringFields = (obj: any) => {
    if (obj && typeof obj === 'object') {
        for (const key in obj) {
            if (typeof obj[key] === 'string') {
                obj[key] = obj[key].trim();
            }
        }
    }
};

// Generic validation middleware with trimming
const validateWithTrim = (schema: Schema, source: 'body' | 'query'): RequestHandler => {
    return (req: Request, res: Response, next: NextFunction) => {
        trimStringFields(req[source]); // Trim before validation

        const { error } = schema.validate(req[source], { 
            abortEarly: false, 
            stripUnknown: true  // Remove unknown fields
        });

        if (error) {
            return next(new ValidationError(error.details.map(err => err.message).join(', ')));
        }

        next();
    };
};

export const validateBodyMiddleware = (schema: Schema) => validateWithTrim(schema, 'body');
export const validateQueryMiddleware = (schema: Schema) => validateWithTrim(schema, 'query');


// import { Request, Response, NextFunction, RequestHandler } from 'express';
// import { Schema } from 'joi';
// import { ValidationError } from '../errors/validation.error';

// const validateBodyMiddleware = (schema: Schema): RequestHandler => {
//     return (req: Request, res: Response, next: NextFunction) => {
//         const { error } = schema.validate(req.body);
//         if (error) {
//             return next(new ValidationError(`${error.details[0].message}`));
//         }
//         next();
//     };
// };

// const validateQueryMiddleware = (schema: Schema): RequestHandler => {
//     return (req: Request, res: Response, next: NextFunction) => {
//         const { error } = schema.validate(req.query);
//         if (error) {
//             return next(new ValidationError(`${error.details[0].message}`));
//         }
//         next();
//     };
// };

// export { validateBodyMiddleware, validateQueryMiddleware };

// // interface ValidationError {
// //     message: string;
// //     type: string;
// // }

// // interface JoiError {
// //     status: string;
// //     error: {
// //         original: unknown;
// //         details: ValidationError[];
// //     };
// // }

// // interface CustomError {
// //     status: string;
// //     error: string;
// // }

// // const supportedMethods = ['post', 'put', 'patch', 'delete'];

// // const validationOptions = {
// //     abortEarly: false,
// //     allowUnknown: false,
// //     stripUnknown: false,
// // };

// // const schemaValidator = (bodySchema: ObjectSchema) => {
// //     const useJoiError = false;

// //     return (req: Request, res: Response, next: NextFunction) => {
// //         const method = req.method.toLowerCase();

// //         if (!supportedMethods.includes(method)) {
// //             return next();
// //         }

// //         const { error } = bodySchema.validate(req.body, validationOptions);

// //         if (error) {
// //             const customError: CustomError = {
// //                 status: 'failed',
// //                 error: 'Invalid request. Please review request and try again.',
// //             };

// //             const joiError: JoiError = {
// //                 status: 'failed',
// //                 error: {
// //                     original: error._original,
// //                     details: error.details.map(
// //                         ({ message, type }: ValidationError) => ({
// //                             message: message.replace(/['"]/g, ''),
// //                             type,
// //                         })
// //                     ),
// //                 },
// //             };

// //             return res.status(400).json(useJoiError ? joiError : customError);
// //         }

// //         // validation successful
// //         next();
// //     };
// // };

// // export default schemaValidator;
