import { format, addDays } from 'date-fns';

const formatDate = (date: Date, formatStr: string = 'yyyy-MM-dd'): string =>
    format(date, formatStr);

const addDaysToDate = (date: Date, days: number): Date => addDays(date, days);

export { formatDate, addDaysToDate };
