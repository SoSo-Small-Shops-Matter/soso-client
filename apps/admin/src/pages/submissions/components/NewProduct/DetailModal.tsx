import type { NewProductSubmission } from "@/shared/api/submissions/types";
import {
  useAcceptProductSubmission,
  useRejectProductSubmission,
} from "@/shared/api/submissions/queries";
import { SubmissionDetailModalContainer } from "../SubmissionDetailModalContainer";
import { SubmissionChangeField } from "../SubmissionChangeField";

interface SubmissionDetailModalProps {
  submission: NewProductSubmission | null;
  onClose: () => void;
}

export function NewProductDetailModal({
  submission,
  onClose,
}: SubmissionDetailModalProps) {
  const acceptProductMutation = useAcceptProductSubmission();
  const rejectProductMutation = useRejectProductSubmission();

  const isPending =
    acceptProductMutation.isPending || rejectProductMutation.isPending;

  const handleAccept = () => {
    if (!submission) return;

    acceptProductMutation.mutate(submission.id, { onSuccess: onClose });
  };

  const handleReject = (reason: string) => {
    if (!submission || !reason.trim()) return;

    const data = { rejectMessage: reason };

    rejectProductMutation.mutate(
      { submissionId: submission.id, data },
      { onSuccess: onClose },
    );
  };

  if (!submission) return null;

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
        <SubmissionChangeField
          title="판매상품"
          asIsContent={submission.shopProducts.map((p) => p.name).join(", ")}
          toBeContent={submission.newShopProducts.map((p) => p.name).join(", ")}
        />
      </div>
    </SubmissionDetailModalContainer>
  );
}
