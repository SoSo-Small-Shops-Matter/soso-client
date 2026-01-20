import { useGetAllFeedback } from "@/shared/api/feedback/queries";
import { Feedback } from "@/shared/api/feedback/types";
import { Table } from "@/shared/components/Table";
import { getFormatDateString } from "@repo/utils/formatDateString";
import { ColumnDef } from "@tanstack/react-table";

export function FeedbackPage() {
  const { data, isLoading } = useGetAllFeedback();

  const columns: ColumnDef<Feedback>[] = [
    {
      accessorKey: "num",
      header: "ID",
      size: 20,
    },
    {
      accessorKey: "email",
      header: "이메일",
    },
    {
      accessorKey: "feedback",
      header: "피드백 및 문의 내용",
    },
    {
      accessorKey: "createdAt",
      header: "등록 날짜",
      cell: ({ getValue }) =>
        getFormatDateString(getValue<string>(), "yyyy.MM.dd"),
    },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-24">문의 및 피드백</h1>

      <Table
        data={data || []}
        columns={columns}
        isLoading={isLoading}
        emptyMessage="피드백이 없습니다."
      />
    </div>
  );
}
