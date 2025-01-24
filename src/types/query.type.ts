export interface QueryOptions {
    filter?: Record<string, any>; // Filters as key-value pairs
    search?: { term: string; fields: string[] };
    pagination?: {
        page?: number; // Current page number
        pageSize?: number; // Number of records per page
    };
    sorting?: {
        fields?: [string, 'ASC' | 'DESC'][]; // Fields to sort by with their order
    };
}
