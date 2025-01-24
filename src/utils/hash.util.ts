import bcrypt from 'bcrypt';

// Typically a value between 10 and 12
const SALT_ROUNDS = Number(process.env.BCRYPT_SALT_ROUNDS) || 10;
const PEPPER = String(process.env.BCRYPT_SECRET_PASS) || 'defaultPepperValue';

const hashPassword = async (password: string) => {
    try {
        const pepperedPassword = password + PEPPER;
        //const salt = await generateSalt(SALT_ROUNDS);
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
    // const pepperedPassword = password + PEPPER;
    // const computedHash = await bcrypt.hash(pepperedPassword + salt, SALT_ROUNDS);
    // return (computedHash == hash);
    return await bcrypt.compare(password + PEPPER, hash);
};

const generateSalt = async (rounds?: number) => {
    return await bcrypt.genSalt(rounds);
};

export { hashPassword, verifyPassword, generateSalt };
