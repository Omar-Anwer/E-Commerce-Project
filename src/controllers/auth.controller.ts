import { NextFunction, Request, Response } from 'express';
import authService from '../services/auth.service';

class authController {
    async signup(req: Request, res: Response, next: NextFunction) {
        try {
            const user = await authService.signup(req, res, next);
            res.status(201).json({
                success: true,
                message: 'User registered successfully',
                user,
            });
        } catch (error) {
            next(error);  // Pass the error to the global error handler
        }
    }
}

export default new authController();
