import { useAuth } from "@/src/contexts/AuthContext";
import { useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight, Menu, X } from "lucide-react";

const AdminLayout: React.FC = () => {
  const location = useLocation();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [collapsed, setCollapsed] = useState(false); // Desktop collapse
  const [mobileOpen, setMobileOpen] = useState(false); // Mobile toggle

  const navItems = [
    { name: "Dashboard", path: "/admin/dashboard", icon: "grid_view" },
    { name: "Projects", path: "/admin/projects", icon: "work" },
    { name: "Blog", path: "/admin/blog", icon: "article" },
    { name: "Skills", path: "/admin/skills", icon: "handyman" },
    { name: "Experience", path: "/admin/experience", icon: "timeline" },
    { name: "Testimonials", path: "/admin/testimonials", icon: "reviews" },
    { name: "Messages", path: "/admin/messages", icon: "mail", badge: 3 },
    { name: "Settings", path: "/admin/settings", icon: "settings" },
  ];

  const SidebarContent = () => (
    <div className="flex flex-col justify-between h-screen p-4 bg-background-dark w-full">
      <div className="flex flex-col gap-8">
        <div
          className={`flex gap-3 items-center ${collapsed ? "justify-center" : ""}`}
        >
          <div className="size-10 rounded-full bg-primary/20 flex items-center justify-center text-primary">
            <span className="material-symbols-outlined text-[28px]">
              admin_panel_settings
            </span>
          </div>
          {!collapsed && (
            <div className="flex flex-col cursor-pointer" onClick={() => navigate("/")}>
              <h1 className="text-white text-base font-bold leading-normal">
                Admin Panel
              </h1>
              <p className="text-[#9db2b9] text-xs">Portfolio Manager</p>
            </div>
          )}
        </div>

        <nav className="flex flex-col gap-1">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setMobileOpen(false)} // Close on mobile
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors group ${
                location.pathname === item.path
                  ? "bg-primary/10 text-primary border-l-4 border-primary"
                  : "text-text-secondary hover:bg-surface-dark hover:text-white"
              }`}
            >
              <span className="material-symbols-outlined">{item.icon}</span>
              {!collapsed && <p className="text-sm font-medium">{item.name}</p>}
              {!collapsed && item.badge && (
                <span className="ml-auto bg-primary text-background-dark text-[10px] font-bold px-2 py-0.5 rounded-full">
                  {item.badge}
                </span>
              )}
            </Link>
          ))}
        </nav>
      </div>

      <Link
        to="/"
        onClick={() => {
          logout();
          setMobileOpen(false);
        }}
        className={`flex items-center gap-3 px-3 py-2 rounded-lg text-text-secondary hover:text-red-400 cursor-pointer transition-colors ${
          collapsed ? "justify-center" : ""
        }`}
      >
        <span className="material-symbols-outlined">logout</span>
        {!collapsed && (
          <p className="text-sm font-medium leading-normal">Sign Out</p>
        )}
      </Link>
    </div>
  );

  return (
    <div className="flex h-screen w-full overflow-hidden bg-background-dark">
      {/* Desktop Sidebar */}
      <aside
        className={`hidden md:flex flex-shrink-0 transition-all duration-300 ${
          collapsed ? "w-20" : "w-64"
        } border-r border-border-dark`}
      >
        <SidebarContent />
      </aside>

      {/* Mobile Sidebar Overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Mobile Sliding Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-background-dark transform transition-transform duration-300 md:hidden ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        } border-r border-border-dark`}
      >
        <div className="absolute top-0 right-0 flex items-center justify-between p-4 ">
          <button
            onClick={() => setMobileOpen(false)}
            className="p-1 hover:bg-surface-dark/50 rounded"
          >
            <X size={20} />
          </button>
        </div>
        <SidebarContent />
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Header */}
        <header className="flex items-center justify-between border-b border-border-dark bg-background-dark/95 backdrop-blur-sm px-4 md:px-6 py-4 sticky top-0 z-20 w-full">
          <div className="flex items-center gap-4">
            {/* Mobile menu button */}
            <button
              className="md:hidden p-1 rounded hover:bg-surface-dark/50"
              onClick={() => setMobileOpen(true)}
            >
              <Menu size={20} />
            </button>

            {/* Desktop collapse */}
            <button
              className="hidden md:block p-1 rounded hover:bg-surface-dark/50"
              onClick={() => setCollapsed(!collapsed)}
              title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            >
              {collapsed ? (
                <ChevronRight size={20} />
              ) : (
                <ChevronLeft size={20} />
              )}
            </button>

            <h2 className="text-white text-lg font-bold leading-tight capitalize hidden md:block">
              {location.pathname.split("/").pop()}
            </h2>
          </div>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3">
              <span className="text-text-secondary text-sm">
                Welcome, {user?.name}
              </span>
              <div className="relative">
                <span className="material-symbols-outlined text-text-secondary hover:text-white cursor-pointer">
                  notifications
                </span>
                <span className="absolute top-0 right-0 size-2 bg-primary rounded-full"></span>
              </div>
              <div
                className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-9 ring-2 ring-primary/20"
                style={{
                  backgroundImage: `url('https://picsum.photos/100/100?random=50')`,
                }}
              ></div>
            </div>
          </div>
        </header>

        {/* Scrollable main */}
        <main className="flex-1 overflow-y-auto p-6 md:p-10">
          <Outlet />
        </main>

        {/* Footer */}
        <footer className="border-t border-border-dark bg-background-dark/95 backdrop-blur-sm py-4 text-center text-text-secondary text-xs">
          © {new Date().getFullYear()} Portfolio Admin Panel. All rights
          reserved.
        </footer>
      </div>
    </div>
  );
};

export default AdminLayout;
