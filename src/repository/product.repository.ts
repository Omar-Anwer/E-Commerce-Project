import { Op, ModelStatic, Transaction } from 'sequelize';
import {
    Product,
    ProductCreationAttributes,
} from '../models/product/product.model'; // Import your Sequelize Product model
import logger from '../utils/logger.util';

class ProductRepository {
    async findById(id: string | number) {
        return await Product.findByPk(id);
    }

    async findByUid(uid: string) {
        return await Product.findOne({ where: { uid } });
    }

    // async findByEmail(email: string) {
    //     return await Product.findOne({
    //         where: { email } /* include: Role, password, id, uuid */,
    //     });
    // }
    async findAll() {
        return await Product.findAll();
    }
    async create(creationAttributes: ProductCreationAttributes) {
        logger.info(creationAttributes);
        const savedProduct = await Product.create({ ...creationAttributes });
        return savedProduct;
    }
}

export default ProductRepository;

//     async exists(product: Partial<Product>): Promise<boolean> {
//         const { id, email, uuid } = product;

//         // Only add the valid conditions to the where clause
//         const conditions = {
//             ...(id && { id }),
//             ...(uuid && { uuid }),
//             ...(email && { email }),
//         };

//         // If no conditions exist, return false immediately
//         if (Object.keys(conditions).length === 0) {
//             return false;
//         }

//         // Check if the product exists
//         const userExists = await Product.findOne({
//             where: { [Op.or]: [conditions] },
//             attributes: ['id'],
//             raw: true,
//         });

//         return Boolean(userExists);
//     }
// }

// import { Product, UserModel } from '../models/product/product.model'; // Import the Product model and UserModel interface
// import BaseRepository from './base.repository'; // Import BaseRepository
// import { QueryBuilderConfig } from './queryBuilder'; // Import QueryBuilderConfig

// // Define query configuration for the product model
// const userQueryConfig: QueryBuilderConfig = {
//     defaultLimit: 10,
//     maxLimit: 50,
//     allowedFilterOperators: ['gt', 'lt', 'gte', 'lte', 'eq', 'like'],
//     allowedSortDirections: ['asc', 'desc'],
// };

// // Extend BaseRepository for Product-specific methods
// class ProductRepository {
//     constructor() {
//         // Pass the Product model and query configuration to the BaseRepository
//         //super(Product, userQueryConfig);
//     }

//     /**
//      * Find a product by email.
//      * @param email - The email of the product.
//      * @returns The product instance or null if not found.
//      */
//     async findByEmail(email: string): Promise<UserModel | null> {
//         return await this.model.findOne({ where: { email } });
//     }

//     /**
//      * Find a product by UUID.
//      * @param uuid - The UUID of the product.
//      * @returns The product instance or null if not found.
//      */
//     async findByUuid(uuid: string): Promise<UserModel | null> {
//         return await this.model.findOne({ where: { uuid } });
//     }

//     // Additional product-specific methods can be implemented here
// }

// // import Product from '../models/product/product.model';
// // import { Transaction } from 'sequelize';
// // import BaseRepository from './base.repository';
// // import { QueryBuilderConfig } from './queryBuilder';

// // /**
// //  * Save a new product to the database.
// //  * @param product - The product data to save.
// //  * @returns The newly created product.
// //  */
// // export const save = async (
// //     product: InstanceType<typeof Product>,
// //     transaction?: Transaction
// // ) => {
// //     try {
// //         const newUser = await Product.create(product, { transaction });
// //         return newUser;
// //     } catch (error) {
// //         throw new Error(`Error saving product: ${error}`);
// //     }
// // };

// // /**
// //  * Update a product's data.
// //  * @param product - The product instance to update.
// //  * @param updateData - The data to update.
// //  * @param transaction - An optional transaction for atomic updates.
// //  * @returns The updated product.
// //  */
// // export const update = async (
// //     product: InstanceType<typeof Product>,
// //     updateData: Partial<Omit<InstanceType<typeof Product>, 'id'>>, // Omit `id` from being updated
// //     transaction?: Transaction
// // ) => {
// //     try {
// //         // Only update properties that are actually present in the `updateData` object
// //         await product.update(updateData, { transaction });
// //         return product; // Return the updated product instance
// //     } catch (error) {
// //         throw new Error(`Error updating product with ID ${product.id}: ${error}`);
// //     }
// // };

// // /**
// //  * Delete a product by their ID.
// //  * @param userId - The ID of the product to delete.
// //  * @returns A success message or error.
// //  */
// // export const remove = async (
// //     product: InstanceType<typeof Product>,
// //     transaction?: Transaction
// // ) => {
// //     try {
// //         await product.destroy({ transaction });
// //     } catch (error) {
// //         throw new Error(`Error deleting product with ID ${product.id}: ${error}`);
// //     }
// // };

// // /**
// //  * Find all users in the database.
// //  * @returns An array of users.
// //  */
// // const findAll = async () => {
// //     try {
// //         const users = await Product.findAll();
// //         return users;
// //     } catch (error) {
// //         throw new Error(`Error finding all users: ${error}`);
// //     }
// // };

// // /**
// //  * Find a product by their ID.
// //  * @param userId - The ID of the product to find.
// //  * @returns The product if found, or null.
// //  */
// // const findById = async (userId: string | number) => {
// //     try {
// //         const product = await Product.findOne({ where: { id: userId } });
// //         return product;
// //     } catch (error) {
// //         throw new Error(
// //             `Error finding product for product with ID ${userId}: ${error}`
// //         );
// //     }
// // };

// // /**
// //  * Find a product by their UUID.
// //  * @param userUuid - The UUID of the product to find.
// //  * @returns The product if found, or null.
// //  */
// // export const findByUuid = async (userUuid: string) => {
// //     try {
// //         const product = await Product.findOne({ where: { uuid: userUuid } });
// //         return product;
// //     } catch (error) {
// //         throw new Error(`Error finding product with UUID ${userUuid}: ${error}`);
// //     }
// // };

// // /**
// //  * Check if a product exists by their ID.
// //  * @param id - The ID of the product to check.
// //  * @returns True if the product exists, otherwise false.
// //  */
// // export const isExists = async (id: string | number): Promise<boolean> => {
// //     try {
// //         const product = await Product.findByPk(id, { attributes: ['id'], raw: true });
// //         return !!product;
// //     } catch (error) {
// //         throw new Error(
// //             `Error checking if product exists with ID ${id}: ${error}`
// //         );
// //     }
// // };

// // /**
// //  * Count all users.
// //  * @returns The total number of users.
// //  */
// // export const countAll = async (): Promise<number> => {
// //     try {
// //         const count = await Product.count();
// //         return count;
// //     } catch (error) {
// //         throw new Error(`Error counting all users: ${error}`);
// //     }
// // };


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

//     public async findProducts(req: Request, res: Response) {
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
