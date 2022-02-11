import dayjs from "dayjs";
import {ButtonFilter} from "../interfaces/general";

export const buttonFilters: ButtonFilter[] = [
    {
        value: 'week',
        label: '1W',
        filter: dayjs().subtract(1, 'week').valueOf()
    },
    {
        value: 'month',
        label: '1M',
        filter: dayjs().subtract(1, 'month').valueOf()
    },
    {
        value: 'quarter',
        label: '3M',
        filter: dayjs().subtract(3, 'month').valueOf()
    },
    {
        value: 'semester',
        label: '6M',
        filter: dayjs().subtract(6, 'month').valueOf()
    },
    {
        value: 'year',
        label: '1Y',
        filter: dayjs().subtract(1, 'year').valueOf()
    },
    {
        value: 'forever',
        label: 'Since 🔥 Nation Attack',
        filter: 0
    }
]
