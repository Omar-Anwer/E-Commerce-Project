import { NextFunction, Request, Response } from 'express';
import authService from '../services/auth.service';
import { toDto, UserDto } from '../dtos/user.dto';

class authController {
    async signup(req: Request, res: Response, next: NextFunction) {
        try {
            const user = await authService.signup(req, res, next);
            const userDto: UserDto = toDto(user);
            res.status(201).json({
                success: true,
                message: 'User registered successfully',
                data: userDto,
            });
        } catch (error) {
            next(error);
        }
    }
}

export default new authController();
