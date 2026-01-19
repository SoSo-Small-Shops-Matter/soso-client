import { useState, useMemo } from "react";
import { useGetReviewReports } from "@/shared/api/review-reports/queries";
import { Table } from "@/shared/components/Table";
import { Modal } from "@/shared/components/Modal";
import type { ReviewReport } from "@/shared/api/review-reports/types";

const ITEMS_PER_PAGE = 20;

export function ReviewReportsPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedReport, setSelectedReport] = useState<ReviewReport | null>(
    null,
  );
  const { data, isLoading } = useGetReviewReports();

  const paginatedData = useMemo(() => {
    if (!data) return [];
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return data.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [data, currentPage]);

  const totalPages = useMemo(() => {
    if (!data) return 1;
    return Math.ceil(data.length / ITEMS_PER_PAGE);
  }, [data]);

  const columns = [
    {
      key: "num",
      header: "ID",
      render: (report: ReviewReport) => report.num,
      width: "80px",
    },
    {
      key: "userEmail",
      header: "이메일",
      render: (report: ReviewReport) => report.userEmail,
    },
    {
      key: "reportType",
      header: "신고 사유",
      render: (report: ReviewReport) => report.reportType,
    },
    {
      key: "reviewContent",
      header: "신고 후기",
      render: (report: ReviewReport) => {
        const truncated =
          report.reviewContent.length > 50
            ? report.reviewContent.substring(0, 50) + "..."
            : report.reviewContent;
        return truncated;
      },
    },
    {
      key: "reportDate",
      header: "등록 날짜",
      render: (report: ReviewReport) =>
        new Date(report.reportDate).toLocaleDateString("ko-KR"),
    },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-24">리뷰 신고 목록</h1>

      <Table
        data={paginatedData}
        columns={columns}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        onRowClick={setSelectedReport}
        isLoading={isLoading}
        emptyMessage="신고된 리뷰가 없습니다."
      />

      {/* Detail Modal */}
      <Modal
        isOpen={!!selectedReport}
        onClose={() => setSelectedReport(null)}
        title="리뷰 신고 상세 정보"
      >
        {selectedReport && (
          <div className="space-y-16">
            <div>
              <p className="text-sm text-gray-500 mb-4">신고자 이메일</p>
              <p className="font-medium">{selectedReport.userEmail}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-4">신고 사유</p>
              <p className="font-medium">{selectedReport.reportType}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-4">신고 메시지</p>
              <p className="font-medium">{selectedReport.reportMessage}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-4">신고된 리뷰 내용</p>
              <p className="font-medium whitespace-pre-wrap">
                {selectedReport.reviewContent}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-4">신고 날짜</p>
              <p className="font-medium">
                {new Date(selectedReport.reportDate).toLocaleString("ko-KR")}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-4">누적 신고 횟수</p>
              <p className="font-medium">{selectedReport.reportCount}회</p>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
