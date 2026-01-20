import { useState } from "react";
import { useGetReviewReports } from "@/shared/api/review-reports/queries";
import { Table } from "@/shared/components/Table";
import type { ReviewReport } from "@/shared/api/review-reports/types";
import { getFormatDateString } from "@repo/utils";
import { ColumnDef } from "@tanstack/react-table";
import { ReviewReportDetailModal } from "./components/ReviewReportDetailModal";

export function ReviewReportsPage() {
  const [selectedReport, setSelectedReport] = useState<ReviewReport | null>(
    null,
  );
  const { data, isLoading } = useGetReviewReports();

  const columns: ColumnDef<ReviewReport>[] = [
    {
      accessorKey: "num",
      header: "ID",
      size: 20,
    },
    {
      accessorKey: "userEmail",
      header: "이메일",
    },
    {
      accessorKey: "reportType",
      header: "신고 사유",
    },
    {
      accessorKey: "reviewContent",
      header: "신고 후기",
      cell: ({ getValue }) => {
        const content = getValue<string>();
        return content.length > 50 ? content.substring(0, 50) + "..." : content;
      },
    },
    {
      accessorKey: "reportDate",
      header: "등록 날짜",
      cell: ({ getValue }) =>
        getFormatDateString(getValue<string>(), "yyyy.MM.dd"),
    },
  ];

  const onModalClose = () => {
    setSelectedReport(null);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-24">리뷰 신고 목록</h1>

      <Table
        data={data || []}
        columns={columns}
        onRowClick={setSelectedReport}
        isLoading={isLoading}
        emptyMessage="신고된 리뷰가 없습니다."
      />

      {/* Detail Modal */}
      <ReviewReportDetailModal report={selectedReport} onClose={onModalClose} />
    </div>
  );
}
