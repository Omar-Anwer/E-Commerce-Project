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
     * @param data - Data to create a new record, should match model creation attributes.
     * @param transaction - Optional transaction object.
     * @returns The created model instance.
     */
    async create(
        data: T['_creationAttributes'], // Use the creation attributes type for the model
        transaction?: Transaction
    ): Promise<T> {
        return await this.model.create(data, { transaction });
    }

    /**
     * Update a record by primary key.
     * @param id - The ID of the record to update.
     * @param data - The new data to update.
     * @param transaction - Optional transaction object.
     * @returns The updated model instance.
     */
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

    /**
     * Remove a record by primary key.
     * @param id - The ID of the record to remove.
     * @param transaction - Optional transaction object.
     * @returns The number of affected rows (1 if deleted, 0 if not found).
     */
    async remove(id: string | number, transaction?: Transaction) {
        const record = await this.model.findByPk(id);
        if (!record) {
            throw new Error(`Record with ID ${id} not found`);
        }
        await record.destroy({ transaction });
    }

    /**
     * Get a single record by primary key.
     * @param id - The ID of the record to find.
     * @returns The found model instance or null.
     */
    async findById(id: string | number): Promise<T | null> {
        return await this.model.findByPk(id);
    }

    /**
     * Get all records with optional filtering, sorting, and pagination.
     * @param queryOptions - Filtering, sorting, and pagination options.
     * @returns Paginated result.
     */
    async findAll(
        queryOptions: Record<string, any>
    ): Promise<PaginatedResponse<T>> {
        const { filter, page, pageSize, sort } = queryOptions;

        // Apply filter
        if (filter) {
            this.queryBuilder.filter(filter);
        }

        // Apply pagination
        if (page && pageSize) {
            this.queryBuilder.paginate(page, pageSize);
        }

        // Apply sorting
        if (sort) {
            this.queryBuilder.sort(sort);
        }

        // Execute query
        return await this.queryBuilder.buildAndExecute(this.model);
    }
}

export default BaseRepository;
