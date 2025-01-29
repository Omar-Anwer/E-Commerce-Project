import express, { Request, Response, NextFunction } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import compression from 'compression';
import path from 'path';
import dotenv from 'dotenv';
//import config from 'config';
import logger from './utils/logger.util';
import errorHandlerMiddleware from './middleware/errorHandler.middleware';
import { dbTestConnection } from './config/db.connect';

// Import routes
import authRoutes from './routes/api/v1/auth.router';
import homeRoutes from './routes/api/v1/home.router';
import healthRoutes from './routes/api/v1/health.router';
import userRoutes from './routes/api/v1/user.router';
import { NotFoundError } from './errors/notFound.error';
import cookieParser from 'cookie-parser';
import { PERMISSIONS } from './config/roles';

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// Environment variables
const env = process.env.NODE_ENV || 'development';
const port = process.env.PORT || 3000;
const address = `http://localhost:${port}`;

// CORS configuration
const allowedOrigins =
    process.env.CORS_ORIGIN?.split(',').map((item) => item.trim()) || '*';
const corsOptions = {
    origin: allowedOrigins, // Whitelist specific domains
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Allowed HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
    credentials: true, // Allow credentials (e.g., cookies)
};

console.log(PERMISSIONS);

// Middleware
app.use(cookieParser());
app.use(cors(corsOptions)); // Enable CORS with specific options
app.use(helmet()); // Set security HTTP headers
app.use(express.json({ limit: '20kb' })); // Parse JSON requests
app.use(express.urlencoded({ extended: true, limit: '20kb' })); // Parse URL-encoded requests
app.use(express.static(path.join(__dirname, 'public'))); // Serve static files
app.use(express.static(path.join(__dirname, 'uploads'))); // Serve uploaded files

// Compression middleware
app.use(
    compression({
        level: 6, // Compression level (0 = no compression, 9 = maximum compression)
        threshold: 0, // Compress all responses
        filter: (req, res) => {
            // Skip compression if 'x-no-compression' header is present
            return !req.headers['x-no-compression'];
        },
    })
);

// Logging middleware (optional, if using pino-http)
// app.use(pinoHttp({ logger }));

// Routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/health', healthRoutes);
app.use('/api/v1/', homeRoutes);

app.all('*', (req: Request, res: Response, next: NextFunction) => {
    throw new NotFoundError(`Invalid URL: ${req.originalUrl}`);
});

// Database connection test
dbTestConnection();

// Error handling middleware (should be at the very end)
app.use(errorHandlerMiddleware);

// Start the server
const server = app.listen(port, () => {
    logger.info(`NODE_ENV=${env}`);
    logger.info(`Server is listening at ${address}`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err: Error) => {
    logger.error(`Unhandled Rejection: ${err.message}`);
    server.close(() => {
        logger.error('Server closed due to unhandled rejection');
        process.exit(1);
    });
});

// Handle SIGTERM (e.g., from Docker or Kubernetes)
process.on('SIGTERM', () => {
    logger.info('SIGTERM received. Shutting down gracefully...');
    server.close(() => {
        logger.info('Server closed');
        process.exit(0);
    });
});

// Handle SIGINT (e.g., Ctrl+C)
process.on('SIGINT', () => {
    logger.info('SIGINT received. Shutting down gracefully...');
    server.close(() => {
        logger.info('Server closed');
        process.exit(0);
    });
});

export default app;
