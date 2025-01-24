import {
    Op,
    WhereOptions,
    Order,
    FindAndCountOptions,
    Model,
    ModelStatic,
} from 'sequelize';

interface QueryBuilderConfig {
    defaultLimit?: number;
    maxLimit?: number;
    allowedFilterOperators?: string[];
    allowedSortDirections?: string[];
}

interface PaginatedResponse<T> {
    totalItems: number;
    totalPages: number;
    data: T[];
}

class QueryBuilder<T extends Model> {
    private options: FindAndCountOptions = {};
    private defaultLimit: number;
    private maxLimit: number;
    private allowedFilterOperators: Set<string>;
    private allowedSortDirections: Set<string>;
    private allowedColumns: string[] | null = null;

    constructor(config: QueryBuilderConfig) {
        this.defaultLimit = config.defaultLimit || 10;
        this.maxLimit = config.maxLimit || 100;
        this.allowedFilterOperators = new Set(
            config.allowedFilterOperators || [
                'gt',
                'lt',
                'gte',
                'lte',
                'ne',
                'in',
                'like',
            ]
        );
        this.allowedSortDirections = new Set(
            config.allowedSortDirections || ['asc', 'desc']
        );
    }

    /**
     * Set allowed columns dynamically from a repository or service.
     *
     * @param {string[]} allowedColumns - Array of allowed columns.
     * @returns {QueryBuilder} - The QueryBuilder instance for chaining.
     */
    setAllowedColumns(allowedColumns: string[]): QueryBuilder<T> {
        this.allowedColumns = allowedColumns;
        return this;
    }

    /**
     * Build Sequelize-compatible filters from a query object.
     *
     * @param {Record<string, any>} filters - Filters object.
     * @returns {QueryBuilder} - The QueryBuilder instance for chaining.
     */
    filter(filters: Record<string, any>): QueryBuilder<T> {
        if (!this.allowedColumns) {
            throw new Error(
                'Allowed columns are not set. Call setAllowedColumns() first.'
            );
        }

        const where: WhereOptions = {};

        for (const key of Object.keys(filters)) {
            if (this.allowedColumns.includes(key)) {
                const val = filters[key];

                // Partial match
                if (typeof val === 'string') {
                    where[key] = { [Op.like]: `%${val}%` };
                }
                // Array/Inclusion match
                else if (Array.isArray(val)) {
                    where[key] = { [Op.in]: val };
                }
                // Range match
                else if (
                    typeof val === 'object' &&
                    ('from' in val || 'to' in val)
                ) {
                    where[key] = {
                        ...(val.from ? { [Op.gte]: val.from } : {}),
                        ...(val.to ? { [Op.lte]: val.to } : {}),
                    };
                }
                // Exact match
                else {
                    where[key] = val;
                }
            }
        }

        this.options.where = where;
        return this;
    }

    /**
     * Add search conditions to the query.
     *
     * @param {string} term - Search term.
     * @param {string[]} fields - Fields to search in.
     * @returns {QueryBuilder} - The QueryBuilder instance for chaining.
     */
    search(term: string, fields: string[]): QueryBuilder<T> {
        if (!this.allowedColumns) {
            throw new Error(
                'Allowed columns are not set. Call setAllowedColumns() first.'
            );
        }

        const searchConditions = fields
            .filter((field) => this.allowedColumns!.includes(field))
            .map((field) => ({
                [field]: { [Op.iLike]: `%${term}%` },
            }));

        if (searchConditions.length > 0) {
            this.options.where = {
                ...this.options.where,
                [Op.or]: searchConditions,
            };
        }

        return this;
    }

    /**
     * Add pagination to the query.
     *
     * @param {number} page - Page number.
     * @param {number} pageSize - Number of items per page.
     * @returns {QueryBuilder} - The QueryBuilder instance for chaining.
     */
    paginate(page: number, pageSize: number): QueryBuilder<T> {
        const validatedPageSize = Math.min(pageSize, this.maxLimit);
        this.options.limit = validatedPageSize;
        this.options.offset = (page - 1) * validatedPageSize;
        return this;
    }

    /**
     * Add sorting to the query.
     *
     * @param {[string, string][]} sortFields - Array of [field, direction] pairs.
     * @returns {QueryBuilder} - The QueryBuilder instance for chaining.
     */
    sort(sortFields: [string, string][]): QueryBuilder<T> {
        if (!this.allowedColumns) {
            throw new Error(
                'Allowed columns are not set. Call setAllowedColumns() first.'
            );
        }

        const validSortFields = sortFields.filter(
            ([field, direction]) =>
                this.allowedColumns!.includes(field) &&
                this.allowedSortDirections.has(direction.toLowerCase())
        );

        if (validSortFields.length > 0) {
            this.options.order = validSortFields as Order;
        }

        return this;
    }

    /**
     * Build and execute the query, returning a structured response.
     *
     * @param {ModelStatic<T>} model - Sequelize model to query.
     * @returns {Promise<PaginatedResponse<T>>} - Structured response with totalItems, totalPages, and data.
     */
    async buildAndExecute(
        model: ModelStatic<T>
    ): Promise<PaginatedResponse<T>> {
        const result = await model.findAndCountAll(this.options);

        const pageSize = this.options.limit || this.defaultLimit;
        const totalPages = Math.ceil(result.count / pageSize);

        return {
            totalItems: result.count,
            totalPages,
            data: result.rows,
        };
    }
}

export default QueryBuilder;

// class BaseRepository<T extends Model> {
//     /**
//      * Find records for a specific model with configurable filters, pagination, and sorting.
//      */
//     async findRecords(model: ModelStatic<T>, queryOptions: QueryOptions) {
//       const { filter = {}, pagination = {}, sorting = {} } = queryOptions;

//       options.where = this.buildFilters(filter);

//       // Apply pagination (with defaults)
//       const { limit, offset } = this.buildPagination(pagination);
//       options.limit = limit;
//       options.offset = offset;

//       // Apply sorting (with defaults)
//       const order = this.buildSorting(sorting, model);
//       if (order) options.order = order;

//       const result = await model.findAndCountAll(options);

//       return this.formatResponse(result, pagination.page || 1, pagination.pageSize || 10);
//     }

//     /**
//      * Build pagination options.
//      */
//     private buildPagination(pagination: QueryOptions['pagination']) {
//       const page = pagination?.page && pagination.page > 0 ? pagination.page : 1;
//       const pageSize =
//         pagination?.pageSize && pagination.pageSize > 0 && pagination.pageSize <= 100
//           ? pagination.pageSize
//           : 10;

//       return {
//         limit: pageSize,
//         offset: (page - 1) * pageSize,
//       };
//     }

//     /**
//      * Build sorting options.
//      */
//     private buildSorting(sorting: QueryOptions['sorting'], model: ModelStatic<T>): Order {
//       const validSortFields = Object.keys(model.getAttributes()); // Dynamically get model fields
//       const field = sorting?.field && validSortFields.includes(sorting.field) ? sorting.field : 'id';
//       const order = sorting?.order === 'DESC' ? 'DESC' : 'ASC';

//       return [[field, order]];
//     }

//     /**
//      * Format response for pagination metadata.
//      */
//     private formatResponse(result: { rows: T[]; count: number }, page: number, pageSize: number) {
//       return {
//         data: result.rows,
//         total: result.count,
//         page,
//         pageSize,
//         totalPages: Math.ceil(result.count / pageSize),
//       };
//     }
//   }

//   export default BaseRepository;
