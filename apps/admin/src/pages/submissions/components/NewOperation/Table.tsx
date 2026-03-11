import { useGetNewOperatingSubmissions } from "@/shared/api/submissions/queries";
import { NewOperatingSubmission } from "@/shared/api/submissions/types";
import { Table } from "@/shared/components/Table";
import { ColumnDef } from "@tanstack/react-table";
import { useState } from "react";
import { NewOperationDetailModal } from "./DetailModal";

export function NewOperationTable({
  columns,
}: {
  columns: ColumnDef<NewOperatingSubmission>[];
}) {
  const { data, isLoading } = useGetNewOperatingSubmissions();

  const [selectedSubmission, setSelectedSubmission] =
    useState<NewOperatingSubmission | null>(null);

  const onModalClose = () => {
    setSelectedSubmission(null);
  };

  return (
    <>
      <Table
        data={data || []}
        columns={columns}
        onRowClick={setSelectedSubmission}
        isLoading={isLoading}
        emptyMessage="수정 요청이 없습니다."
      />
      <NewOperationDetailModal
        submission={selectedSubmission}
        onClose={onModalClose}
      />
    </>
  );
}
