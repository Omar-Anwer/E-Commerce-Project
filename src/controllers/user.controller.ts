import { NextFunction, Request, Response } from 'express';
import userService from '../services/user.service';
import { toDto, UserDto } from '../dtos/user.dto';

class userController {
    async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            const users = await userService.getAll(req, res, next);
            const usersDto = users.map((userDto) => toDto(userDto));
            res.status(200).json({
                success: true,
                data: usersDto,
            });
        } catch (error) {
            next(error);
        }
    }

    async getById(req: Request, res: Response, next: NextFunction) {
        try {
            const user = await userService.getById(req, res, next);
            const userDto = toDto(user);
            res.status(200).json({
                success: true,
                data: userDto,
            });
        } catch (error) {
            next(error);
        }
    }
}

export default new userController();
