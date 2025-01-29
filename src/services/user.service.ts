import { NotFoundError } from '../errors/notFound.error';
import UserRepository from '../repository/user.repository';
import { Request, Response, NextFunction } from 'express';

class userService {
    private userRepository: UserRepository;
    constructor() {
        this.userRepository = new UserRepository();
    }

    async getAll(req: Request, res: Response, next: NextFunction) {
        const users = await this.userRepository.findAll();
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
