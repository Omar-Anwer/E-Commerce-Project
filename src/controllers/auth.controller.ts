import { Request, Response } from 'express';
import logger from '../utils/logger.util';

const signup = async (req: Request, res: Response) => {
    try {
        // Cookies that have not been signed
        console.log('Cookies: ', req.cookies);

        // Cookies that have been signed
        console.log('Signed Cookies: ', req.signedCookies);
        res.status(201).json({
            message: 'Signed up successfully',
        });
    } catch (err) {
        logger.error(err);
        //   next(new Error(`${err}`));
    }
};

export { signup };
