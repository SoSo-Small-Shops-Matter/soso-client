import { NavSection } from "./NavSection";

interface AdminNavProps {
  navigation: NavSection[];
}

export function AdminNav({ navigation }: AdminNavProps) {
  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="px-24">
        <div className="flex gap-32">
          {navigation.map((section) => (
            <NavSection key={section.title} section={section} />
          ))}
        </div>
      </div>
    </nav>
  );
}
