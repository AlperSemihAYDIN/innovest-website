'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useAuth } from './AuthProvider';
import {
  LayoutDashboard,
  Building2,
  FileText,
  BookOpen,
  MessageSquare,
  Settings,
  LogOut,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
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
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('admin-sidebar-collapsed');
    if (saved !== null) setCollapsed(saved === 'true');
  }, []);

  function toggle() {
    setCollapsed((prev) => {
      localStorage.setItem('admin-sidebar-collapsed', String(!prev));
      return !prev;
    });
  }

  const w = collapsed ? 'w-16' : 'w-56';

  return (
    <aside
      className={`fixed left-0 top-0 h-screen ${w} bg-[#0a1628] border-r border-white/5 flex flex-col z-50 transition-all duration-300`}
    >
      {/* Logo & Toggle */}
      <div className={`flex items-center border-b border-white/5 h-16 ${collapsed ? 'justify-center px-0' : 'px-5 justify-between'}`}>
        {!collapsed && (
          <div>
            <h1 className="text-sm font-semibold text-white tracking-wide">
              Innovest <span className="text-[#C1A45D]">Admin</span>
            </h1>
          </div>
        )}
        <button
          onClick={toggle}
          className="w-7 h-7 rounded-md flex items-center justify-center text-white/30 hover:text-white hover:bg-white/5 transition-all flex-shrink-0"
          title={collapsed ? 'Genişlet' : 'Daralt'}
        >
          {collapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-2 py-4 space-y-0.5 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = pathname === item.href || (item.href !== '/admin' && pathname.startsWith(item.href));
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              title={collapsed ? item.label : undefined}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-200 ${
                collapsed ? 'justify-center' : ''
              } ${
                isActive
                  ? 'bg-[#C1A45D]/15 text-[#C1A45D] font-medium'
                  : 'text-white/50 hover:text-white hover:bg-white/5'
              }`}
            >
              <Icon size={17} className="flex-shrink-0" />
              {!collapsed && <span className="truncate">{item.label}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Bottom */}
      <div className="px-2 py-3 border-t border-white/5 space-y-0.5">
        <Link
          href="/"
          target="_blank"
          title={collapsed ? 'Siteye Dön' : undefined}
          className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs text-white/30 hover:text-white/60 hover:bg-white/5 transition-all ${collapsed ? 'justify-center' : ''}`}
        >
          <ExternalLink size={14} className="flex-shrink-0" />
          {!collapsed && <span>Siteye Dön</span>}
        </Link>
        {user && !collapsed && (
          <div className="px-3 py-1.5">
            <p className="text-[10px] text-white/25 truncate">{user.email}</p>
          </div>
        )}
        <button
          onClick={logout}
          title={collapsed ? 'Çıkış Yap' : undefined}
          className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs text-red-400/60 hover:text-red-400 hover:bg-red-400/5 transition-all w-full ${collapsed ? 'justify-center' : ''}`}
        >
          <LogOut size={14} className="flex-shrink-0" />
          {!collapsed && <span>Çıkış Yap</span>}
        </button>
      </div>
    </aside>
  );
}
