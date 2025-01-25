import { CustomError } from './custom.error';

export class ForbiddenError extends CustomError {
    constructor(message: string = 'Access forbidden') {
        super(message, 403);
    }
}
