// validate uuid format
import { v4 as uuidv4 } from 'uuid';

export const generateUUID = (): string => uuidv4();

export const validateColumns = (
    columns: string[],
    allowedColumns: string[]
): boolean => {
    return columns.every((column) => allowedColumns.includes(column));
};

export const validateSingleColumn = (
    column: string,
    allowedColumns: string[]
): boolean => {
    return allowedColumns.includes(column);
};
