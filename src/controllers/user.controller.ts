import { NextFunction, Request, Response } from 'express';
import userService from '../services/user.service';
import { toDto, UserDto } from '../dtos/user.dto';

class userController {
    async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            ///users?id=1&date{from}&sort=-email&page=1&page_size=10&date_min=1999-04-1
            const result = await userService.getAll(req, res, next);
            const { totalItems, totalPages, data } = result;
            const usersDto = data.map((userDto) => toDto(userDto));
            res.status(200).json({
                success: true,
                totalItems,
                totalPages,
                currentPage: req.query.page,
                perPage: req.query.page_size,
                // totalCount: usersDto.length,
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
