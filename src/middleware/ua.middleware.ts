import { Request, Response, NextFunction } from 'express';
import requestIp from 'request-ip';
import { UAParser } from 'ua-parser-js';

export interface UserDeviceInfo {
    ip: string;
    browser: string;
    browserVersion: string;
    os: string;
    osVersion: string;
    deviceType: string;
    deviceModel: string;
    deviceVendor: string;
    cpu: string;
    userAgent: string;
}

export const captureUserInfo = (
    req: Request,
    res: Response,
    next: NextFunction
): void => {
    const ip = requestIp.getClientIp(req) || 'Unknown';
    const userAgent: string = req.headers['user-agent'] || 'Unknown';

    const parser = new UAParser(userAgent);
    const result = parser.getResult();
    req.userDeviceInfo = {
        ip,
       ... result
    }
    console.log(req);

    // const browser = parser.getBrowser();
    // const os = parser.getOS();
    // const device = parser.getDevice();
    // const cpu = parser.getCPU();

    // req.userDeviceInfo = {
    //     ip,
    //     browser: browser.name || 'Unknown',
    //     browserVersion: browser.version || 'Unknown',
    //     os: os.name || 'Unknown',
    //     osVersion: os.version || 'Unknown',
    //     deviceType: device.type || 'Desktop',
    //     deviceModel: device.model || 'Unknown',
    //     deviceVendor: device.vendor || 'Unknown',
    //     cpu: cpu.architecture || 'Unknown',
    //     userAgent,
    // };
    next();
};
