import { format } from 'date-fns'

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