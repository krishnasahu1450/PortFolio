import React from "react";
import { useNavigate, useLocation, Navigate } from "react-router-dom";
import { useAuth } from "../src/contexts/AuthContext";

const AdminLogin: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, isAuthenticated, loading } = useAuth();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);

  const from = location.state?.from?.pathname || "/admin/dashboard";

  // Redirect if already authenticated
  if (isAuthenticated && !loading) {
    return <Navigate to={from} replace />;
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const result = await login(email, password);

      if (result.success) {
        navigate(from, { replace: true });
      } else {
        setError(result.error || "Login failed");
      }
    } catch (error) {
      setError("Network error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-background-dark min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="bg-background-dark min-h-screen flex flex-col items-center justify-center p-4 relative">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-[120px]"></div>
      </div>
      <div className="w-full max-w-[480px] bg-surface-dark rounded-xl shadow-2xl border border-border-dark overflow-hidden p-8 md:p-10 flex flex-col gap-8 animate-in fade-in zoom-in duration-500">
        <div className="flex flex-col items-center text-center gap-3">
          <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mb-1 ring-1 ring-primary/30">
            <span className="material-symbols-outlined text-primary text-[28px]">
              admin_panel_settings
            </span>
          </div>
          <div className="space-y-1">
            <h1
              className="text-white text-2xl font-bold leading-tight user-select-none cursor-pointer hover:text-primary transition-colors"
              onClick={() => navigate("/")}
            >
              Admin Login
            </h1>
            <p className="text-text-secondary text-sm font-medium">
              Enter your credentials to access the dashboard.
            </p>
          </div>
        </div>
        <form className="flex flex-col gap-5" onSubmit={handleLogin}>
          {error && (
            <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3 text-red-400 text-sm">
              {error}
            </div>
          )}
          <div className="space-y-2">
            <label className="text-white text-sm font-medium">
              Email Address
            </label>
            <input
              className="w-full bg-background-dark border border-border-dark rounded-lg text-white h-12 px-4 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
              placeholder="admin@portfolio.com"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={isLoading}
            />
          </div>
          <div className="space-y-2">
            <label className="text-white text-sm font-medium">Password</label>
            <div className="relative">
              <input
                className="w-full bg-background-dark border border-border-dark rounded-lg text-white h-12 px-4 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
                placeholder="••••••••"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={isLoading}
              />
            </div>
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="flex w-full items-center justify-center h-12 px-5 bg-primary hover:bg-[#0ea5d6] text-background-dark text-base font-bold rounded-lg shadow-lg shadow-primary/20 transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-background-dark border-t-transparent rounded-full animate-spin mr-2"></div>
                Logging In...
              </>
            ) : (
              "Log In"
            )}
          </button>
          <div className="text-center">
            <a
              href="#"
              className="text-text-secondary hover:text-primary text-sm transition-colors underline underline-offset-4"
            >
              Forgot password?
            </a>
          </div>
        </form>
      </div>
      <div className="text-center mt-6 p-4 bg-surface-dark/50 rounded-lg border border-border-dark">
        <p className="text-text-secondary text-xs mb-2">Demo Credentials:</p>
        <p className="text-white text-sm font-mono">
          admin@portfolio.com / admin123
        </p>
      </div>
      <p className="text-text-secondary/50 text-xs mt-8">
        © 2024 Portfolio Admin Panel. Secure Access Only.
      </p>
    </div>
  );
};

export default AdminLogin;
