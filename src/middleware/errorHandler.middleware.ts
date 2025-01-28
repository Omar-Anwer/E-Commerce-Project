import { Request, Response, NextFunction } from 'express';
import { CustomError } from '../errors/custom.error';
import logger from '../utils/logger.util';
import dotenv from 'dotenv';

dotenv.config();

const errorHandlerMiddleware = (
    err: Error | CustomError, 
    _req: Request, 
    res: Response, 
    next: NextFunction
) => {
    // Log the error message
    logger.error(err.message);
    logger.error(err.stack);

    // If the error is an instance of CustomError, use its statusCode, otherwise default to 500
    let statusCode = 500;
    let message = 'Internal server error. Please try again later.';
    let stack: string | undefined;

    if(err instanceof CustomError){
        message = err.message
        statusCode = err.statusCode
    }

    if(process.env.NODE_ENV === 'development'){
        stack = err.stack; // Include stack trace in development
    }

    // Send the error response
    res.status(statusCode).json({
        success: false,
        message: message,
        stack: stack,
    });

    // Ensure we pass control to the next middleware (if necessary)
    //return next();
};

export default errorHandlerMiddleware;



// import { Request, Response, NextFunction } from 'express';
// import { CustomError } from '../errors/custom.error';
// import logger from '../utils/logger.util';
// import dotenv from 'dotenv';

// dotenv.config();

// // interface ErrorHandlerConfig {
// //     logErrors?: boolean;
// // }

// // export const errorHandler = (config: ErrorHandlerConfig = {}) => {
// //     const { logErrors = true } = config;

// //     return (
// //         err: Error | CustomError,
// //         req: Request,
// //         res: Response,
// //         next: NextFunction
// //     ) => {
// //         // Default to 500 (Internal Server Error) if no status code is set
// //         const statusCode = err instanceof CustomError ? err.statusCode : 500;

// //         // Log the error if enabled
// //         if (logErrors) {
// //             //console.error(`[${new Date().toISOString()}] Error: ${err.message}`);
// //             //console.error(err.stack);
// //             logger.error(`${err.message}`);
// //             logger.error(err.stack);
// //         }

// //         // Attach the error to the request object
// //         req.error = {
// //             statusCode,
// //             message: err.message,
// //             stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
// //         };

// //         // Pass control to the next middleware or route handler
// //         next();
// //     };
// // };

// const errorHandlerMiddleware = (
//     err: Error | CustomError,
//     _req: Request,
//     res: Response,
//     next: NextFunction
// ) => {
//     logger.error(err.message);
//     //logger.error(err.stack);

//     const statusCode = err instanceof CustomError ? err.statusCode : 500;
//     res.status(statusCode).json({
//         success: false,
//         message: err.message || 'Internal server error try again later.',
//         stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
//     });
//     return next();
// };

// export default errorHandlerMiddleware;