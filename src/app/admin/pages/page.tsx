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
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold text-white">Sayfa İçerikleri</h1>
        <p className="text-white/40 text-sm mt-1">Sitedeki sayfaların metinlerini ve görsel içeriklerini düzenle</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {pages.map((p) => {
          const Icon = p.icon;
          const isActive = p.status === 'active';
          const card = (
            <div
              className={`bg-[#0a1628] border rounded-xl p-6 transition-all ${
                isActive
                  ? 'border-white/5 hover:border-[#C1A45D]/40 cursor-pointer'
                  : 'border-white/5 opacity-50 cursor-not-allowed'
              }`}
            >
              <div className="flex items-start gap-4">
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ background: '#C1A45D15' }}
                >
                  <Icon size={20} style={{ color: '#C1A45D' }} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-medium text-white">{p.label}</h3>
                    {!isActive && (
                      <span className="text-[10px] uppercase tracking-wider text-white/40 bg-white/5 px-2 py-0.5 rounded">
                        Yakında
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-white/50 mt-1">{p.desc}</p>
                </div>
                {isActive && <FileEdit size={16} className="text-white/30 flex-shrink-0" />}
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
  );
}
