import { NextFunction, Request, Response } from 'express';
import authService from '../services/auth.service';
import { toDto, UserDto } from '../dtos/user.dto';

class authController {
    async register(req: Request, res: Response, next: NextFunction) {
        try {
            const user = await authService.register(req, res, next);
            const userDto = toDto(user);
            res.status(201).json({
                success: true,
                message: 'User registered successfully',
                data: userDto,
            });
        } catch (error) {
            next(error);
        }
    }

    async login(req: Request, res: Response, next: NextFunction) {
        try {
            const data = await authService.login(req, res, next);
            res.status(200).json({
                success: true,
                message: 'Logged in successfully',
                data,
            });
        } catch (error) {
            next(error);
        }
    }

    async logout(req: Request, res: Response, next: NextFunction) {
        try {
            await authService.logout(req, res, next);
            res.status(200).json({ message: 'Logged out successfully' });
        } catch (error) {
            next(error);
        }
    }
}

export default new authController();
