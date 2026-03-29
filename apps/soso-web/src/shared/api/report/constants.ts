import type { ShopReportTypeValue } from './types';

type ReportListItem = {
  type: ShopReportTypeValue;
  text: string;
  name: 'report';
};

export const REPORT_LIST: ReportListItem[] = [
  {
    type: 'closed',
    text: '더 이상 운영하지 않는 가게에요.',
    name: 'report',
  },
  {
    type: 'wrong_location',
    text: '위치가 잘못됐어요.',
    name: 'report',
  },
];
