type ReviewReportItem = {
  id: number;
  text: string;
};

export const REVIEW_ETC_REPORT_ID = 6;

export const REVIEW_REPORT_LIST: ReviewReportItem[] = [
  { id: 1, text: '스팸/광고' },
  { id: 2, text: '욕설/비방' },
  { id: 3, text: '음란물' },
  { id: 4, text: '개인정보 노출' },
  { id: 5, text: '저작권 침해' },
  { id: REVIEW_ETC_REPORT_ID, text: '기타(직접입력)' },
];
