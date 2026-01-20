export function InfoField({
  label,
  value,
}: {
  label: string;
  value: React.ReactNode;
}) {
  if (!value) return null; // 값이 없으면 렌더링하지 않음
  return (
    <div>
      <p className="text-sm text-gray-500 mb-4">{label}</p>
      <p className="font-medium">{value}</p>
    </div>
  );
}
