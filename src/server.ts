import express, { Request, Response, Application, NextFunction } from 'express';
//import pinoHttp from 'pino-http';
import logger from './utils/logger.util';
import errorHandlerMiddleware from './middleware/errorHandler.middleware';
import { CustomError } from './errors/custom.error';
// Import routes
import authRoutes from './routes/api/v1/auth.router';
import homeRoutes from './routes/api/v1/home.router';
import healthRoutes from './routes/api/v1/health.router';
import userRoutes from './routes/api/v1/user.router';

import helmet from 'helmet';
import cors from 'cors';
import compression from 'compression';

import config from 'config';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

// Environment variables
const env = process.env.NODE_ENV;
const port = process.env.PORT || 3000;
const address: string = `http://localhost:${port}`;

const allowedOrigins = process.env.CORS_ORIGIN || '';
const allowedOriginsArray =
    allowedOrigins?.split(',').map((item) => item.trim()) || '*';
//const allowedMethods = || '*';

const corsOptions = {
    origin: allowedOriginsArray, // whitelist foreign domains to allow
    optionSuccessStatus: 200, //Some legacy browsers
    methods: ['GET', 'POST'],
    // allowedHeaders: [
    //     'access-control-allow-origin',
    //     'authorization',
    //     'Pragma',
    //     'contact',
    //   ],
    //   exposeHeaders: []
};

// Middlewares

app.use(cors(corsOptions)); // Enable CORS with specific options
app.use(helmet());
// app.use(
//     helmet.contentSecurityPolicy({
//         directives: {
//             defaultSrc: ["'self'"],
//             scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'"],
//             styleSrc: ["'self'", "'unsafe-inline'"],
//             imgSrc: ["'self'"],
//         },
//     })
// );
app.use(express.urlencoded({ extended: true, limit: '20kb' }));
app.use(express.json({ limit: '20kb' }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'uploads')));

//app.use(pinoHttp({ logger: logger }));
// Compress all server responses with gzip
app.use(
    compression({
        level: 6,
        threshold: 0,
        // Don't apply compression if 'x-no-compression' header is present
        filter: (req, res) => {
            if (!req.headers['x-no-compression']) {
                return compression.filter(req, res);
            }
            return false;
        },
    })
);

// Registering all the routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/users', userRoutes);
//app.use('/api/v1/admin', adminRoutes);
app.use('/api/v1/health', healthRoutes);
app.use('/api/v1/', homeRoutes);

app.all('*', (req: Request, res: Response, next: NextFunction) => {
    //res.status(404).send('Oops!');
    const err = new CustomError(`Invalid url: ${req.originalUrl}`, 404);
    next(err.message);
});

// Error handling
app.use(errorHandlerMiddleware);

const server = app.listen(port, () => {
    logger.info(`NODE_ENV=${env}`);
    // await sequelize.sync();
    //         // logger.info('DB connected');
    logger.info(`Server is listening at ${address}....`);
});

process.on('unhandledRejection', (err) => {
    logger.error(`Unhandled rejection: ${err}`);
    server.close(() => {
        logger.error(`Server closed due to unhandled rejection: ${err}`);
        process.exit(1);
    });
});
process.on('SIGTERM', (err) => {
    logger.error(`SIGTERM received: ${err}`);
    server.close(() => {
        logger.error(`Server gracefully shut down: ${err}`);
        process.exit(1);
    });
});

process.on('SIGINT', (err) => {
    logger.error(`SIGINT received: ${err}`);
    server.close(() => {
        logger.error(`Server interrupted. Shutting down...: ${err}`);
        process.exit(1);
    });
});

export default app;
