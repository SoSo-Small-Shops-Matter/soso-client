interface Tab {
  label: string;
  value: string;
}

interface FilterTabsProps {
  tabs: Tab[];
  activeTab: string;
  onChange: (value: string) => void;
}

export function FilterTabs({ tabs, activeTab, onChange }: FilterTabsProps) {
  return (
    <div className="flex gap-8 border-b border-gray-200 mb-20">
      {tabs.map((tab) => (
        <button
          key={tab.value}
          onClick={() => onChange(tab.value)}
          className={`px-16 py-12 text-sm font-medium border-b-2 transition-colors ${
            activeTab === tab.value
              ? "border-main text-main"
              : "border-transparent text-gray-500 hover:text-gray-700"
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
