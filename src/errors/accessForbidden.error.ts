import { CustomError } from './custom.error';

export class ForbiddenError extends CustomError {
    constructor(
        message: string = 'Access Denied. You do not have the required permission.'
    ) {
        super(message, 403);
    }
}
