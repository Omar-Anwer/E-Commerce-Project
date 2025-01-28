export class CustomError extends Error {
    public statusCode: number;
    public isOperational: boolean;

    constructor(
        message: string,
        statusCode: number,
        isOperational: boolean = true
    ) {
        super(message);
        this.statusCode = statusCode;
        this.isOperational = isOperational;

        // Set the prototype to the instance of the class
        Object.setPrototypeOf(this, CustomError.prototype);

        // Capture the stack trace (for development)
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, CustomError);
        }
    }
}
