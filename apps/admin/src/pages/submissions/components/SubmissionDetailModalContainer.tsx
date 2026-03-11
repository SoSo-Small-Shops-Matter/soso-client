import { PropsWithChildren, useState } from "react";
import type { AllSubmission } from "@/shared/api/submissions/types";
import { Modal } from "@/shared/components/Modal";
import { InfoField } from "@/shared/components/ModalInfoField";
import { categoryMap, statusMap } from "../constants";

interface SubmissionDetailModalProps extends PropsWithChildren {
  submission: AllSubmission | null;
  onClose: () => void;
  handleAccept: () => void;
  handleReject: (reason: string) => void;
  isPending: boolean;
}

export function SubmissionDetailModalContainer({
  submission,
  onClose,
  isPending,
  handleAccept,
  handleReject,
  children,
}: SubmissionDetailModalProps) {
  const [rejectReason, setRejectReason] = useState("");

  const handleClose = () => {
    setRejectReason("");
    onClose();
  };

  if (!submission) return null;

  return (
    <Modal isOpen={true} onClose={handleClose} title="제보 상세 정보">
      <div>
        {/* 공통 정보 */}
        <InfoField label="카테고리" value={categoryMap[submission.type]} />
        <InfoField label="제보자" value={submission.user.email} />
        <InfoField label="장소명" value={submission.shop?.name || "-"} />
        <InfoField label="주소" value={submission.shop?.location || "-"} />
        <InfoField label="상태" value={statusMap[submission.status]} />
        {submission.rejectMessage && (
          <InfoField label="반려 사유" value={submission.rejectMessage} />
        )}

        <hr className="my-16" />

        {children}

        {/* pending 상태일 때 버튼 UI 보이기 */}
        {submission.status === "pending" && (
          <div className="pt-24 space-y-16">
            <hr className="my-16" />
            <div className="space-y-8">
              <label className="block text-sm font-medium text-gray-700">
                반려 사유
              </label>
              <textarea
                value={rejectReason}
                onChange={(e) => setRejectReason(e.target.value)}
                placeholder="반려 시 입력해주세요"
                className="w-full border rounded-md p-8 text-sm outline-none focus:ring-1 focus:ring-gray-300 min-h-[80px]"
              />
            </div>
            <div className="flex gap-8 justify-end">
              <button
                disabled={isPending || !rejectReason.trim()}
                onClick={() => handleReject(rejectReason)}
                className="px-16 py-8 border rounded-md text-red-600 font-medium hover:bg-red-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                반려
              </button>
              <button
                disabled={isPending}
                onClick={handleAccept}
                className="px-16 py-8 bg-gray-900 border text-white rounded-md font-medium hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                승인
              </button>
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
}
