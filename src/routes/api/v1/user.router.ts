import { Router } from 'express';
import userController from '../../../controllers/user.controller';
import { authenticate } from '../../../middleware/auth.middleware';

const router = Router();

router.route('/:id').get(authenticate, userController.getById);
router.route('/').get(authenticate, userController.getAll);

export default router;
