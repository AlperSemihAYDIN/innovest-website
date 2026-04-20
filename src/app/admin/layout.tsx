'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { AuthProvider, useAuth } from '@/components/admin/AuthProvider';
import Sidebar from '@/components/admin/Sidebar';

function AdminGuard({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    if (!loading && !user && pathname !== '/admin/login') {
      router.replace('/admin/login');
    }
  }, [user, loading, pathname, router]);

  // Sync collapsed state from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('admin-sidebar-collapsed');
    if (saved !== null) setCollapsed(saved === 'true');
    // Watch for storage changes (sidebar toggle)
    const handler = () => {
      const val = localStorage.getItem('admin-sidebar-collapsed');
      if (val !== null) setCollapsed(val === 'true');
    };
    window.addEventListener('storage', handler);
    // Also poll since same-tab localStorage changes don't fire 'storage'
    const interval = setInterval(handler, 150);
    return () => { window.removeEventListener('storage', handler); clearInterval(interval); };
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#060e1a] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-2 border-[#C1A45D]/30 border-t-[#C1A45D] rounded-full animate-spin" />
          <p className="text-white/40 text-sm">Yükleniyor...</p>
        </div>
      </div>
    );
  }

  if (!user && pathname !== '/admin/login') return null;

  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-[#060e1a]">
      <Sidebar />
      <main
        className={`min-h-screen transition-all duration-300 pt-14 lg:pt-0 ml-0 ${
          collapsed ? 'lg:ml-16' : 'lg:ml-56'
        }`}
      >
        <div className="px-5 py-6 md:px-8 md:py-8 lg:px-10 lg:py-10 max-w-[1600px] mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <AdminGuard>{children}</AdminGuard>
    </AuthProvider>
  );
}
