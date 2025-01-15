import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { JwtPayload, JwtUtil } from '../types/jwt.type';
import dotenv from 'dotenv';

dotenv.config();

// Environment variables
const JWT_SECRET = process.env.JWT_SECRET;
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;
const JWT_ACCESS_EXPIRY = String(process.env.JWT_ACCESS_EXPIRY) || '15m';
const JWT_REFRESH_EXPIRY = String(process.env.JWT_REFRESH_EXPIRY) || '7d';

// Check for missing required environment variables
if (!JWT_SECRET || !JWT_REFRESH_SECRET) {
    throw new Error(
        'Missing JWT_SECRET or JWT_REFRESH_SECRET in environment variables'
    );
}

// Utility Implementation
const jwtUtil: JwtUtil = {
    /**
     * Verify a token (access or refresh).
     * @param {string} token - The token to verify.
     * @param {boolean} isRefresh - Whether the token is a refresh token.
     * @returns {Object} - The decoded payload.
     */
    //const token = req.headers['x-access-token']; // assuming the token is in the x-access-token header
    verifyToken: (token: string, isRefresh = false): JwtPayload => {
        const secret = isRefresh ? JWT_REFRESH_SECRET : JWT_SECRET;
        try {
            // const public key = fs.readFileSync('./public.pem')
            // pass token + public + algorithm(RS256)
            return jwt.verify(token, secret) as JwtPayload;
        } catch (err) {
            throw new Error('Invalid or expired token');
        }
    },

    // verifyAuthority() => {
    //     // verify if the user is authorized to access the route
    //     // if not, throw an error or redirect to the login page
    // }

    // verifyRole() => {
    //     // verify if the user is authorized to access the route
    //     // if not, throw an error or redirect to the login page
    // }

    /**
     * Generate an access token.
     * @param {Object} payload - The payload to include in the token.
     * @returns {string} - The generated access token.
     */
    generateAccessToken: (payload: JwtPayload): string => {
        // generate normal user token or admin token
        // const privateKey = fs.readFileSync('admin_private.pem')
        //pass payload + privateKey + passphrase + algorithm(RS256)
        return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_ACCESS_EXPIRY });
    },

    /**
     * Generate a refresh token.
     * @param {Object} payload - The payload to include in the token.
     * @returns {string} - The generated refresh token.
     */
    generateRefreshToken: (payload: JwtPayload): string => {
        return jwt.sign(payload, JWT_REFRESH_SECRET, {
            expiresIn: JWT_REFRESH_EXPIRY,
        });
    },

    /**
     * Middleware to protect routes.
     * @param {Request} req - Express request object.
     * @param {Response} res - Express response object.
     * @param {Function} next - Next middleware function.
     */
    protectRoute: (req: Request, res: Response, next: NextFunction): void => {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            res.status(401).json({
                message: 'Access token is missing or invalid',
            });
            return;
        }

        const token = authHeader.split(' ')[1];

        try {
            const decoded = jwtUtil.verifyToken(token);
            //req.user = decoded; // Attach user information to request (requires extending Request type)
            next();
        } catch (err) {
            res.status(401).json({ message: (err as Error).message });
        }
    },

    /**
     * Handle token refresh.
     * @param {string} refreshToken - The refresh token.
     * @returns {Object} - An object containing new access and refresh tokens.
     */
    handleRefreshToken: (
        refreshToken: string
    ): { accessToken: string; refreshToken: string } => {
        try {
            const decoded = jwtUtil.verifyToken(refreshToken, true);
            const decodedId = decoded.id;
            const newAccessToken = jwtUtil.generateAccessToken({
                id: decodedId,
            });
            const newRefreshToken = jwtUtil.generateRefreshToken({
                id: decodedId,
            });
            return {
                accessToken: newAccessToken,
                refreshToken: newRefreshToken,
            };
        } catch (err) {
            throw new Error('Invalid or expired refresh token');
        }
    },
};

export default jwtUtil;
