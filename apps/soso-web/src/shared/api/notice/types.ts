export interface NoticeType {
  id: number;
  title: string;
  text: string;
  createdAt: string;
  updatedAt: string | null;
  deletedAt: string | null;
}

export type GetNoticeResponse = NoticeType[];
