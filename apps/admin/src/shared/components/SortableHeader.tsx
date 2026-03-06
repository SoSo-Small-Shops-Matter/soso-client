import {
  type Order,
  type SortBy,
  Order as OrderEnum,
} from "@/shared/api/users/types";

interface SortableHeaderProps {
  label: string;
  sortKey: SortBy;
  currentSortBy?: SortBy;
  currentOrder?: Order;
  onSort: (sortBy: SortBy, order: Order) => void;
}

export function SortableHeader({
  label,
  sortKey,
  currentSortBy,
  currentOrder,
  onSort,
}: SortableHeaderProps) {
  const isActive = currentSortBy === sortKey;

  const handleClick = () => {
    if (!isActive) {
      onSort(sortKey, OrderEnum.DESC);
    } else if (currentOrder === OrderEnum.DESC) {
      onSort(sortKey, OrderEnum.ASC);
    } else {
      onSort(sortKey, OrderEnum.DESC);
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className="sort-header"
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "4px",
        background: "none",
        border: "none",
        cursor: "pointer",
        padding: 0,
        font: "inherit",
        fontWeight: 600,
        color: isActive ? "#111827" : "#374151",
      }}
    >
      {label}
      <span
        style={{
          display: "inline-flex",
          flexDirection: "column",
          fontSize: "10px",
          lineHeight: 1,
          gap: "1px",
          opacity: isActive ? 1 : 0.3,
        }}
      >
        <span
          style={{
            color:
              isActive && currentOrder === OrderEnum.ASC
                ? "#2563eb"
                : "#9ca3af",
          }}
        >
          ▲
        </span>
        <span
          style={{
            color:
              isActive && currentOrder === OrderEnum.DESC
                ? "#2563eb"
                : "#9ca3af",
          }}
        >
          ▼
        </span>
      </span>
    </button>
  );
}
