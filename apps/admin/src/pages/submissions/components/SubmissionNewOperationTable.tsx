import { useGetNewOperatingSubmissions } from "@/shared/api/submissions/queries";
import { Table } from "@/shared/components/Table";
import { SubTableProps } from "../SubmissionsPage";

export function SubmissionNewOperationTable({
  columns,
  onSelect,
}: SubTableProps) {
  const { data, isLoading } = useGetNewOperatingSubmissions();
  return (
    <Table
      data={data || []}
      columns={columns}
      onRowClick={onSelect}
      isLoading={isLoading}
      emptyMessage="수정 요청이 없습니다."
    />
  );
}
