import { NavLink } from "react-router-dom";

const sidebarRoutes = [
  {
    path: "/",
    name: "Home",
    icon: "💒"
  },
  {
    path: "/products",
    name: "All Products",
    icon: "🥗"
  },
  {
    path: "/add",
    name: "Add Product",
    icon: "🥗"
  },
]

export default function Sidebar() {
  console.log("rendering")
  return (
    <aside
      className="md:w-1/6 md:h-screen shadow-lg shadow-gray-400 bg-gray-50 dark:bg-gray-800"
      aria-label="Sidebar"
    >
      <div className="overflow-y-auto py-4 px-3 ">
        <ul className="space-y-2">
          {sidebarRoutes.map(route => (
            <li key={route.path}>
              <NavLink
                to={route.path}
                className={({ isActive }) =>
                  isActive
                    ? "active-route flex items-center p-2 text-base font-normal text-gray-900 dark:text-white bg-gray-100 dark:bg-gray-700"
                    : "flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                }
              >
                {typeof route.icon === "string" ? route.icon : <route.icon />}
                <span className="ml-3">{route.name}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
