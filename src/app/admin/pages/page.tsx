'use client';

import Link from 'next/link';
import { FileEdit, Home, Info, Briefcase, Phone, Layout, Building2, Globe, BookOpen, FileText } from 'lucide-react';

const pages = [
  { slug: 'home', label: 'Ana Sayfa', desc: 'Hero, istatistikler, hizmetler, görüşler, alt CTA', icon: Home, status: 'active' as const },
  { slug: 'about', label: 'Hakkımızda', desc: 'Şirket hikayesi, misyon/vizyon, ekip üyeleri, değerler', icon: Info, status: 'active' as const },
  { slug: 'services', label: 'Hizmetler', desc: 'Hero ve hizmet kartları (başlık, açıklama, ikon)', icon: Briefcase, status: 'active' as const },
  { slug: 'real-estate', label: 'Gayrimenkul', desc: 'Hero metni, Londra ve Dubai pazar kartları', icon: Building2, status: 'active' as const },
  { slug: 'residency', label: 'Yatırım ile Oturum', desc: 'Hero, ülke programları, süreç adımları', icon: Globe, status: 'active' as const },
  { slug: 'business-expansion', label: 'İş Geliştirme', desc: 'Hero, hizmet kartları, kapsanan pazarlar', icon: Briefcase, status: 'active' as const },
  { slug: 'insights', label: 'İçgörüler', desc: 'Hero metni, kategori etiketleri, makale CTA', icon: BookOpen, status: 'active' as const },
  { slug: 'guides', label: 'Yatırım Rehberi', desc: 'Hero metni', icon: FileText, status: 'active' as const },
  { slug: 'contact', label: 'İletişim', desc: 'Form alanları, başarı mesajı, doğrudan iletişim', icon: Phone, status: 'active' as const },
  { slug: 'footer', label: 'Footer', desc: 'Şirket açıklaması, hızlı linkler, sosyal medya', icon: Layout, status: 'active' as const },
];

export default function PagesIndex() {
  return (
    <div>
      <div style={{ position: 'sticky', top: '16px', zIndex: 30, display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: '12px', padding: '12px 16px', background: 'rgba(6,14,26,0.85)', backdropFilter: 'blur(10px)', borderBottom: '1px solid rgba(255,255,255,0.06)', marginBottom: '24px' }}>
        <div className="mr-auto">
          <h1 className="text-lg font-semibold text-white">Sayfa İçerikleri</h1>
          <p className="text-white/40 text-[11px] mt-0.5">Sitedeki sayfaların metinlerini ve görsellerini düzenle</p>
        </div>
      </div>

      <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px', padding: '28px 32px', marginBottom: '20px' }}>
        <h2 style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#C9A84C', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '8px', marginTop: 0, marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '10px' }}>Sayfalar</h2>
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
