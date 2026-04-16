import { ReviewReport } from "@/shared/api/review-reports/types";
import { Modal } from "@/shared/components/Modal";
import { InfoField } from "@/shared/components/ModalInfoField";
import { getFormatDateString } from "@repo/utils/formatDateString";

interface ReviewReportDetailModalProps {
  report: ReviewReport | null;
  onClose: () => void;
}

export function ReviewReportDetailModal({
  report,
  onClose,
}: ReviewReportDetailModalProps) {
  return (
    <Modal isOpen={!!report} onClose={onClose} title={"리뷰 신고 상세 정보"}>
      {report && (
        <div className="space-y-16">
          <InfoField label="신고 사유" value={report.reportType} />
          <InfoField label="신고 메시지" value={report.reportMessage} />
          <InfoField label="신고된 리뷰 내용" value={report.reviewContent} />
          <InfoField
            label="신고 날짜"
            value={getFormatDateString(report.reportDate, "yyyy.MM.dd")}
          />
          <InfoField label="누적 신고 횟수" value={report.reportCount} />
          <InfoField label="숨김 여부" value={report.isHidden ? "숨김" : "노출 중"} />
        </div>
      )}
    </Modal>
  );
}
