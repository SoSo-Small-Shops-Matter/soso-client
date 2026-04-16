interface HiddenToggleButtonProps {
  id: number;
  isHidden: boolean;
  isPending: boolean;
  onToggle: (id: number, isHidden: boolean) => void;
}

export function HiddenToggleButton({
  id,
  isHidden,
  isPending,
  onToggle,
}: HiddenToggleButtonProps) {
  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        onToggle(id, isHidden);
      }}
      disabled={isPending}
      className={`px-12 py-6 text-sm rounded-6 transition-colors ${
        isHidden
          ? "bg-green-100 text-green-700 hover:bg-green-200"
          : "bg-red-100 text-red-700 hover:bg-red-200"
      } disabled:opacity-50`}
    >
      {isHidden ? "노출하기" : "숨기기"}
    </button>
  );
}
