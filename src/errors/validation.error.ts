import { CustomError } from './custom.error';

export class ValidationError extends CustomError {
    constructor(message: string) {
        super(message, 400); // 400 Bad Request
    }
}
