import { CustomError } from './custom.error';

export class UnauthorizedError extends CustomError {
    constructor(message: string) {
        super(message, 401); // 401 Unauthorized
    }
}
