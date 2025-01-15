import { Request, Response } from 'express';
import logger from '../utils/logger.util';

const signup = async (req: Request, res: Response) => {
    try {
        res.status(201).json({
            message: 'Signed up successfully',
        });
    } catch (err) {
        logger.error(err);
        //   next(new Error(`${err}`));
    }
};

export { signup };
