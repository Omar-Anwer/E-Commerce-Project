import { NotFoundError } from '../errors/notFound.error';
import ProductRepository from '../repository/product.repository';
import { Request, Response, NextFunction } from 'express';
import { QueryBuilder } from '../utils/query.util';
import { Product } from '../models/product/product.model';

class productService {
    private productRepository: ProductRepository;
    constructor() {
        this.productRepository = new ProductRepository();
    }

    async getAll(req: Request, res: Response, next: NextFunction) {
        const queryBuilder = new QueryBuilder('products', req.query, Product);
        const products = await queryBuilder
            .filter()
            //.search()
            .sort()
            .paginate()
            .build();
        //const products = await this.productRepository.findAll();
        return products;
    }
    async search(req: Request, res: Response, next: NextFunction) {
        const queryBuilder = new QueryBuilder('products', req.query, Product);
        const products = await queryBuilder
            //.search()
            .paginate()
            .build();
        return products;
    }

    async getById(req: Request, res: Response, next: NextFunction) {
        const id = req.params.id;
        const product = await this.productRepository.findById(id);
        if (!product) {
            throw new NotFoundError();
        }
        return product;
    }
}

export default new productService();
