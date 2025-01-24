import logger from './logger.util';

/**
 * Validates required environment variables.
 * Throws an error if any required variable is missing.
 *
 * @param requiredEnvVars - Array of required environment variable names.
 * @throws {Error} If any required environment variable is missing.
 */
export const validateEnvVars = (requiredEnvVars: string[]): void => {
    const missingEnvVars = requiredEnvVars.filter(
        (envVar) => !process.env[envVar]
    );

    if (missingEnvVars.length > 0) {
        const errorMessage = `Missing required environment variables: ${missingEnvVars.join(', ')}`;
        logger.error(errorMessage);
        throw new Error(errorMessage);
    }

    logger.info('All required environment variables are present.');
};
