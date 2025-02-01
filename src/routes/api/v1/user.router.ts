import { Router } from 'express';
import userController from '../../../controllers/user.controller';
import { authenticate } from '../../../middleware/auth.middleware';

const router = Router();

// User Management
// POST   /users                       Create a user (signup).
// POST   /users/{id}/password-reset   Trigger password reset.
// POST   /users/me/addresses		   Add a shipping/billing address

// GET  /users                       List all users (admin-only).
// GET  /users/me                    Get the current authenticated user (common pattern).
// GET  /users/{id}                  Get a specific user.
// GET  /users/{id}/posts              (to fetch a user’s posts).
// PUT    /users/{id}                  Update a user.
// PATCH  /users/{id}                  Update a user (partial update).
// DELETE /users/{id}                  Delete a user.

// Profile Management
// GET /profiles/{username}            Get public profile by username.
// PUT /profiles/me                    Update the authenticated user’s profile.

router.route('/:id').get(authenticate, userController.getById);
router.route('/').get(authenticate, userController.getAll);

export default router;
