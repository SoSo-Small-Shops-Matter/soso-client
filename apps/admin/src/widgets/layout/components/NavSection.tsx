import { Link, NavLink, useLocation } from "react-router-dom";

export interface NavSection {
  title: string;
  items: {
    name: string;
    path: string;
  }[];
}
interface NavSectionProps {
  section: NavSection;
}

export function NavSection({ section }: NavSectionProps) {
  const { title, items } = section;
  const location = useLocation();

  const isSectionActive = items.some(
    (item) =>
      location.pathname === item.path ||
      location.pathname.startsWith(item.path + "/"),
  );

  const getLinkStyle = (isActive: boolean) =>
    `text-sm font-semibold transition-colors ${isActive ? "text-main" : "text-gray-700 hover:text-gray-900"}`;

  return (
    <div className="flex flex-col gap-16 py-12">
      <Link to={items[0].path} className={getLinkStyle(isSectionActive)}>
        {title}
      </Link>
      <div className="w-full h-[20px]">
        {isSectionActive && (
          <div className="flex gap-8 absolute">
            {items.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) => getLinkStyle(isActive)}
              >
                {item.name}
              </NavLink>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
