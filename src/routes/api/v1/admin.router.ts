// import express from 'express';
// import { assignRole, addPermissions, removePermissions } from '../controllers/admin.controller.js';
// import { authenticate } from '../middleware/auth.middleware.js';
// import { authorize } from '../middleware/rbac.middleware.js';
// import { PERMISSIONS } from '../config/permissions.js';

// const router = express.Router();

// router.post('/assign-role', authenticate, authorize([PERMISSIONS.MANAGE_USERS]), assignRole);
// router.post('/add-permissions', authenticate, authorize([PERMISSIONS.MANAGE_USERS]), addPermissions);
// router.post('/remove-permissions', authenticate, authorize([PERMISSIONS.MANAGE_USERS]), removePermissions);

// export default router;