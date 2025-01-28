import rateLimit from 'express-rate-limit';

const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
    standardHeaders: 'draft-8', // draft-6: `RateLimit-*` headers; draft-7 & draft-8: combined `RateLimit` header
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
    message: 'Too many requests from this IP, please try again later.',
});

const createAccountLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 Hr
    limit: 10,
    standardHeaders: 'draft-8',
    legacyHeaders: false,
    message: 'Too many requests from this IP, please try again later.',
    //	store: new ExternalStore(),
});

const loginLimiter = rateLimit({
    windowMs: 5 * 60 * 1000, // 5 minutes
    limit: 2,
    standardHeaders: 'draft-8',
    legacyHeaders: false,
    message: 'Too many requests from this IP, please try again later.',
});

export { apiLimiter, loginLimiter, createAccountLimiter };
