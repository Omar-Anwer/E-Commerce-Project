import User from '../models/user/user.model';

const save = async (user: any) => {
    try {
        const newUser = await User.create(user);
        return newUser;
    } catch (error) {
        throw new Error(`Error saving user: ${error}`);
    }
};

const findAll = async () => {
    try {
        const users = await User.findAll();
        return users;
    } catch (error) {
        throw new Error(`Error finding all users: ${error}`);
    }
};

const findById = async (id: string | number) => {
    try {
        const user = await User.findOne({ where: { userId: id } });
        return user;
    } catch (error) {
        throw new Error(`Error finding user for user with ID ${id}: ${error}`);
    }
};

const findByUid = async (userUid: string | number) => {
    try {
        const user = await User.findOne({ where: { uid: userUid } });
        return user;
    } catch (error) {
        throw new Error(
            `Error finding user for user with UID ${userUid}: ${error}`
        );
    }
};
