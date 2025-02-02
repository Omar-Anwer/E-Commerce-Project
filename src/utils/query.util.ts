import escapeRegExp from 'lodash';
import {
    Op,
    WhereOptions,
    OrderItem,
    FindAndCountOptions,
    Model,
    ModelStatic,
} from 'sequelize';

const columnMappings: Record<string, Record<string, string>> = {
    users: {
        fName: 'firstName',
        lName: 'lastName',
        email: 'email',
        date: 'birthDate',
        id: 'id',
    },
    products: {
        name: 'name',
        // category: 'category_id',
        price: 'price',
        // rating: 'average_rating',
        // inStock: 'stock_available',
    },
    orders: {
        // orderId: 'id',
        // status: 'order_status',
        // totalAmount: 'total_price',
        // createdAt: 'created_at',
    },
};

export class QueryBuilder<T extends Model> {
    //private where: Record<string | symbol, any> = {};

    private where: any = {};
    //private where: WhereOptions<T> = {};
    //private where: WhereOptions<T> = {} as Record<string | symbol, any>;

    private order: OrderItem[] = [];
    private limit?: number;
    private offset?: number;

    constructor(
        private entity: string,
        private queryParams: Record<string, any>,
        private model: ModelStatic<T>
    ) {}

    private mapColumn(apiColumn: string): string | null {
        return columnMappings[this.entity]?.[apiColumn] || null;
    }

    filter(): this {
        Object.entries(this.queryParams).forEach(([key, value]) => {
            if (
                !value ||
                (typeof value === 'object' && Object.keys(value).length === 0)
            ) {
                return this; // Skip empty values
            }

            const cleanedKey = key.replace(/_(min|max|from|to|start|end)$/, ''); // Remove any of the suffixes (_max, _min, _from, _to) from the end
            const dbColumn = this.mapColumn(cleanedKey);

            //const dbColumn = this.mapColumn(key.replace('_max', '').replace('_min', '').replace('_from', '').replace('_to', ''));
            if (!dbColumn) return; // Skip if the column isn't mapped

            // Range match (_min, _max) or `{ from, to }`
            // if (
            //     typeof value === 'object' &&
            //     ('from' in value || 'to' in value)
            // ) {
            //     console.log('/nFROMMMMMMMM/n', value, dbColumn);
            //     this.where[dbColumn] = {
            //         ...(value.from != null ? { [Op.gte]: value.from } : {}),
            //         ...(value.to != null ? { [Op.lte]: value.to } : {}),
            //     };
            // }
            if (key.endsWith('_min') && value) {
                this.where[dbColumn] = { [Op.gte]: value };
            } else if (key.endsWith('_max') && value) {
                this.where[dbColumn] = { [Op.lte]: value };
            }
            // Array/Inclusion match (IN)
            else if (Array.isArray(value) && value.length > 0) {
                console.log('/nARAAAAAAY/n', value, dbColumn);

                this.where[dbColumn] = {
                    [Op.in]: value.filter((v) => v != null),
                };
            }
            // Partial match (LIKE for strings) with SQL injection prevention
            else if (typeof value === 'string' && isNaN(Number(value))) {
                console.log('/nStriiiiing/n', value, dbColumn);
                const sanitizedValue = escapeRegExp(value.trim()); // Prevent SQL injection
                this.where[dbColumn] = { [Op.iLike]: `%${sanitizedValue}%` };
            }
            // Exact match
            else if (value != null) {
                console.log('/nEXAAAAAACT/n', value, dbColumn);
                this.where[dbColumn] = value;
            }
        });

        return this;
    }

    paginate(): this {
        if (!this.queryParams.page || !this.queryParams.page_size) {
            return this;
        }
        const page = Math.max(parseInt(this.queryParams.page, 10) || 1, 1);
        const pageSize = Math.max(
            parseInt(this.queryParams.page_size, 10) || 10,
            1
        );
        this.limit = pageSize;
        this.offset = (page - 1) * pageSize;
        return this;
    }

    sort(): this {
        if (!this.queryParams.sort) {
            return this;
        }

        this.order = this.queryParams.sort
            .split(',')
            .map((s: string): OrderItem | null => {
                const direction = s.startsWith('-') ? 'DESC' : 'ASC';
                const field = s.replace(/^[-+]/, '');
                const dbColumn = this.mapColumn(field);
                return dbColumn ? [dbColumn, direction] : null;
            })
            .filter(Boolean) as OrderItem[];

        return this;
    }

    // search(): this {
    //     console.info('Searching');
    //     const query = this.queryParams.q;
    //     if (!query) {
    //         return this;
    //     }

    //     const sanitizedQuery = escapeRegExp(query.trim());
    //     const searchConditions: any = [];

    //     query.split('+').forEach((apiColumn: string) => {
    //         const dbColumn = this.mapColumn(apiColumn);
    //         if (dbColumn) {
    //             searchConditions.push({
    //                 [dbColumn]: { [Op.iLike]: `%${sanitizedQuery}%` },
    //             });
    //         }
    //     });

    //     if (searchConditions.length > 0) {
    //         this.where[Op.or] = searchConditions;
    //     }

    //     return this;
    // }

    async build() {
        const queryOptions: FindAndCountOptions<T> = {
            where: this.where as WhereOptions<T>,
            order:
                Array.isArray(this.order) && this.order.length > 0
                    ? this.order
                    : undefined,
            limit: this.limit,
            offset: this.offset,
        };
        console.log(queryOptions);
        //return queryOptions;

        const result = await this.model.findAndCountAll(queryOptions);
        const totalPages = Math.ceil(result.count / (this.limit || 10));

        return {
            totalItems: result.count,
            totalPages,
            data: result.rows,
        };
    }
}
