import { Request, Response, NextFunction } from 'express';

/**
 * Payload for JWT tokens.
 * {
  "sub": "488ab02c-d47f-4aae-90a1-77734ede47b1",  // Avoid using email or username (since they can change)
  "role": "admin",  // Avoid including excessive data
  "permissions": 7, // Uses bitwise encoding to minimize size
  "iat": 1738177703,
  "exp": 1738180603,
  "jti": "c4ca4238a0b923820dcc509a6f75849b" // Prevents token replay attacks
}
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
