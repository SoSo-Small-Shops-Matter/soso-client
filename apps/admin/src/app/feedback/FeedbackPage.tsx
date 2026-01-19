import { useState, useMemo } from "react";
import { useGetAllFeedback } from "@/shared/api/feedback/queries";
import { Table } from "@/shared/components/Table";
import type { Feedback } from "@/shared/api/feedback/types";

const ITEMS_PER_PAGE = 20;

export function FeedbackPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const { data, isLoading } = useGetAllFeedback();

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
      render: (feedback: Feedback) => feedback.num,
      width: "80px",
    },
    {
      key: "email",
      header: "이메일",
      render: (feedback: Feedback) => feedback.email,
    },
    {
      key: "feedback",
      header: "피드백 및 문의 내용",
      render: (feedback: Feedback) => feedback.feedback,
    },
    {
      key: "createdAt",
      header: "등록 날짜",
      render: (feedback: Feedback) =>
        new Date(feedback.createdAt).toLocaleDateString("ko-KR"),
    },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-24">문의 및 피드백</h1>

      <Table
        data={paginatedData}
        columns={columns}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        isLoading={isLoading}
        emptyMessage="피드백이 없습니다."
      />
    </div>
  );
}
