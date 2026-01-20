import type { ColumnDef } from "@tanstack/react-table";
import { useGetAllUsers } from "@/shared/api/users/queries";
import { Table } from "@/shared/components/Table";
import type { WithdrawalUser } from "@/shared/api/users/types";
import { getFormatDateString } from "@repo/utils/formatDateString";

export function WithdrawnUsersPage() {
  const { data, isLoading } = useGetAllUsers();

  const columns: ColumnDef<WithdrawalUser>[] = [
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
      accessorKey: "createdAt",
      header: "탈퇴일",
      cell: ({ getValue }) =>
        getFormatDateString(getValue<string>(), "yyyy.MM.dd"),
    },
    {
      accessorKey: "withdrawalReason",
      header: "탈퇴 사유",
    },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-24">탈퇴 목록</h1>
      <Table
        data={data?.withdrawalUsers || []}
        columns={columns}
        isLoading={isLoading}
        emptyMessage="탈퇴한 회원이 없습니다."
      />
    </div>
  );
}
