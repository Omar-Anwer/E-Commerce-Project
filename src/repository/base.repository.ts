import { Model, ModelStatic, Transaction } from 'sequelize';
import { QueryBuilder, PaginatedResponse } from './queryBuilder';
import { QueryBuilderConfig } from './queryBuilder'; // Assuming QueryBuilder is in the same folder

class BaseRepository<T extends Model> {
    protected model: ModelStatic<T>;
    protected queryBuilder: QueryBuilder<T>;

    constructor(model: ModelStatic<T>, queryConfig: QueryBuilderConfig) {
        this.model = model;
        this.queryBuilder = new QueryBuilder<T>(queryConfig);
    }

    /**
     * Save a new record in the database.
     * @param data - Data to create a new record, matching the model's creation attributes.
     * @param transaction - Optional transaction object.
     * @returns The created model instance.
     */
    async save(
        data: T['_creationAttributes'], // Use the model's _creationAttributes type
        transaction?: Transaction
    ): Promise<T> {
        return await this.model.create(data, { transaction });
    }

    async update(
        id: string | number,
        data: Record<string, any>,
        transaction?: Transaction
    ): Promise<T | null> {
        const record = await this.model.findByPk(id);
        if (!record) {
            throw new Error(`Record with ID ${id} not found`);
        }
        await record.update(data, { transaction });
        return record;
    }

    async remove(id: string | number, transaction?: Transaction) {
        const record = await this.model.findByPk(id);
        if (!record) {
            throw new Error(`Record with ID ${id} not found`);
        }
        await record.destroy({ transaction });
    }

    async findById(id: string | number): Promise<T | null> {
        return await this.model.findByPk(id);
    }

    async findAll(
        queryOptions: Record<string, any>
    ): Promise<PaginatedResponse<T>> {
        const { filter, page, pageSize, sort } = queryOptions;

        if (filter) {
            this.queryBuilder.filter(filter);
        }
        if (page && pageSize) {
            this.queryBuilder.paginate(page, pageSize);
        }
        if (sort) {
            this.queryBuilder.sort(sort);
        }

        return await this.queryBuilder.buildAndExecute(this.model);
    }
}

export default BaseRepository;
