import { Request, Response, NextFunction } from 'express';

/**
 * Payload for JWT tokens.
 */
export interface JwtPayload {
    sub: any; // Adjust as per your payload structure (e.g., user ID)
    [key: string]: any; // Support for additional payload properties
}

/**
 * Utility interface for JWT-related functions.
 */
export interface JwtUtil {
    generateAccessToken: (payload: JwtPayload) => string;
    generateRefreshToken: (payload: JwtPayload) => string;
    verifyToken: (token: string, isRefresh?: boolean) => JwtPayload;
    // protectRoute: (req: Request, res: Response, next: NextFunction) => void;
    // handleRefreshToken: (refreshToken: string) => {
    //     accessToken: string;
    //     refreshToken: string;
    // };
}
