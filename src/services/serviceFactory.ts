// import { Model, ModelStatic, FindOptions, CreateOptions, UpdateOptions, DestroyOptions } from 'sequelize';

// export abstract class BaseRepository<T extends Model> {
//     protected model: ModelStatic<T>;

//     constructor(model: ModelStatic<T>) {
//         this.model = model;
//     }

//     /**
//      * Create a new record.
//      */
//     async createOne(data: Partial<T>, options?: CreateOptions): Promise<T> {
//         return this.model.create(data, options);
//     }

//     /**
//      * Delete a record by ID.
//      */
//     async deleteOne(id: number | string, options?: DestroyOptions): Promise<boolean> {
//         const result = await this.model.destroy({
//             where: { id },
//             ...options,
//         });
//         return result > 0;
//     }

//     /**
//      * Delete all records.
//      */
//     async deleteAll(options?: DestroyOptions): Promise<number> {
//         return this.model.destroy({
//             where: {},
//             ...options,
//         });
//     }

//     /**
//      * Get all records.
//      */
//     async getAll(options?: FindOptions): Promise<T[]> {
//         return this.model.findAll(options);
//     }

//     /**
//      * Get a single record by ID.
//      */
//     async getOne(id: number | string, options?: FindOptions): Promise<T | null> {
//         return this.model.findByPk(id, options);
//     }

//     /**
//      * Update a record by ID.
//      */
//     async updateOne(id: number | string, data: Partial<T>, options?: UpdateOptions): Promise<[number, T[]]> {
//         return this.model.update(data, {
//             where: { id },
//             returning: true, // Return the updated record(s)
//             ...options,
//         });
//     }
// }
