import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import logger from './logger.util';

dotenv.config();

const SALT_ROUNDS = Number(process.env.BCRYPT_SALT_ROUNDS) || 10;
const PEPPER = String(process.env.BCRYPT_SECRET_PEPPER) || 'defaultPepperValue';

const hashPassword = async (password: string): Promise<string> => {
    try {
        const pepperedPassword = password + PEPPER;
        const hashedPassword = await bcrypt.hash(pepperedPassword, SALT_ROUNDS);
        return hashedPassword;
    } catch (err) {
        logger.error(err);
        throw new Error('Error hashing password');
    }
};

const verifyPassword = async (
    password: string,
    hash: string
): Promise<boolean> => {
    try {
        return await bcrypt.compare(password + PEPPER, hash);
    } catch (err) {
        logger.error(err);
        throw new Error('Error verifying password');
    }
};

const generateSalt = async (rounds?: number) => {
    const salt = await bcrypt.genSalt(rounds);
    console.log(`Salt generated= ${salt}`);
    return salt;
};

export { hashPassword, verifyPassword, generateSalt };
