import type { NewOperatingSubmission } from "@/shared/api/submissions/types";
import {
  useAcceptOperatingInfoSubmission,
  useRejectOperatingInfoSubmission,
} from "@/shared/api/submissions/queries";
import { SubmissionDetailModalContainer } from "../SubmissionDetailModalContainer";
import { getDayLabel } from "@repo/utils";
import { SubmissionChangeField } from "../SubmissionChangeField";

interface SubmissionDetailModalProps {
  submission: NewOperatingSubmission | null;
  onClose: () => void;
}

export function NewOperationDetailModal({
  submission,
  onClose,
}: SubmissionDetailModalProps) {
  const acceptOperatingMutation = useAcceptOperatingInfoSubmission();
  const rejectOperatingMutation = useRejectOperatingInfoSubmission();

  const isPending =
    acceptOperatingMutation.isPending || rejectOperatingMutation.isPending;

  const handleAccept = () => {
    if (!submission) return;

    acceptOperatingMutation.mutate(submission.id, { onSuccess: onClose });
  };

  const handleReject = (reason: string) => {
    if (!submission || !reason.trim()) return;

    const data = { rejectMessage: reason };

    rejectOperatingMutation.mutate(
      { submissionId: submission.id, data },
      { onSuccess: onClose },
    );
  };

  const isEqualDayOfWeek = (a: string[], b: string[]) => {
    if (a?.length !== b?.length) return false; // 길이부터 다르면 탈락
    const setB = new Set(b);
    return a.every((item) => setB.has(item));
  };

  if (!submission) return null;

  const { shopOperatingHour, newShopOperatingHour } = submission;

  const isTimeChanged =
    shopOperatingHour.startTime !== newShopOperatingHour.startTime ||
    shopOperatingHour.endTime !== newShopOperatingHour.endTime;

  const isDayOfWeekChanged = !isEqualDayOfWeek(
    shopOperatingHour.daysOfWeek ?? [],
    newShopOperatingHour.daysOfWeek ?? [],
  );

  const isPhoneChanged =
    shopOperatingHour.phoneNumber !== newShopOperatingHour.phoneNumber;

  return (
    <SubmissionDetailModalContainer
      submission={submission}
      onClose={onClose}
      handleAccept={handleAccept}
      handleReject={handleReject}
      isPending={isPending}
    >
      <div className="space-y-4">
        <h3 className="font-semibold pb-4 text-gray-800">변경사항 비교</h3>
        {isPhoneChanged && (
          <SubmissionChangeField
            title="전화번호"
            asIsContent={shopOperatingHour.phoneNumber}
            toBeContent={newShopOperatingHour.phoneNumber}
          />
        )}
        {isDayOfWeekChanged && (
          <SubmissionChangeField
            title="운영요일"
            asIsContent={shopOperatingHour.daysOfWeek
              ?.map((d) => getDayLabel(d))
              .join(", ")}
            toBeContent={newShopOperatingHour.daysOfWeek
              ?.map((d) => getDayLabel(d))
              .join(", ")}
          />
        )}
        {isTimeChanged && (
          <SubmissionChangeField
            title="운영시간"
            asIsContent={`${shopOperatingHour.startTime} ~ ${shopOperatingHour.endTime}`}
            toBeContent={`${newShopOperatingHour.startTime} ~ ${newShopOperatingHour.endTime}`}
          />
        )}
      </div>
    </SubmissionDetailModalContainer>
  );
}
