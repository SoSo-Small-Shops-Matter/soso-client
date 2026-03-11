import { SubmissionStatus, SubmissionType } from "@/shared/api/submissions/types";

export const categoryMap: Record<SubmissionType, string> = {
  new_shop: "새 소품샵",
  new_product: "상품 추가",
  new_operating: "운영시간",
};

export const statusMap: Record<SubmissionStatus, string> = {
  pending: "대기중",
  approved: "승인됨",
  rejected: "반려됨",
};
