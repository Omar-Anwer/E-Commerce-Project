import { merge, pick, omit } from 'lodash';
import { User } from '../models/user/user.model';

export interface UserDto {
    id: string;
    email: string;
    firstName?: string;
    lastName?: string;
    birthDate?: string;
}

// export interface User {
//     id: string;
//     email: string;
//     firstName?: string;
//     lastName?: string;
//     birthDate?: string;
// }

/**
 * Converts a Sequelize model instance or raw database object into a UserDto.
 * @param user - The source object (instance of UserModel or plain object) to transform.
 * @returns A UserDto object.
 * @example
 * const user = await User.findByPk(1);
 * const userDto = toDto(user);
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
 * @example
 * const userDto = {
 *       email: 'john.doe@example.com',
 *      firstName: 'John',
 *      lastName: 'Doe',
 *      birthDate: '1990-01-01',
 *   };
 *   const user = fromDto(userDto);
 */
export function fromDto(dto: UserDto): Partial<InstanceType<typeof User>> {
    // Define default values for the model
    const modelDefaults: Partial<InstanceType<typeof User>> = {
        //isVerified: false, // Example: Default to unverified
    };

    // Merge defaults with the DTO
    const modelData = merge({}, modelDefaults, dto);

    // Exclude `id` to prevent unintended updates
    return omit(modelData, ['id']);
}
