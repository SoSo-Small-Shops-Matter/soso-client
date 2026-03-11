import { format } from 'date-fns'

export const MINUTE = 60 * 1000;
export const HOUR = 60 * MINUTE;
export const DAY = 24 * HOUR;

export const getFormatDateString = (
  dateString: string,
  dateFormat: string = 'yyyy-MM-dd HH:mm:ss',
): string => {
  try {
    return format(new Date(dateString), dateFormat)
  } catch (error) {
    console.error('[formatted date error] date: ' + dateString + ', dateFormat: ' + dateFormat)
    return ''
  }
}