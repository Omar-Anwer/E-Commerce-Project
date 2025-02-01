// import express from 'express';
// import { assignRole, addPermissions, removePermissions } from '../controllers/admin.controller.js';
// import { authenticate } from '../middleware/auth.middleware.js';
// import { authorize } from '../middleware/rbac.middleware.js';
// import { PERMISSIONS } from '../config/permissions.js';

// const router = express.Router();

/*
GET /admin/users		List all users (with pagination)
GET /admin/orders		List all orders (filter by status)
GET /admin/sales		Get sales analytics (e.g., ?start=2023-01-01)

POST /admin/users/{id}/ban         Ban a user.
POST /admin/products/{id}/publish  Publish/unpublish a product
POST /admin/products/{id}/publish		
*/

// router.post('/assign-role', authenticate, authorize([PERMISSIONS.MANAGE_USERS]), assignRole);
// router.post('/add-permissions', authenticate, authorize([PERMISSIONS.MANAGE_USERS]), addPermissions);
// router.post('/remove-permissions', authenticate, authorize([PERMISSIONS.MANAGE_USERS]), removePermissions);

// export default router;
