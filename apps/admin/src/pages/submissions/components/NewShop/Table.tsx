import { useGetNewShopSubmissions } from "@/shared/api/submissions/queries";
import { Table } from "@/shared/components/Table";
import { NewShopSubmission } from "@/shared/api/submissions/types";
import { useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { SubmissionDetailModal } from "./DetailModal";
import { categoryMap, statusMap } from "../../constants";

export function NewShopTable({
  columns,
}: {
  columns: ColumnDef<NewShopSubmission>[];
}) {
  const { data, isLoading } = useGetNewShopSubmissions();
  const [selectedSubmission, setSelectedSubmission] =
    useState<NewShopSubmission | null>(null);

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
      <SubmissionDetailModal
        submission={selectedSubmission}
        onClose={onModalClose}
        categoryMap={categoryMap}
        statusMap={statusMap}
      />
    </>
  );
}
