import { Router } from 'express';
import { signup } from '../../../controllers/auth.controller';
import { validateBodyMiddleware } from '../../../middleware/schema.validator';
import signupSchema from '../../../schema/auth.schema';
import { createAccountLimiter } from '../../../middleware/rateLimit';
import cookieParser from 'cookie-parser';
import hpp from 'hpp';

const router = Router();

// const hppOptions = {
// whitelist: ['price', 'quantity'],
// paths: ['/api']
// }
// router.use(hpp(hppOptions));

router.use(cookieParser(process.env.COOKIE_SECRET || 'your_secret_key'));
router.post(
    '/signup',
    createAccountLimiter,
    validateBodyMiddleware(signupSchema),
    signup
);

//This route is responsible for handling user login requests. It's used for authenticating users and granting them access to their accounts
// router.post(
//     '/login',
//     validateBodyMiddleware(loginSchema),
//     login
// );

//Here, we have a route for rendering the login page. Users can access this route to view and interact with the login form
// router.get(
//     '/login',
//     login
// );

// // Admin
// router.use(authService.allowedTo('admin', 'manager'));
// router.put(
//   '/changePassword/:id',
//   changeUserPasswordValidator,
//   changeUserPassword
// );
// router
//   .route('/')
//   .get(getUsers)
//   .post(uploadUserImage, resizeImage, createUserValidator, createUser);
// router
//   .route('/:id')
//   .get(getUserValidator, getUser)
//   .put(uploadUserImage, resizeImage, updateUserValidator, updateUser)
//   .delete(deleteUserValidator, deleteUser);

// module.exports = router;

export default router;
