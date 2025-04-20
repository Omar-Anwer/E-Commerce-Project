// repositories/baseRepository.ts
import {
    type Attributes,
    type CountOptions,
    type CreateOptions,
    type DestroyOptions,
    type FindOptions,
    type Model,
    type ModelStatic,
    type UpdateOptions,
    type Identifier,
    WhereOptions,
    Transaction,
} from 'sequelize';

import {
    type Col,
    type Fn,
    type Literal,
    type MakeNullishOptional,
} from 'sequelize/types/utils';
import logger from '../utils/logger.util';
export abstract class BaseRepository<T extends Model> {
    constructor(protected model: ModelStatic<T>) {}

    async create(
        data: MakeNullishOptional<T['_creationAttributes']>,
        options?: CreateOptions<Attributes<T>> | undefined
    ): Promise<T> {
        logger.info(data);
        return await this.model.create(data, options);
    }
    //   async create(data: T['_creationAttributes'], transaction?: Transaction) {
    //     return this.model.create(data, { transaction });
    //   }

    async findAll(options?: FindOptions<Attributes<T>>): Promise<T[]> {
        return await this.model.findAll(options);
    }

    async findOne(options?: FindOptions<Attributes<T>>): Promise<T | null> {
        return await this.model.findOne(options);
    }

    async findById(id: Identifier): Promise<T | null> {
        return await this.model.findByPk(id);
    }

    async findByUid(uid: string) {
        return await this.model.findOne({
            where: { uid } as unknown as WhereOptions<Attributes<T>>,
        });
    }
    async delete(options?: DestroyOptions<Attributes<T>>): Promise<number> {
        return await this.model.destroy(options);
    }

    async update(
        data: {
            [key in keyof Attributes<T>]?:
                | Fn
                | Col
                | Literal
                | Attributes<T>[key]
                | undefined;
        },
        options: Omit<UpdateOptions<Attributes<T>>, 'returning'> & {
            returning: Exclude<
                UpdateOptions<Attributes<T>>['returning'],
                undefined | false
            >;
        }
    ): Promise<[affectedCount: number, affectedRows: T[]]> {
        return await this.model.update(data, options);
    }

    async updateById(id: Identifier, data: Partial<T>) {
        return await this.model.update(data, {
            where: { [this.model.primaryKeyAttribute]: id } as WhereOptions<T>,
            returning: true,
        });
    }

    async updateByUId(uid: string, data: Partial<T>) {
        return await this.model.update(data, {
            where: { uid } as unknown as WhereOptions<Attributes<T>>,
            returning: true,
        });
    }

    async deleteById(id: Identifier) {
        return await this.model.destroy({
            where: { [this.model.primaryKeyAttribute]: id } as WhereOptions<T>,
        });
    }
}

// import { Model, ModelStatic, Transaction } from 'sequelize';
// import { QueryBuilder, PaginatedResponse } from './queryBuilder';
// import { QueryBuilderConfig } from './queryBuilder'; // Assuming QueryBuilder is in the same folder

// class BaseRepository<T extends Model> {
//     protected model: ModelStatic<T>;
//     protected queryBuilder: QueryBuilder<T>;

//     constructor(model: ModelStatic<T>, queryConfig: QueryBuilderConfig) {
//         this.model = model;
//         this.queryBuilder = new QueryBuilder<T>(queryConfig);
//     }

//     /**
//      * Save a new record in the database.
//      * @param data - Data to create a new record, matching the model's creation attributes.
//      * @param transaction - Optional transaction object.
//      * @returns The created model instance.
//      */
//     async save(
//         data: T['_creationAttributes'], // Use the model's _creationAttributes type
//         transaction?: Transaction
//     ): Promise<T> {
//         return await this.model.create(data, { transaction });
//     }

//     async update(
//         id: string | number,
//         data: Record<string, any>,
//         transaction?: Transaction
//     ): Promise<T | null> {
//         const record = await this.model.findByPk(id);
//         if (!record) {
//             throw new Error(`Record with ID ${id} not found`);
//         }
//         await record.update(data, { transaction });
//         return record;
//     }

//     async remove(id: string | number, transaction?: Transaction) {
//         const record = await this.model.findByPk(id);
//         if (!record) {
//             throw new Error(`Record with ID ${id} not found`);
//         }
//         await record.destroy({ transaction });
//     }

//     async findById(id: string | number): Promise<T | null> {
//         return await this.model.findByPk(id);
//     }

//     async findAll(
//         queryOptions: Record<string, any>
//     ): Promise<PaginatedResponse<T>> {
//         const { filter, page, pageSize, sort } = queryOptions;

//         if (filter) {
//             this.queryBuilder.filter(filter);
//         }
//         if (page && pageSize) {
//             this.queryBuilder.paginate(page, pageSize);
//         }
//         if (sort) {
//             this.queryBuilder.sort(sort);
//         }

//         return await this.queryBuilder.buildAndExecute(this.model);
//     }
// }

// export default BaseRepository;
