import { useState, useMemo } from "react";
import type { ColumnDef } from "@tanstack/react-table";
import { useGetAllSubmissions } from "@/shared/api/submissions/queries";
import { Table } from "@/shared/components/Table";
import { Modal } from "@/shared/components/Modal";
import { FilterTabs } from "@/shared/components/FilterTabs";
import type {
  NewShopSubmission,
  NewProductSubmission,
  NewOperatingSubmission,
} from "@/shared/api/submissions/types";

const ITEMS_PER_PAGE = 20;

type AllSubmissions = (
  | NewShopSubmission
  | NewProductSubmission
  | NewOperatingSubmission
) & {
  category: string;
};

export function SubmissionsPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedSubmission, setSelectedSubmission] =
    useState<AllSubmissions | null>(null);
  const { data, isLoading } = useGetAllSubmissions();

  const allSubmissions: AllSubmissions[] = useMemo(() => {
    if (!data) return [];
    return [
      ...data.newShopSubmissions.map((s) => ({ ...s, category: "새 소품샵" })),
      ...data.newProductSubmissions.map((s) => ({
        ...s,
        category: "상품 추가",
      })),
      ...data.newOperatingSubmissions.map((s) => ({
        ...s,
        category: "운영시간",
      })),
    ].sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    );
  }, [data]);

  const filteredData = useMemo(() => {
    if (statusFilter === "all") return allSubmissions;
    return allSubmissions.filter((s) => s.status === statusFilter);
  }, [allSubmissions, statusFilter]);

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredData.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredData, currentPage]);

  const totalPages = useMemo(() => {
    return Math.ceil(filteredData.length / ITEMS_PER_PAGE);
  }, [filteredData]);

  const columns = useMemo<ColumnDef<AllSubmissions>[]>(
    () => [
      {
        accessorKey: "id",
        header: "ID",
        size: 80,
      },
      {
        accessorKey: "category",
        header: "카테고리",
        size: 120,
      },
      {
        id: "email",
        header: "이메일",
        accessorFn: (row) => row.user.email,
      },
      {
        id: "shopName",
        header: "장소명",
        accessorFn: (row) => row.shop.name,
      },
      {
        id: "location",
        header: "주소",
        accessorFn: (row) => row.shop.location,
      },
      {
        accessorKey: "createdAt",
        header: "등록 날짜",
        cell: ({ getValue }) =>
          new Date(getValue<string>()).toLocaleDateString("ko-KR"),
      },
      {
        accessorKey: "status",
        header: "상태",
        size: 100,
        cell: ({ getValue }) => {
          const statusMap = {
            pending: "대기중",
            approved: "승인됨",
            rejected: "반려됨",
          };
          return statusMap[getValue<"pending" | "approved" | "rejected">()];
        },
      },
    ],
    [],
  );

  const tabs = [
    { label: "전체", value: "all" },
    { label: "대기중", value: "pending" },
    { label: "승인됨", value: "approved" },
    { label: "반려됨", value: "rejected" },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-24">수정 요청 목록</h1>

      <FilterTabs
        tabs={tabs}
        activeTab={statusFilter}
        onChange={setStatusFilter}
      />

      <Table
        data={paginatedData}
        columns={columns}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        onRowClick={setSelectedSubmission}
        isLoading={isLoading}
        emptyMessage="수정 요청이 없습니다."
      />

      {/* Detail Modal */}
      <Modal
        isOpen={!!selectedSubmission}
        onClose={() => setSelectedSubmission(null)}
        title="제출 상세 정보"
      >
        {selectedSubmission && (
          <div className="space-y-16">
            <div>
              <p className="text-sm text-gray-500 mb-4">카테고리</p>
              <p className="font-medium">{selectedSubmission.category}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-4">제보자</p>
              <p className="font-medium">{selectedSubmission.user.email}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-4">장소명</p>
              <p className="font-medium">{selectedSubmission.shop.name}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-4">주소</p>
              <p className="font-medium">{selectedSubmission.shop.location}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-4">위도/경도</p>
              <p className="font-medium">
                {selectedSubmission.shop.lat}, {selectedSubmission.shop.lng}
              </p>
            </div>
            {selectedSubmission.shop.instagram && (
              <div>
                <p className="text-sm text-gray-500 mb-4">인스타그램</p>
                <p className="font-medium">
                  {selectedSubmission.shop.instagram}
                </p>
              </div>
            )}
            <div>
              <p className="text-sm text-gray-500 mb-4">상태</p>
              <p className="font-medium">
                {selectedSubmission.status === "pending" && "대기중"}
                {selectedSubmission.status === "approved" && "승인됨"}
                {selectedSubmission.status === "rejected" && "반려됨"}
              </p>
            </div>
            {selectedSubmission.rejectMessage && (
              <div>
                <p className="text-sm text-gray-500 mb-4">반려 사유</p>
                <p className="font-medium">
                  {selectedSubmission.rejectMessage}
                </p>
              </div>
            )}
          </div>
        )}
      </Modal>
    </div>
  );
}
