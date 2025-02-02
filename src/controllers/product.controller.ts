import { NextFunction, Request, Response } from 'express';
import productService from '../services/product.service';
//import { toDto, UserDto } from '../dtos/product.dto';

class productController {
    async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            ///products?id=1&date{from}&sort=-email&page=1&page_size=10&date_min=1999-04-1
            const result = await productService.getAll(req, res, next);
            const { totalItems, totalPages, data } = result;
            //const productsDto = data.map((productDto) => toDto(productDto));
            res.status(200).json({
                success: true,
                totalItems,
                totalPages,
                currentPage: req.query.page,
                perPage: req.query.page_size,
                // totalCount: productsDto.length,
                data: data//productsDto,
            });
        } catch (error) {
            next(error);
        }
    }
    async search(req: Request, res: Response, next: NextFunction) {
        try {
            const result = await productService.search(req, res, next);
            const { totalItems, totalPages, data } = result;
            //const productsDto = data.map((productDto) => toDto(productDto));
            res.status(200).json({
                success: true,
                totalItems,
                totalPages,
                currentPage: req.query.page,
                perPage: req.query.page_size,
                // totalCount: productsDto.length,
                data: data//productsDto,
            });
        } catch (error) {
            next(error);
        }
    }

    async getById(req: Request, res: Response, next: NextFunction) {
        try {
            const product = await productService.getById(req, res, next);
           // const productDto = toDto(product);
            res.status(200).json({
                success: true,
                data: product//productDto,
            });
        } catch (error) {
            next(error);
        }
    }
}

export default new productController();
