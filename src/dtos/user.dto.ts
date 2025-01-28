import { merge, pick, omit } from 'lodash';
import { User, UserCreationAttributes } from '../models/user/user.model';

export interface UserDto {
    id?: string;
    email: string;
    firstName?: string;
    lastName?: string;
    birthDate?: string;
}

/**
 * Converts a Sequelize model instance or raw database object into a UserDto.
 * @param user - The source object (instance of UserModel or plain object) to transform.
 * @returns A UserDto object.
 */
export function toDto(user: InstanceType<typeof User>): UserDto {
    const userData = user.toJSON(); // Convert Sequelize instance to plain object
    const pickedUser = pick(userData, [
        'id',
        'email',
        'firstName',
        'lastName',
        'birthDate',
    ]);
    return pickedUser;
}

/**
 * Converts a UserDto into a format compatible with a Sequelize model.
 * Default values for the model are defined within the function.
 * @param dto - The UserDto object to transform.
 * @returns A Sequelize model-compatible object.
 * const defaultConfig = { theme: 'dark', language: 'en' };
const userConfig = { language: 'fr' };

const config = merge({}, defaultConfig, userConfig);
console.log(config);  // Output: { theme: 'dark', language: 'fr' }
 */
export function fromDto(userDto: UserDto): Partial<InstanceType<typeof User>> {
    // Define default values for the model
    const userModel: Partial<InstanceType<typeof User>> = {
        //isVerified: false, // Example: Default to unverified
    };
    const modelData = merge({}, userModel, userDto);
    return modelData;
    // Exclude `id` to prevent unintended updates
    //return omit(modelData, ['id']);
}

export function mapToCreationAttributes(user: any): UserCreationAttributes {
    // Map the User instance to the UserCreationAttributes format
    const userData: UserCreationAttributes = pick(user, [
        'id',
        'email',
        'firstName',
        'lastName',
        'birthDate',
        'password',
    ]);
    return userData;
}
