import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { JwtPayload, JwtUtil } from '../types/jwt.type';
import dotenv from 'dotenv';
import { UnauthorizedError } from '../errors/unauthorized.error';
import { validateEnvVars } from './validateEnvVars';
import { ForbiddenError } from '../errors/accessForbidden.error';
import logger from './logger.util';

dotenv.config();

// Environment variables
const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET || 'secret';
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || 'secret';
const JWT_ACCESS_EXPIRY = process.env.JWT_ACCESS_EXPIRY || '15m';
const JWT_REFRESH_EXPIRY = process.env.JWT_REFRESH_EXPIRY || '7d';


export const verifyToken = (token: string, isRefresh = false): any => {
    try {
        const SECRET = isRefresh ? JWT_REFRESH_SECRET : JWT_ACCESS_SECRET;
        const decodedPayload = jwt.verify(token, SECRET);
        // const public key = fs.readFileSync('./public.pem')
        // pass token + public + algorithm(RS256)
        // return jwt.verify(token, secret) as JwtPayload;
        logger.info(`Decoded JWT: ${JSON.stringify(decodedPayload)}`);
        return decodedPayload;
    } catch (err) {
        logger.error(`JWT Verification Failed: ${err}`);
        throw new ForbiddenError(`${err}`);
    }
};

// verifyAuthority() => {
//     // verify if the user is authorized to access the route
//     // if not, throw an error or redirect to the login page
// }

// verifyRole() => {
//     // verify if the user is authorized to access the route
//     // if not, throw an error or redirect to the login page
// }


export const generateAccessToken = (
    payload: JwtPayload,
    roles?: string[]
): string => {
    // generate normal user token or admin token
    // const privateKey = fs.readFileSync('admin_private.pem')

    //pass payload + privateKey + passphrase + algorithm(RS256)
    const SECRET = JWT_ACCESS_SECRET;
    payload['jti'] = crypto.randomUUID(); // Unique token ID
    return jwt.sign(payload, SECRET, {
        expiresIn: JWT_ACCESS_EXPIRY,
        algorithm: 'HS256',
    });
};

/**
 * Generate a refresh token.
 * @param {Object} payload - The payload to include in the token.
 * @returns {string} - The generated refresh token.
 */
export const generateRefreshToken = (payload: JwtPayload): string => {
    return jwt.sign(payload, JWT_REFRESH_SECRET, {
        expiresIn: JWT_REFRESH_EXPIRY,
    });
};

// /**
//  * Handle token refresh.
//  * @param {string} refreshToken - The refresh token.
//  * @returns {Object} - An object containing new access and refresh tokens.
//  */
// handleRefreshToken: (
//     refreshToken: string
// ): { accessToken: string; refreshToken: string } => {
//     try {
//         const decoded = jwtUtil.verifyToken(refreshToken, true);
//         const decodedId = decoded.id;
//         const newAccessToken = jwtUtil.generateAccessToken({
//             id: decodedId,
//         });
//         const newRefreshToken = jwtUtil.generateRefreshToken({
//             id: decodedId,
//         });
//         return {
//             accessToken: newAccessToken,
//             refreshToken: newRefreshToken,
//         };
//     } catch (err) {
//         throw new Error('Invalid or expired refresh token');
//     }
// },

// };

// export default jwtUtil;
