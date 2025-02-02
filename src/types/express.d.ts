import { Request } from 'express';
import { UserDeviceInfo } from '../middleware/captureUserInfo'; // Import your interface

declare module 'express-serve-static-core' {
    interface Request {
        userDeviceInfo?: UserDeviceInfo;
    }
}