/**
GET   /products		           List all products (with filters like category, price_min, stock)	/v1/products?category=electronics&price_max=500
GET   /products/{id}		   Get product details	/v1/products/123
GET   /products/search		   Search products by keyword	/v1/products/search?q=laptop
GET   /products/{id}/reviews   List reviews for a product

POST  /products		           Create a new product (admin-only)	Body: { title, price, description, SKU }
POST  /products/{id}/images	   Upload product images

POST /reviews	                Submit a product review	Body: { productId, rating, comment }
POST /reviews/{id}/report		Report abusive reviews

PUT   /products/{id}		   Update a product (admin)	
PATCH /products/{id}/inventory Update stock quantity	Body: { stock: 50 }

 */

import { Router } from 'express';
import productController from '../../../controllers/product.controller';
import { authenticate } from '../../../middleware/auth.middleware';

const router = Router();

router.route('/search').get(/*authenticate, */ productController.search);
router.route('/:id').get(/*authenticate, */ productController.getById);
router.route('/').get(/*authenticate, */ productController.getAll);

export default router;
