import express, { Request, Response, Application, NextFunction } from 'express';
//import pinoHttp from 'pino-http';
import logger from './utils/logger.util';

// Import routes
import authRouter from './routes/api/v1/auth.router';
import homeRouter from './routes/api/v1/home.router';
import healthRouter from './routes/api/v1/health.router';

import helmet from 'helmet';
import cors from 'cors';
import compression from 'compression';

import config from 'config';

const app: Application = express();

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
    methods: '*',
    // allowedHeaders: [
    //     'access-control-allow-origin',
    //     'authorization',
    //     'Pragma',
    //     'contact',
    //   ],
    //   exposeHeaders: []
};
// Middlewares

app.use(cors(corsOptions));
app.use(helmet());
app.use(express.urlencoded({ limit: '10mb' }));
app.use(express.json());
app.use(express.static('./public'));
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
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/health', healthRouter);
app.use('/api/v1/', homeRouter);
//app.use('/api/v1/admin', adminRouter);
//app.use('/api/v1/user', userRouter);

app.all('*', (req: Request, res: Response, next: NextFunction) => {
    //res.status(404).send('Oops!');
    const err = new Error(`Invalid url: ${req.originalUrl}`);
    next(err.message);
});

// Error handling
//app.use(errorMiddleware);
app.use((err: Error, req: Request, res: Response) => {
    res.status(400).json({ err });
});

const start = async () => {
    app.listen(port, () => {
        logger.info(`Server is listening at ${address}....`);
    });
};

start();

// process.on('SIGTERM', () => {
//     server.close(() => {
//       console.log('Server gracefully shut down');
//       process.exit(0);
//     });
//   });

//   process.on('SIGINT', () => {
//     server.close(() => {
//       console.log('Server interrupted. Shutting down');
//       process.exit(1);
//     });
//   });

export default app;
