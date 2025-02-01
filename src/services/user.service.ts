import { NotFoundError } from '../errors/notFound.error';
import UserRepository from '../repository/user.repository';
import { Request, Response, NextFunction } from 'express';
import { QueryBuilder } from '../utils/query.util';
import { User } from '../models/user/user.model';

class userService {
    private userRepository: UserRepository;
    constructor() {
        this.userRepository = new UserRepository();
    }

    async getAll(req: Request, res: Response, next: NextFunction) {
        const queryBuilder = new QueryBuilder('users', req.query, User);
        const users = await queryBuilder
            .filter()
            .sort()
            .paginate()
            .search()
            .build();
        //const users = await this.userRepository.findAll();
        return users;
    }

    async getById(req: Request, res: Response, next: NextFunction) {
        const id = req.params.id;
        const user = await this.userRepository.findById(id);
        if (!user) {
            throw new NotFoundError();
        }
        return user;
    }
}

export default new userService();
