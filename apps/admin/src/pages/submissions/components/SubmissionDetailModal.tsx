import type {
  SubmissionType,
  SubmissionStatus,
  AllSubmission,
} from "@/shared/api/submissions/types";
import { Modal } from "@/shared/components/Modal";
import { InfoField } from "@/shared/components/ModalInfoField";

interface SubmissionDetailModalProps {
  submission: AllSubmission | null;
  onClose: () => void;
  categoryMap: Record<SubmissionType, string>;
  statusMap: Record<SubmissionStatus, string>;
}

export function SubmissionDetailModal({
  submission,
  onClose,
  categoryMap,
  statusMap,
}: SubmissionDetailModalProps) {
  return (
    <Modal isOpen={!!submission} onClose={onClose} title={"제보 상세 정보"}>
      {submission && (
        <div className="space-y-16">
          <InfoField label="카테고리" value={categoryMap[submission.type]} />
          <InfoField label="제보자" value={submission.user.email} />
          <InfoField label="장소명" value={submission.shop?.name || "-"} />
          <InfoField label="주소" value={submission.shop?.location || "-"} />
          <InfoField
            label="위도/경도"
            value={
              submission.shop
                ? `${submission.shop.lat}, ${submission.shop.lng}`
                : "-"
            }
          />
          <InfoField
            label="인스타그램"
            value={submission.shop?.instagram || "-"}
          />
          <InfoField label="상태" value={statusMap[submission.status]} />
          <InfoField label="반려 사유" value={submission.rejectMessage} />
        </div>
      )}
    </Modal>
  );
}
