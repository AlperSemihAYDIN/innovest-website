'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from './AuthProvider';
import {
  LayoutDashboard,
  Building2,
  FileText,
  BookOpen,
  MessageSquare,
  Settings,
  LogOut,
  ChevronLeft,
} from 'lucide-react';

const navItems = [
  { label: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { label: 'Gayrimenkuller', href: '/admin/properties', icon: Building2 },
  { label: 'Makaleler', href: '/admin/articles', icon: FileText },
  { label: 'Rehberler', href: '/admin/guides', icon: BookOpen },
  { label: 'İletişim', href: '/admin/contacts', icon: MessageSquare },
  { label: 'Ayarlar', href: '/admin/settings', icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { user, logout } = useAuth();

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-[#0a1628] border-r border-white/5 flex flex-col z-50">
      {/* Logo & Brand */}
      <div className="px-6 py-6 border-b border-white/5">
        <h1 className="text-lg font-semibold text-white tracking-wide">
          Innovest <span className="text-[#C1A45D]">Admin</span>
        </h1>
        <p className="text-[10px] text-white/40 mt-1 tracking-wider uppercase">Yönetim Paneli</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-6 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = pathname === item.href || (item.href !== '/admin' && pathname.startsWith(item.href));
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm transition-all duration-200 ${
                isActive
                  ? 'bg-[#C1A45D]/15 text-[#C1A45D] font-medium'
                  : 'text-white/60 hover:text-white hover:bg-white/5'
              }`}
            >
              <Icon size={18} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* User & Logout */}
      <div className="px-3 py-4 border-t border-white/5 space-y-2">
        <Link
          href="/"
          className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-xs text-white/40 hover:text-white/60 hover:bg-white/5 transition-all"
        >
          <ChevronLeft size={14} />
          Siteye Dön
        </Link>
        {user && (
          <div className="px-4 py-2">
            <p className="text-[11px] text-white/30 truncate">{user.email}</p>
          </div>
        )}
        <button
          onClick={logout}
          className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-xs text-red-400/70 hover:text-red-400 hover:bg-red-400/5 transition-all w-full"
        >
          <LogOut size={14} />
          Çıkış Yap
        </button>
      </div>
    </aside>
  );
}
