"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LayoutDashboard, BriefcaseBusiness, Menu, X, LogOut } from "lucide-react";
import { useAuth } from "../lib/authContext";

export default function AppLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const { isAuth, user, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Hide layout on login/signup pages
  const isAuthPage = pathname === "/login";

  const navLinks = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "Internships", href: "/internships", icon: BriefcaseBusiness },
  ];

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  if (isAuthPage) {
    return children;
  }

  return (
    <div className="flex h-screen bg-slate-50 text-slate-900 font-sans">
      {/* Sidebar Desktop */}
      <aside className="w-64 bg-white border-r border-slate-200 hidden md:flex flex-col">
        <div className="p-6 border-b border-blue-100 flex items-center justify-center">
          <Link href="/dashboard" className="text-2xl font-extrabold text-blue-600 tracking-tight flex items-center gap-2">
            <span className="w-8 h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center text-sm shadow-md shadow-blue-300">IT</span>
            InternTrack
          </Link>
        </div>
        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = pathname.startsWith(link.href) && (link.href !== "/dashboard" || pathname === "/dashboard");
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                  isActive
                    ? "bg-blue-50 text-blue-700 shadow-sm shadow-blue-100 font-medium"
                    : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? "text-blue-600" : "text-slate-400"}`} />
                {link.name}
              </Link>
            );
          })}
        </nav>
        
        {/* User Section */}
        {isAuth && user && (
          <div className="p-4 border-t border-blue-100 space-y-4">
            <div className="px-3">
              <p className="text-xs text-slate-500 uppercase tracking-wider">Logged in as</p>
              <p className="font-semibold text-slate-700 truncate">{user.name || user.email}</p>
            </div>
            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-lg transition-colors text-sm font-medium"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        )}
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative z-0">
        {/* Mobile Header */}
        <header className="md:hidden bg-white border-b border-blue-100 h-16 flex items-center justify-between px-4 shrink-0 shadow-sm z-20">
          <Link href="/dashboard" className="text-xl font-bold text-blue-600 flex items-center gap-2">
            <span className="w-6 h-6 rounded-md bg-blue-600 text-white flex items-center justify-center text-xs">IT</span>
            InternTrack
          </Link>
          <div className="flex items-center gap-3">
            {isAuth && user && (
              <button
                onClick={handleLogout}
                className="p-2 text-slate-500 hover:bg-slate-100 rounded-lg transition-colors"
                title="Logout"
              >
                <LogOut className="w-5 h-5" />
              </button>
            )}
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2 text-slate-500 rounded-md hover:bg-slate-100">
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </header>

        {/* Mobile Nav Dropdown */}
        {isMobileMenuOpen && (
          <nav className="md:hidden bg-white border-b border-blue-100 absolute w-full top-16 z-30 shadow-lg">
            <div className="px-4 py-4 space-y-2">
              {navLinks.map((link) => {
                const Icon = link.icon;
                const isActive = pathname.startsWith(link.href) && (link.href !== "/dashboard" || pathname === "/dashboard");
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                      isActive
                        ? "bg-blue-50 text-blue-700 font-medium"
                        : "text-slate-500 active:bg-slate-50"
                    }`}
                  >
                    <Icon className={`w-5 h-5 ${isActive ? "text-blue-600" : "text-slate-400"}`} />
                    {link.name}
                  </Link>
                );
              })}
              {isAuth && user && (
                <>
                  <div className="px-4 py-3 border-t border-blue-100 mt-2">
                    <p className="text-xs text-slate-500 uppercase tracking-wider mb-2">Logged in as</p>
                    <p className="font-semibold text-slate-700 text-sm mb-3">{user.name || user.email}</p>
                    <button
                      onClick={() => {
                        handleLogout();
                        setIsMobileMenuOpen(false);
                      }}
                      className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-lg transition-colors text-sm font-medium"
                    >
                      <LogOut className="w-4 h-4" />
                      Logout
                    </button>
                  </div>
                </>
              )}
            </div>
            <div className="absolute top-full left-0 w-full h-screen bg-black/10 -z-10" onClick={() => setIsMobileMenuOpen(false)}></div>
          </nav>
        )}

        <main className="flex-1 overflow-y-auto p-4 md:p-8 bg-slate-50 text-slate-800 relative">
          {children}
        </main>
      </div>
    </div>
  );
}
