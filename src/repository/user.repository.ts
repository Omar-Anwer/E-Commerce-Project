import { UserModel, User } from '../models/user/user.model'; // Import the UserModel interface
import BaseRepository from './base.repository'; // Import BaseRepository
import { QueryBuilderConfig } from './queryBuilder';

const userQueryConfig: QueryBuilderConfig = {
    defaultLimit: 10,
    maxLimit: 50,
    allowedFilterOperators: ['gt', 'lt', 'gte', 'lte', 'eq', 'like'],
    allowedSortDirections: ['asc', 'desc'],
};

// Define the UserRepository class
class UserRepository extends BaseRepository<UserModel> {
    constructor() {
        // Pass the User model and queryConfig to the BaseRepository constructor
        super(User, userQueryConfig);
    }

    // Example of a specific method for the User model
    async findByEmail(email: string): Promise<UserModel | null> {
        return await this.model.findOne({ where: { email } });
    }

    // You can add more user-specific methods here
    async findByUuid(uuid: string): Promise<UserModel | null> {
        return await this.model.findOne({ where: { uuid } });
    }
}

export default UserRepository;

// import User from '../models/user/user.model';
// import { Transaction } from 'sequelize';
// import BaseRepository from './base.repository';
// import { QueryBuilderConfig } from './queryBuilder';

// /**
//  * Save a new user to the database.
//  * @param user - The user data to save.
//  * @returns The newly created user.
//  */
// export const save = async (
//     user: InstanceType<typeof User>,
//     transaction?: Transaction
// ) => {
//     try {
//         const newUser = await User.create(user, { transaction });
//         return newUser;
//     } catch (error) {
//         throw new Error(`Error saving user: ${error}`);
//     }
// };

// /**
//  * Update a user's data.
//  * @param user - The user instance to update.
//  * @param updateData - The data to update.
//  * @param transaction - An optional transaction for atomic updates.
//  * @returns The updated user.
//  */
// export const update = async (
//     user: InstanceType<typeof User>,
//     updateData: Partial<Omit<InstanceType<typeof User>, 'id'>>, // Omit `id` from being updated
//     transaction?: Transaction
// ) => {
//     try {
//         // Only update properties that are actually present in the `updateData` object
//         await user.update(updateData, { transaction });
//         return user; // Return the updated user instance
//     } catch (error) {
//         throw new Error(`Error updating user with ID ${user.id}: ${error}`);
//     }
// };

// /**
//  * Delete a user by their ID.
//  * @param userId - The ID of the user to delete.
//  * @returns A success message or error.
//  */
// export const remove = async (
//     user: InstanceType<typeof User>,
//     transaction?: Transaction
// ) => {
//     try {
//         await user.destroy({ transaction });
//     } catch (error) {
//         throw new Error(`Error deleting user with ID ${user.id}: ${error}`);
//     }
// };

// /**
//  * Find all users in the database.
//  * @returns An array of users.
//  */
// const findAll = async () => {
//     try {
//         const users = await User.findAll();
//         return users;
//     } catch (error) {
//         throw new Error(`Error finding all users: ${error}`);
//     }
// };

// /**
//  * Find a user by their ID.
//  * @param userId - The ID of the user to find.
//  * @returns The user if found, or null.
//  */
// const findById = async (userId: string | number) => {
//     try {
//         const user = await User.findOne({ where: { id: userId } });
//         return user;
//     } catch (error) {
//         throw new Error(
//             `Error finding user for user with ID ${userId}: ${error}`
//         );
//     }
// };

// /**
//  * Find a user by their UUID.
//  * @param userUuid - The UUID of the user to find.
//  * @returns The user if found, or null.
//  */
// export const findByUuid = async (userUuid: string) => {
//     try {
//         const user = await User.findOne({ where: { uuid: userUuid } });
//         return user;
//     } catch (error) {
//         throw new Error(`Error finding user with UUID ${userUuid}: ${error}`);
//     }
// };

// /**
//  * Check if a user exists by their ID.
//  * @param id - The ID of the user to check.
//  * @returns True if the user exists, otherwise false.
//  */
// export const isExists = async (id: string | number): Promise<boolean> => {
//     try {
//         const user = await User.findByPk(id, { attributes: ['id'], raw: true });
//         return !!user;
//     } catch (error) {
//         throw new Error(
//             `Error checking if user exists with ID ${id}: ${error}`
//         );
//     }
// };

// /**
//  * Count all users.
//  * @returns The total number of users.
//  */
// export const countAll = async (): Promise<number> => {
//     try {
//         const count = await User.count();
//         return count;
//     } catch (error) {
//         throw new Error(`Error counting all users: ${error}`);
//     }
// };
