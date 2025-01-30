import { Request, Response, NextFunction } from 'express';
import { UnauthorizedError } from '../errors/unauthorized.error';
import { verifyToken } from '../utils/jwt.util';
import logger from '../utils/logger.util';
import { ForbiddenError } from '../errors/accessForbidden.error';
import { PERMISSIONS } from '../config/roles';

export const authenticate = (
    req: Request,
    res: Response,
    next: NextFunction
): void => {
    try {
        if (req.method === 'OPTIONS') {
            next();
        }
        //const authHeader = req.headers['authorization'];
        //req.headers['x-auth-token'] || req.cookies.token;
        //const token = authHeader && authHeader.split(' ')[1]; // Bearer <token>
        const token =
            req.header('Authorization')?.replace('Bearer ', '') ||
            req.headers['x-auth-token'] ||
            req.cookies?.token;
        logger.info(`token: ${token}`);

        if (!token) {
            throw new UnauthorizedError('Access denied. No token provided.');
        }
        const decodedPayload = verifyToken(token);
        if (!decodedPayload) {
            throw new UnauthorizedError('Invalid token.');
        }
        // const user = await User.findByPk(decoded.userId, {
        //     include: [{ model: Role, include: [Permission] }],
        //   });
        //   if (!user) return res.status(404).json({ message: 'User not found.' });

        //req.user = decodedPayload; // Attach user data to request
        next();
    } catch (error) {
        logger.error(error);
        throw new UnauthorizedError();
    }
};

// export const authorize = (permission: string) => {
//     return async (req: Request, res: Response, next: NextFunction) => {
//         if (!req.user) {
//             throw new ForbiddenError('Forbidden. User not authenticated.');
//         }
//         // const user = req.user as User;
//         // const userPermissions = req.user.permissions || [];

//         //   const hasPermission = user.roles.some((role) =>
//         //     role.permissions.some((perm) => perm.name === permission)
//         //   );
//         // Check if the user has at least one of the required permissions
//         const hasPermission = user.roles.some((role) =>
//             role.permissions.some((perm) => permissions.includes(perm.name))
//         );

// if (!Permissions.hasPermission(req.user.permissionChunks, requiredCode)) {
//     return res.status(403).json({ message: 'Forbidden' });
//  }

//         if (!hasPermission) {
//             throw new ForbiddenError('Forbidden. Insufficient permissions.');
//         }

//         next();
//     };
// };

//   // Helper methods
//   static getChunkAndBit(code: number): { chunk: number, bit: number } {
//     return {
//       chunk: Math.floor(code / MAX_BITS_PER_CHUNK),
//       bit: code % MAX_BITS_PER_CHUNK
//     };
//   }

//   static hasPermission(userFlags: number[], code: number): boolean {
//     const { chunk, bit } = this.getChunkAndBit(code);
//     return !!userFlags[chunk] && (userFlags[chunk] & (1 << bit)) !== 0;
//   }

//   static addPermission(flags: number[], code: number): number[] {
//     const { chunk, bit } = this.getChunkAndBit(code);
//     const newFlags = [...flags];
//     newFlags[chunk] = (newFlags[chunk] || 0) | (1 << bit);
//     return newFlags;
//   }

//   static removePermission(flags: number[], code: number): number[] {
//     const { chunk, bit } = this.getChunkAndBit(code);
//     if (chunk >= flags.length) return flags;
//     const newFlags = [...flags];
//     newFlags[chunk] &= ~(1 << bit);
//     return newFlags;
//   }
// }
