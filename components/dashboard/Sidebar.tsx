"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import {
  LayoutDashboard,
  FileText,
  Folder,
  MessageSquare,
  Settings,
  LogOut,
} from "lucide-react";

export default function Sidebar() {
  const pathname = usePathname();
  const { logout } = useAuth();

  const menuItems = [
    { href: "/dashboard", label: "Dashboard", icon: <LayoutDashboard size={20} /> },
    { href: "/documents", label: "Documents", icon: <FileText size={20} /> },
    { href: "/collections", label: "Collections", icon: <Folder size={20} /> },
    { href: "/chat", label: "Chat", icon: <MessageSquare size={20} /> },
    { href: "/settings", label: "Settings", icon: <Settings size={20} /> },
  ];

  return (
    <aside className="w-64 bg-slate-950 text-slate-200 h-screen p-5 flex flex-col justify-between border-r border-slate-900">
      <div>
        <div className="flex items-center gap-2 mb-10 px-3">
          <div className="h-8 w-8 bg-blue-600 rounded-lg flex items-center justify-center font-bold text-white text-lg">
            A
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight">
            Atlas
          </h1>
        </div>

        <nav className="space-y-1">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
                  isActive
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-500/20"
                    : "text-slate-400 hover:bg-slate-900 hover:text-white"
                }`}
              >
                <span className={`transition-colors duration-200 ${isActive ? "text-white" : "text-slate-400 group-hover:text-white"}`}>
                  {item.icon}
                </span>
                <span className="font-medium">{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="pt-4 border-t border-slate-900">
        <button
          onClick={logout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:bg-red-950/30 hover:text-red-400 transition-all duration-200 cursor-pointer font-medium"
        >
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}