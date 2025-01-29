import { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';

import UserRepository from '../repository/user.repository';
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
import { generateAccessToken, generateRefreshToken } from '../utils/jwt.util';
import logger from '../utils/logger.util';

dotenv.config();

const refreshTokens = [];

class authService {
    private userRepository: UserRepository;
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

        const isPasswordValid = await verifyPassword(password, user.password);
        if (!isPasswordValid) {
            logger.error('wrong password');
            throw new UnauthorizedError('Invalid email or password');
        }

        const accessToken = generateAccessToken(
            { sub: user.uuid } /*, roles: string[]*/
        );
        const refreshToken = generateRefreshToken({ sub: user.uuid });
        refreshTokens.push(refreshToken);

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
