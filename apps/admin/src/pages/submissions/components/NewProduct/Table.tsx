import { useGetNewProductSubmissions } from "@/shared/api/submissions/queries";
import { Table } from "@/shared/components/Table";
import { NewProductSubmission } from "@/shared/api/submissions/types";
import { useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { NewProductDetailModal } from "./DetailModal";

export function NewProductTable({
  columns,
}: {
  columns: ColumnDef<NewProductSubmission>[];
}) {
  const { data, isLoading } = useGetNewProductSubmissions();
  const [selectedSubmission, setSelectedSubmission] =
    useState<NewProductSubmission | null>(null);

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
      <NewProductDetailModal
        submission={selectedSubmission}
        onClose={onModalClose}
      />
    </>
  );
}
