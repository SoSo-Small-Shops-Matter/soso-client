interface SubmissionChangeFieldProps {
  title: string;
  asIsContent: string | null | undefined;
  toBeContent: string | null | undefined;
}

export function SubmissionChangeField({
  title,
  asIsContent,
  toBeContent,
}: SubmissionChangeFieldProps) {
  return (
    <div className="border-gray-300 border rounded-md p-12">
      <h3 className="font-semibold pb-4 text-gray-800">
        {title} <span className="text-red-500 text-xs">●</span>
      </h3>
      <div className="flex items-center gap-4 text-sm mt-4">
        {/* 현재 (기존) */}
        <div className="flex-1 space-y-2">
          <p className="text-gray-400 text-xs">현재</p>
          <div className="p-4 rounded border border-gray-300 text-gray-500 bg-gray-50 min-h-[48px] flex items-center">
            {asIsContent || "없음"}
          </div>
        </div>

        <span className="text-red-400 mt-6 shrink-0">→</span>

        {/* 수정 요청 (새로운) */}
        <div className="flex-1 space-y-2">
          <p className="text-gray-400 text-xs">수정 요청</p>
          <div className="p-4 rounded border border-red-300 text-red-400 bg-red-50 min-h-[48px] flex items-center">
            {toBeContent || "없음"}
          </div>
        </div>
      </div>
    </div>
  );
}
