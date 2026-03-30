"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, BriefcaseBusiness, Menu, X } from "lucide-react";

export default function AppLayout({ children }) {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "Internships", href: "/internships", icon: BriefcaseBusiness },
  ];

  return (
    <div className="flex h-screen bg-slate-50 text-slate-900 font-sans">
      {/* Sidebar Desktop */}
      <aside className="w-64 bg-white border-r border-slate-200 hidden md:flex flex-col">
        <div className="p-6 border-b border-slate-100 flex items-center justify-center">
          <Link href="/dashboard" className="text-2xl font-extrabold text-indigo-600 tracking-tight flex items-center gap-2">
            <span className="w-8 h-8 rounded-xl bg-indigo-600 text-white flex items-center justify-center text-sm shadow-md shadow-indigo-200">IT</span>
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
                    ? "bg-indigo-50 text-indigo-700 shadow-sm shadow-indigo-100 font-medium"
                    : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? "text-indigo-600" : "text-slate-400"}`} />
                {link.name}
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative z-0">
        {/* Mobile Header */}
        <header className="md:hidden bg-white border-b border-slate-200 h-16 flex items-center justify-between px-4 shrink-0 shadow-sm z-20">
          <Link href="/dashboard" className="text-xl font-bold text-indigo-600 flex items-center gap-2">
            <span className="w-6 h-6 rounded-md bg-indigo-600 text-white flex items-center justify-center text-xs">IT</span>
            InternTrack
          </Link>
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2 text-slate-500 rounded-md hover:bg-slate-100">
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </header>

        {/* Mobile Nav Dropdown */}
        {isMobileMenuOpen && (
          <nav className="md:hidden bg-white border-b border-slate-200 absolute w-full top-16 z-30 shadow-lg">
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
                        ? "bg-indigo-50 text-indigo-700 font-medium"
                        : "text-slate-500 active:bg-slate-50"
                    }`}
                  >
                    <Icon className={`w-5 h-5 ${isActive ? "text-indigo-600" : "text-slate-400"}`} />
                    {link.name}
                  </Link>
                );
              })}
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
