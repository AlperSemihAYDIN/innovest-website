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
  Menu,
  X,
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
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('admin-sidebar-collapsed');
    if (saved !== null) setCollapsed(saved === 'true');
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  function toggle() {
    setCollapsed((prev) => {
      localStorage.setItem('admin-sidebar-collapsed', String(!prev));
      return !prev;
    });
  }

  const lgWidth = collapsed ? 'lg:w-16' : 'lg:w-56';
  const showLabel = !collapsed || mobileOpen;
  const collapsedOnly = collapsed && !mobileOpen;

  return (
    <>
      <div className="lg:hidden fixed top-0 left-0 right-0 z-40 h-14 bg-[#0a1628] border-b border-white/5 flex items-center justify-between px-4">
        <button
          onClick={() => setMobileOpen(true)}
          className="w-9 h-9 rounded-md flex items-center justify-center text-white/70 hover:text-white hover:bg-white/5 transition-all"
          aria-label="Menüyü aç"
        >
          <Menu size={20} />
        </button>
        <h1 className="text-sm font-semibold text-white tracking-wide">
          Innovest <span className="text-[#C1A45D]">Admin</span>
        </h1>
        <div className="w-9" />
      </div>

      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          className="lg:hidden fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
        />
      )}

      <aside
        className={`fixed left-0 top-0 h-screen w-56 ${lgWidth} bg-[#0a1628] border-r border-white/5 flex flex-col z-50 transition-all duration-300 ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="flex items-center border-b border-white/5 h-16 px-5 justify-between">
          {showLabel && (
            <h1 className="text-sm font-semibold text-white tracking-wide">
              Innovest <span className="text-[#C1A45D]">Admin</span>
            </h1>
          )}
          <div className="flex items-center gap-1 ml-auto">
            <button
              onClick={toggle}
              className="hidden lg:flex w-7 h-7 rounded-md items-center justify-center text-white/30 hover:text-white hover:bg-white/5 transition-all flex-shrink-0"
              title={collapsed ? 'Genişlet' : 'Daralt'}
            >
              {collapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
            </button>
            <button
              onClick={() => setMobileOpen(false)}
              className="lg:hidden w-7 h-7 rounded-md flex items-center justify-center text-white/50 hover:text-white hover:bg-white/5 transition-all flex-shrink-0"
              aria-label="Kapat"
            >
              <X size={16} />
            </button>
          </div>
        </div>

        <nav className="flex-1 px-2 py-4 space-y-0.5 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = pathname === item.href || (item.href !== '/admin' && pathname.startsWith(item.href));
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                title={collapsedOnly ? item.label : undefined}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-200 ${
                  collapsedOnly ? 'lg:justify-center' : ''
                } ${
                  isActive
                    ? 'bg-[#C1A45D]/15 text-[#C1A45D] font-medium'
                    : 'text-white/50 hover:text-white hover:bg-white/5'
                }`}
              >
                <Icon size={17} className="flex-shrink-0" />
                <span className={`truncate ${collapsedOnly ? 'lg:hidden' : ''}`}>
                  {item.label}
                </span>
              </Link>
            );
          })}
        </nav>

        <div className="px-2 py-3 border-t border-white/5 space-y-0.5">
          <Link
            href="/"
            target="_blank"
            title={collapsedOnly ? 'Siteye Dön' : undefined}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs text-white/30 hover:text-white/60 hover:bg-white/5 transition-all ${collapsedOnly ? 'lg:justify-center' : ''}`}
          >
            <ExternalLink size={14} className="flex-shrink-0" />
            <span className={collapsedOnly ? 'lg:hidden' : ''}>Siteye Dön</span>
          </Link>
          {user && showLabel && (
            <div className="px-3 py-1.5">
              <p className="text-[10px] text-white/25 truncate">{user.email}</p>
            </div>
          )}
          <button
            onClick={logout}
            title={collapsedOnly ? 'Çıkış Yap' : undefined}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs text-red-400/60 hover:text-red-400 hover:bg-red-400/5 transition-all w-full ${collapsedOnly ? 'lg:justify-center' : ''}`}
          >
            <LogOut size={14} className="flex-shrink-0" />
            <span className={collapsedOnly ? 'lg:hidden' : ''}>Çıkış Yap</span>
          </button>
        </div>
      </aside>
    </>
  );
}
