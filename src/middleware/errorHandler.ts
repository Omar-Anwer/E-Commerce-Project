// src/middleware/errorHandler.ts
import { Request, Response, NextFunction } from 'express';
import { CustomError } from '../errors/custom.error';
import logger from '../utils/logger.util';
import dotenv from 'dotenv';

dotenv.config();

// interface ErrorHandlerConfig {
//     logErrors?: boolean;
// }

// export const errorHandler = (config: ErrorHandlerConfig = {}) => {
//     const { logErrors = true } = config;

//     return (
//         err: Error | CustomError,
//         req: Request,
//         res: Response,
//         next: NextFunction
//     ) => {
//         // Default to 500 (Internal Server Error) if no status code is set
//         const statusCode = err instanceof CustomError ? err.statusCode : 500;

//         // Log the error if enabled
//         if (logErrors) {
//             //console.error(`[${new Date().toISOString()}] Error: ${err.message}`);
//             //console.error(err.stack);
//             logger.error(`${err.message}`);
//             logger.error(err.stack);
//         }

//         // Attach the error to the request object
//         req.error = {
//             statusCode,
//             message: err.message,
//             stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
//         };

//         // Pass control to the next middleware or route handler
//         next();
//     };
// };

const errorHandlerMiddleware = (
    err: Error | CustomError,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    //logger.error(err);
    logger.error(err.message);
    logger.error(err.stack);

    const statusCode = err instanceof CustomError ? err.statusCode : 500;
    res.status(statusCode).json({
        success: false,
        message: err.message || 'Internal server error try again later.',
        stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
    });
    return next();
};

export default errorHandlerMiddleware;

// interface ErrorResponse {
//     success: boolean;
//     message: string;
//     stack?: string;
// }

// interface ErrorHandlerConfig {
//     logErrors?: boolean;
//     includeStackTrace?: boolean;
// }

// export const errorHandler = (config: ErrorHandlerConfig = {}) => {
//     const { logErrors = true, includeStackTrace = false } = config;

//     return (
//         err: Error | CustomError,
//         req: Request,
//         res: Response,
//         next: NextFunction
//     ) => {
//         // Default to 500 (Internal Server Error) if no status code is set
//         const statusCode = err instanceof CustomError ? err.statusCode : 500;

//         // Log the error if enabled
//         if (logErrors) {
//             logger.error(`[${new Date().toISOString()}] Error: ${err.message}`);
//             logger.error(err.stack);
//         }

//         // Prepare the error response
//         const errorResponse: ErrorResponse = {
//             success: false,
//             message: err.message,
//         };

//         // Include stack trace in development mode
//         if (includeStackTrace && process.env.NODE_ENV === 'development') {
//             errorResponse.stack = err.stack;
//         }

//         // Send the response
//         res.status(statusCode).json(errorResponse);
//     };
// };
