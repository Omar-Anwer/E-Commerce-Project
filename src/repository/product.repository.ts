// import { Request, Response } from 'express';
// //import Product from '../models/Product';
// import QueryBuilder from './queryBuilder';
// import ProductRepository from '../repositories/ProductRepository';

// class ProductController {
//     private queryBuilderConfig = {
//         defaultLimit: 20,
//         maxLimit: 100,
//         allowedFilterOperators: ['gt', 'lt', 'gte', 'lte', 'ne', 'in', 'like'],
//         allowedSortDirections: ['asc', 'desc'],
//     };

//     public async getProducts(req: Request, res: Response) {
//         try {
//             const { filters, sort, page, limit, search, searchFields } =
//                 req.query;

//             // Fetch allowed columns from the repository
//             const productRepository = new ProductRepository();
//             const allowedColumns = await productRepository.getAllowedColumns();

//             // Initialize QueryBuilder and set allowed columns
//             const queryBuilder = new QueryBuilder<Product>(
//                 this.queryBuilderConfig
//             );
//             queryBuilder.setAllowedColumns(allowedColumns);

//             if (filters) {
//                 queryBuilder.filter(JSON.parse(filters as string));
//             }

//             if (search && searchFields) {
//                 queryBuilder.search(
//                     search as string,
//                     (searchFields as string).split(',')
//                 );
//             }

//             if (page && limit) {
//                 queryBuilder.paginate(
//                     parseInt(page as string, 10),
//                     parseInt(limit as string, 10)
//                 );
//             }

//             if (sort) {
//                 const sortFields = (sort as string)
//                     .split(',')
//                     .map((pair) => pair.split(':'));
//                 queryBuilder.sort(sortFields as [string, string][]);
//             }

//             // Build and execute the query
//             const result = await queryBuilder.buildAndExecute(Product);

//             res.status(200).json({ data: result });
//         } catch (error) {
//             // res.status(400).json({
//             //     success: false,
//             //     message: error.message,
//             // });
//         }
//     }
// }

// export default new ProductController();
