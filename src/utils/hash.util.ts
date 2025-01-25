import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config();

// Typically a value between 10 and 12
const SALT_ROUNDS = Number(process.env.BCRYPT_SALT_ROUNDS) || 10;
const PEPPER = String(process.env.BCRYPT_SECRET_PEPPER) || 'defaultPepperValue';

const hashPassword = async (password: string): Promise<string> => {
    try {
        const pepperedPassword = password + PEPPER;
        const hashedPassword = await bcrypt.hash(pepperedPassword, SALT_ROUNDS);
        return hashedPassword;
    } catch (err) {
        console.error(err);
        throw new Error('Error hashing password');
    }
};

const verifyPassword = async (
    password: string,
    hash: string
): Promise<boolean> => {
    const isValid = await bcrypt.compare(password + PEPPER, hash);
    return isValid;
};

const generateSalt = async (rounds?: number) => {
    const salt = await bcrypt.genSalt(rounds);
    console.log(`Salt generated= ${salt}`);
    return salt;
};

export { hashPassword, verifyPassword, generateSalt };
