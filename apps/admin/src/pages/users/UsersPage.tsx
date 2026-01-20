import type { ColumnDef } from "@tanstack/react-table";
import { useGetAllUsers } from "@/shared/api/users/queries";
import { Table } from "@/shared/components/Table";
import type { ActivityUser } from "@/shared/api/users/types";
import { getFormatDateString } from "@repo/utils/formatDateString";

export function UsersPage() {
  const { data, isLoading } = useGetAllUsers();

  const columns: ColumnDef<ActivityUser>[] = [
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
      accessorKey: "nickName",
      header: "닉네임",
    },
    {
      accessorKey: "createdAt",
      header: "가입일",
      cell: ({ getValue }) =>
        getFormatDateString(getValue<string>(), "yyyy.MM.dd"),
    },
    {
      accessorKey: "lastActivityAt",
      header: "최근 접속일",
      cell: ({ getValue }) =>
        getFormatDateString(getValue<string>(), "yyyy.MM.dd"),
    },
    {
      accessorKey: "provider",
      header: "가입 경로",
      size: 120,
    },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-24">회원 목록</h1>
      <Table
        data={data?.activityUsers || []}
        columns={columns}
        isLoading={isLoading}
        emptyMessage="활동 중인 회원이 없습니다."
      />
    </div>
  );
}
