
/**
 * 
 * @Unused utils
 */

import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';

export const formatDateRange = (dates: [Dayjs | null, Dayjs | null]): { startDate: string; endDate: string } | null => {
    if (!dates || !dates[0] || !dates[1]) {
        return null;
    }

    return {
        startDate: dates[0].format('YYYY-MM-DD'),
        endDate: dates[1].format('YYYY-MM-DD')
    };
};

export const parseDateRange = (startDate: string, endDate: string): [Dayjs, Dayjs] => {
    return [dayjs(startDate), dayjs(endDate)];
};

