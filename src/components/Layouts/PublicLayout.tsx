import { useAuth } from "@/src/contexts/AuthContext";
import { usePublicProfile } from "@/src/hooks/useData";
import { useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";

const PublicLayout: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { isAuthenticated, logout } = useAuth();
  const { profile, loading } = usePublicProfile();

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Projects", path: "/projects" },
    { name: "Blog", path: "/blog" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background-light dark:bg-background-dark">
      <header className="sticky top-0 z-50 w-full border-b border-gray-200 dark:border-border-dark bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center gap-2">
              <div className="size-8 text-primary flex items-center justify-center bg-primary/10 rounded-lg">
                <span className="material-symbols-outlined">code</span>
              </div>
              <span className="text-xl font-bold tracking-tight">
                DevPortfolio
              </span>
            </Link>
            <nav className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`text-sm font-medium hover:text-primary transition-colors ${
                    location.pathname === link.path
                      ? "text-primary"
                      : "text-slate-600 dark:text-slate-400"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </nav>
            <div className="flex items-center gap-4">
              {isAuthenticated && (
                <button
                  onClick={logout}
                  className="hidden md:flex items-center justify-center px-4 h-10 rounded-lg bg-red-500/10 text-red-400 border border-red-500/20 font-bold text-sm hover:bg-red-500/20 transition-all"
                >
                  Logout
                </button>
              )}
              <Link
                to="/contact"
                className="hidden md:flex items-center justify-center px-4 h-10 rounded-lg bg-primary text-background-dark font-bold text-sm hover:opacity-90 transition-opacity"
              >
                Hire Me
              </Link>
              <button
                className="md:hidden flex items-center justify-center size-10 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-surface-dark transition-colors"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                <span className="material-symbols-outlined">
                  {isMenuOpen ? "close" : "menu"}
                </span>
              </button>
            </div>
          </div>
        </div>
        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-background-light dark:bg-background-dark border-b border-border-dark p-4 flex flex-col gap-4 animate-in slide-in-from-top duration-300">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="text-lg font-bold"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <Link
              to="/admin"
              className="text-sm font-medium text-slate-400"
              onClick={() => setIsMenuOpen(false)}
            >
              Admin Access
            </Link>
            {isAuthenticated && (
              <button
                onClick={() => {
                  logout();
                  setIsMenuOpen(false);
                }}
                className="text-sm font-medium text-red-400"
              >
                Logout
              </button>
            )}
          </div>
        )}
      </header>
      <main className="flex-1">
        <Outlet />
      </main>
      <footer className="bg-white dark:bg-surface-dark border-t border-slate-200 dark:border-border-dark pt-16 pb-8">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div className="col-span-1 md:col-span-1">
              <div className="flex items-center gap-2 mb-6">
                <div className="size-8 text-primary flex items-center justify-center bg-primary/10 rounded-lg">
                  <span className="material-symbols-outlined">code</span>
                </div>
                <span className="text-xl font-bold tracking-tight">
                  DevPortfolio
                </span>
              </div>
              <p className="text-slate-500 text-sm mb-6">
                Building digital products, brands, and experiences. Connect with
                me on social media.
              </p>
            </div>
            <div className="col-span-1">
              <h3 className="font-bold mb-4">Quick Links</h3>
              <ul className="space-y-3 text-sm text-slate-500 dark:text-slate-400">
                <li>
                  <Link to="/" className="hover:text-primary transition-colors">
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    to="/about"
                    className="hover:text-primary transition-colors"
                  >
                    About Me
                  </Link>
                </li>
                <li>
                  <Link
                    to="/projects"
                    className="hover:text-primary transition-colors"
                  >
                    Projects
                  </Link>
                </li>
                <li>
                  <Link
                    to="/blog"
                    className="hover:text-primary transition-colors"
                  >
                    Blog
                  </Link>
                </li>
              </ul>
            </div>
            <div className="col-span-1">
              <h3 className="font-bold mb-4">Resources</h3>
              <ul className="space-y-3 text-sm text-slate-500 dark:text-slate-400">
                <li>
                  <a className="hover:text-primary transition-colors" href="#">
                    Newsletter
                  </a>
                </li>
                <li>
                  <a className="hover:text-primary transition-colors" href="#">
                    Tutorials
                  </a>
                </li>
                <li>
                  <a className="hover:text-primary transition-colors" href="#">
                    Snippets
                  </a>
                </li>
              </ul>
            </div>
            <div className="col-span-1">
              <h3 className="font-bold mb-4">Contact Info</h3>
              <ul className="space-y-3 text-sm text-slate-500 dark:text-slate-400">
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary text-base">
                    mail
                  </span>
                  hello@alexdev.com
                </li>
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary text-base">
                    location_on
                  </span>
                  San Francisco, CA
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-200 dark:border-border-dark pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-500">
            <p>© 2024 DevPortfolio. All rights reserved.</p>
            <div className="flex gap-6">
              <Link to="/admin" className="hover:text-primary">
                Admin Panel
              </Link>
              <a
                className="hover:text-slate-800 dark:hover:text-slate-300"
                href="#"
              >
                Privacy Policy
              </a>
              <a
                className="hover:text-slate-800 dark:hover:text-slate-300"
                href="#"
              >
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PublicLayout;
