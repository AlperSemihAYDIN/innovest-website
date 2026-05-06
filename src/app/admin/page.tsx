'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Building2, FileText, BookOpen, MessageSquare, TrendingUp, Database } from 'lucide-react';
import { adminApi } from '@/lib/adminApi';

interface Stats {
  properties: number;
  articles: number;
  guides: number;
  contacts: number;
  unreadContacts: number;
}

interface Contact {
  id: string;
  firstname: string;
  email: string;
  interest: string;
  createdAt: string;
  read: boolean;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats>({ properties: 0, articles: 0, guides: 0, contacts: 0, unreadContacts: 0 });
  const [recentContacts, setRecentContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [seeding, setSeeding] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    try {
      const [properties, articles, guides, contacts] = await Promise.all([
        adminApi.getProperties().catch(() => []),
        adminApi.getArticles().catch(() => []),
        adminApi.getGuides().catch(() => []),
        adminApi.getContacts().catch(() => []),
      ]);
      setStats({
        properties: properties.length,
        articles: articles.length,
        guides: guides.length,
        contacts: contacts.length,
        unreadContacts: contacts.filter((c: Contact) => !c.read).length,
      });
      setRecentContacts(contacts.slice(0, 5));
    } catch {
      // API not configured yet — show empty state
    } finally {
      setLoading(false);
    }
  }

  async function handleSeed() {
    if (!confirm('Mevcut verileri Firestore\'a aktarmak istediğinize emin misiniz?')) return;
    setSeeding(true);
    try {
      await adminApi.seed('all');
      await loadData();
      alert('Veriler başarıyla aktarıldı!');
    } catch (err) {
      alert('Hata: ' + (err instanceof Error ? err.message : 'Bilinmeyen hata'));
    } finally {
      setSeeding(false);
    }
  }

  const statCards = [
    { label: 'Gayrimenkul', value: stats.properties, icon: Building2, href: '/admin/properties', color: '#C9A84C' },
    { label: 'Makale', value: stats.articles, icon: FileText, href: '/admin/articles', color: '#3B82F6' },
    { label: 'Rehber', value: stats.guides, icon: BookOpen, href: '/admin/guides', color: '#10B981' },
    { label: 'İletişim', value: stats.contacts, icon: MessageSquare, href: '/admin/contacts', color: '#F59E0B', badge: stats.unreadContacts },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-8 h-8 border-2 border-[#C9A84C]/30 border-t-[#C9A84C] rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div style={{ position: 'sticky', top: '16px', zIndex: 30, display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: '12px', padding: '12px 16px', background: 'rgba(6,14,26,0.85)', backdropFilter: 'blur(10px)', borderBottom: '1px solid rgba(255,255,255,0.06)', marginBottom: '24px' }}>
        <div className="mr-auto">
          <h1 className="text-lg font-semibold text-white">Dashboard</h1>
          <p className="text-white/40 text-[11px] mt-0.5">Genel bakış ve istatistikler</p>
        </div>
        <button
          onClick={handleSeed}
          disabled={seeding}
          className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-xs text-white/60 hover:text-white transition-all disabled:opacity-50"
        >
          <Database size={13} />
          {seeding ? 'Aktarılıyor...' : 'Verileri Firestore\'a Aktar'}
        </button>
      </div>

      {/* Stat Cards */}
      <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px', padding: '28px 32px', marginBottom: '20px' }}>
        <h2 style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#C9A84C', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '8px', marginTop: 0, marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '10px' }}>İstatistikler</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {statCards.map((card) => {
            const Icon = card.icon;
            return (
              <Link
                key={card.label}
                href={card.href}
                className="rounded-lg p-5 hover:bg-white/[0.03] transition-all group"
                style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}
              >
                <div className="flex items-center justify-between mb-3">
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center"
                    style={{ background: `${card.color}15` }}
                  >
                    <Icon size={18} style={{ color: card.color }} />
                  </div>
                  {card.badge ? (
                    <span className="bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                      {card.badge}
                    </span>
                  ) : null}
                </div>
                <p className="text-2xl font-semibold text-white mb-1">{card.value}</p>
                <p className="text-xs text-white/45">{card.label}</p>
                <div className="flex items-center gap-1 mt-3 text-[11px] text-white/30 group-hover:text-[#C9A84C] transition-colors">
                  <TrendingUp size={11} />
                  Yönet
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Recent Contacts */}
      <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px', padding: '28px 32px', marginBottom: '20px' }}>
        <div className="flex items-center justify-between" style={{ marginBottom: '16px' }}>
          <h2 style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#C9A84C', borderBottom: 'none', paddingBottom: 0, marginTop: 0, marginBottom: 0, display: 'flex', alignItems: 'center', gap: '10px' }}>
            Son İletişim Talepleri
          </h2>
          <Link href="/admin/contacts" className="text-xs text-[#C9A84C] hover:text-[#b8963e] transition-colors">
            Tümünü Gör →
          </Link>
        </div>
        {recentContacts.length === 0 ? (
          <div className="py-10 text-center text-white/30 text-sm">
            Henüz iletişim talebi yok
          </div>
        ) : (
          <div className="divide-y divide-white/[0.06]">
            {recentContacts.map((contact) => (
              <div key={contact.id} className="py-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {!contact.read && (
                    <div className="w-2 h-2 rounded-full bg-[#C9A84C]" />
                  )}
                  <div>
                    <p className="text-sm text-white">{contact.firstname}</p>
                    <p className="text-xs text-white/40">{contact.email}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs text-white/50">{contact.interest}</p>
                  <p className="text-[10px] text-white/30">
                    {new Date(contact.createdAt).toLocaleDateString('tr-TR')}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
