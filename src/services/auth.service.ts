import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

import UserRepository from '../repository/user.repository';
import { CustomError } from '../errors/custom.error';
import { BadRequestError } from '../errors/badRequest.error';

import { User, UserCreationAttributes } from '../models/user/user.model';
import {
    fromDto,
    mapToCreationAttributes,
    mapToUser,
    toDto,
} from '../dtos/user.dto';
import { UnauthorizedError } from '../errors/unauthorized.error';
import { verifyPassword } from '../utils/hash.util';
import logger from '../utils/logger.util';

dotenv.config();
class authService {
    private userRepository: UserRepository;
    //private jwtUtil: JwtUtil;
    constructor() {
        this.userRepository = new UserRepository();
    }

    private async checkUserExist(user: User) {
        const isUserExists = await this.userRepository.exists(user);
        return Boolean(isUserExists);
    }
    private async validateUserRegistration(user: User) {
        const isUserExists = await this.checkUserExist(user);
        if (isUserExists) {
            throw new BadRequestError('User already exists');
        }
    }

    async register(req: Request, res: Response, next: NextFunction) {
        const user = mapToUser(req.body) as User;
        await this.validateUserRegistration(user);
        const createdUser = await this.userRepository.create({ ...user });
        return createdUser;
    }

    async login(req: Request, res: Response, next: NextFunction) {
        const { email, password } = req.body;

        const user = await this.userRepository.findByEmail(email);
        if (!user) {
            logger.error('wrong email');
            throw new UnauthorizedError('Invalid email or password');
        }

        const isValid = await verifyPassword(password, user.password);
        if (!isValid) {
            logger.error('wrong password');
            throw new UnauthorizedError('Invalid email or password');
        }

        const accessToken = jwt.sign(
            { userId: user.id },
            'process.env.JWT_ACCESS_SECRET',
            { expiresIn: '15m' }
        );
        const refreshToken = jwt.sign(
            { userId: user.id },
            'process.env.REFRESH_TOKEN_SECRET',
            { expiresIn: '7d' }
        );
        // await Token.create({ token: refreshToken, userId: user.id });

        return { accessToken, refreshToken };
    }

    async logout(req: Request, res: Response, next: NextFunction) {
        //     const { refreshToken } = req.body;
        //     await Token.update({ isRevoked: true }, { where: { token: refreshToken } });
        //     res.status(200).json({ message: 'Logged out successfully' });
    }

    async refresh(req: Request, res: Response, next: NextFunction) {
        //     const { refreshToken } = req.body;
        //     if (!refreshToken) return res.status(400).json({ message: 'Refresh token required' });
        //     const storedToken = await Token.findOne({ where: { token: refreshToken, isRevoked: false } });
        //     if (!storedToken) return res.status(403).json({ message: 'Invalid refresh token' });
        //     jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, payload) => {
        //       if (err) return res.status(403).json({ message: 'Invalid refresh token' });
        //       const newAccessToken = jwt.sign({ userId: payload.userId }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' });
        //       res.json({ accessToken: newAccessToken });
        //     });
    }

    async resetPassword(req: Request, res: Response, next: NextFunction) {}
}

export default new authService();
