import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import UserRepository from '../repository/user.repository';
import { CustomError } from '../errors/custom.error';
import { BadRequestError } from '../errors/badRequest.error';

import { User, UserCreationAttributes } from '../models/user/user.model';

class authService {
    private userRepository: UserRepository;
    //private jwtUtil: JwtUtil;
    constructor() {
        this.userRepository = new UserRepository();
    }

    async checkUserRegistration(
        userCreationAttributes: UserCreationAttributes
    ): Promise<boolean> {
        const existingUser = await this.userRepository.findByEmail(
            userCreationAttributes.email
        );
        return !!existingUser;
    }

    async signup(req: Request, res: Response, next: NextFunction) {
        const { firstName, lastName, birthDate, email, password } = req.body;
        const userCreationAttributes = {
            firstName,
            lastName,
            birthDate,
            email,
            password,
        };

        const isRegisteredUser = await this.checkUserRegistration(
            userCreationAttributes
        );

        if (isRegisteredUser) {
            throw new BadRequestError('User already exists');
        }
        const createdUser = await this.userRepository.save({
            ...userCreationAttributes,
        });
        return createdUser;
    }

    async login(req: Request, res: Response, next: NextFunction) {
        // const { email, password } = req.body;
        // const user = await User.findOne({ where: { email } });
        // if (!user) return res.status(401).json({ message: 'Invalid credentials' });
        // const isMatch = await bcrypt.compare(password, user.password);
        // if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });
        // const accessToken = jwt.sign({ userId: user.id }, process.env.JWT_ACCESS_SECRET, { expiresIn: '15m' });
        // const refreshToken = jwt.sign({ userId: user.id }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' });
        // await Token.create({ token: refreshToken, userId: user.id });
        // res.json({ accessToken, refreshToken });
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
