import bcrypt from 'bcrypt';

// Typically a value between 10 and 12
const saltRounds = Number(process.env.BCRYPT_SALT_ROUNDS) || 10;
const pepper = String(process.env.BCRYPT_SECRET_PASS) || '';

const hashPassword = async (password: string): Promise<string> => {
    return await bcrypt.hash(password + pepper, saltRounds);
};

const verifyPassword = async (
    password: string,
    hash: string
): Promise<boolean> => {
    return await bcrypt.compare(password + pepper, hash);
};

const generateSalt = async (rounds?: number) => {
    return await bcrypt.genSalt(rounds);
};

export { hashPassword, verifyPassword, generateSalt };
