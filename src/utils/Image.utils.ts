import { generateUUID } from './common.utils';
import sharp from 'sharp';
import { Request, Response, NextFunction } from 'express';

const resizeImage = async (img: any) => {
    const filename = `user-${generateUUID()}-${Date.now().toString}.jpeg`;
    await sharp(img)
        .resize(600, 600)
        .toFormat('jpeg')
        .jpeg({ quality: 90 })
        .toFile(`uploads/users/profile/${filename}`);
};
