export type DayOfWeek = 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';

export const DAYS_MAP: { label: string; value: DayOfWeek }[] = [
  { label: '월', value: 'Monday' },
  { label: '화', value: 'Tuesday' },
  { label: '수', value: 'Wednesday' },
  { label: '목', value: 'Thursday' },
  { label: '금', value: 'Friday' },
  { label: '토', value: 'Saturday' },
  { label: '일', value: 'Sunday' },
];

export const getDayLabel = (value: DayOfWeek | string) => DAYS_MAP.find((d) => d.value === value)?.label || '';
export const getDayValue = (label: string) => DAYS_MAP.find((d) => d.label === label)?.value;
