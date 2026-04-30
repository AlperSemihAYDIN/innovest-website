'use client';

import Link from 'next/link';
import { FileEdit, Home, Info, Briefcase, Phone, Layout } from 'lucide-react';

const pages = [
  { slug: 'home', label: 'Ana Sayfa', desc: 'Hero, istatistikler, hizmetler, görüşler, alt CTA', icon: Home, status: 'active' as const },
  { slug: 'about', label: 'Hakkımızda', desc: 'Şirket metinleri, ekip üyeleri', icon: Info, status: 'soon' as const },
  { slug: 'services', label: 'Hizmetler', desc: 'Hizmet sayfası blokları', icon: Briefcase, status: 'soon' as const },
  { slug: 'contact', label: 'İletişim', desc: 'Form metinleri, ofis bilgileri', icon: Phone, status: 'soon' as const },
  { slug: 'footer', label: 'Footer', desc: 'Şirket açıklaması ve bağlantılar', icon: Layout, status: 'soon' as const },
];

export default function PagesIndex() {
  return (
    <div>
      <div className="admin-sticky-bar" style={{ marginBottom: '24px' }}>
        <div className="mr-auto">
          <h1 className="text-lg font-semibold text-white">Sayfa İçerikleri</h1>
          <p className="text-white/40 text-[11px] mt-0.5">Sitedeki sayfaların metinlerini ve görsellerini düzenle</p>
        </div>
      </div>

      <div className="admin-card">
        <h2 className="admin-section-title">Sayfalar</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {pages.map((p) => {
            const Icon = p.icon;
            const isActive = p.status === 'active';
            const card = (
              <div
                className={`rounded-lg p-5 transition-all ${
                  isActive
                    ? 'hover:border-[#C9A84C]/40 cursor-pointer'
                    : 'opacity-50 cursor-not-allowed'
                }`}
                style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}
              >
                <div className="flex items-start gap-3">
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ background: '#C9A84C15' }}
                  >
                    <Icon size={18} style={{ color: '#C9A84C' }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-medium text-white">{p.label}</h3>
                      {!isActive && (
                        <span className="text-[9px] uppercase tracking-wider text-white/40 bg-white/5 px-1.5 py-0.5 rounded">
                          Yakında
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-white/45 mt-1 leading-relaxed">{p.desc}</p>
                  </div>
                  {isActive && <FileEdit size={14} className="text-white/30 flex-shrink-0" />}
                </div>
              </div>
            );

            return isActive ? (
              <Link key={p.slug} href={`/admin/pages/${p.slug}`}>
                {card}
              </Link>
            ) : (
              <div key={p.slug}>{card}</div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
