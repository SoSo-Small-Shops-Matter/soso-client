import type {
  SubmissionType,
  SubmissionStatus,
  NewShopSubmission,
} from "@/shared/api/submissions/types";
import { InfoField } from "@/shared/components/ModalInfoField";
import {
  useAcceptNewShopSubmission,
  useRejectNewShopSubmission,
} from "@/shared/api/submissions/queries";
import { SubmissionDetailModalContainer } from "../SubmissionDetailModalContainer";
import { getDayLabel } from "@repo/utils/days";

interface SubmissionDetailModalProps {
  submission: NewShopSubmission | null;
  onClose: () => void;
  categoryMap: Record<SubmissionType, string>;
  statusMap: Record<SubmissionStatus, string>;
}

export function SubmissionDetailModal({
  submission,
  onClose,
}: SubmissionDetailModalProps) {
  const acceptNewShopMutation = useAcceptNewShopSubmission();
  const rejectNewShopMutation = useRejectNewShopSubmission();

  const isPending =
    acceptNewShopMutation.isPending || rejectNewShopMutation.isPending;

  const handleAccept = () => {
    if (!submission) return;

    acceptNewShopMutation.mutate(submission.id, { onSuccess: onClose });
  };

  const handleReject = (reason: string) => {
    if (!submission || !reason.trim()) return;

    const data = { rejectMessage: reason };

    rejectNewShopMutation.mutate(
      { submissionId: submission.id, data },
      { onSuccess: onClose },
    );
  };

  if (!submission) return null;
  const { shopProducts, shopOperatingHour } = submission;
  return (
    <SubmissionDetailModalContainer
      submission={submission}
      onClose={onClose}
      handleAccept={handleAccept}
      handleReject={handleReject}
      isPending={isPending}
    >
      <div className="space-y-8">
        <h3 className="font-semibold pb-4 text-gray-800">새 소품샵 상세</h3>
        {shopProducts.length > 0 && (
          <InfoField
            label="판매 상품"
            value={shopProducts.map((p) => p.name).join(", ") || "없음"}
          />
        )}
        {shopOperatingHour && (
          <InfoField
            label="운영시간"
            value={shopOperatingHour.daysOfWeek
              ?.map((d) => getDayLabel(d))
              .join(", ")}
          />
        )}
        {shopOperatingHour && (
          <InfoField
            label="운영시간"
            value={`${shopOperatingHour.startTime} ~ ${shopOperatingHour.endTime}`}
          />
        )}
      </div>
    </SubmissionDetailModalContainer>
  );
}
