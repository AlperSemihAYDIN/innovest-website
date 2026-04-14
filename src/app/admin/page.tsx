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
    { label: 'Gayrimenkul', value: stats.properties, icon: Building2, href: '/admin/properties', color: '#C1A45D' },
    { label: 'Makale', value: stats.articles, icon: FileText, href: '/admin/articles', color: '#3B82F6' },
    { label: 'Rehber', value: stats.guides, icon: BookOpen, href: '/admin/guides', color: '#10B981' },
    { label: 'İletişim', value: stats.contacts, icon: MessageSquare, href: '/admin/contacts', color: '#F59E0B', badge: stats.unreadContacts },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-8 h-8 border-2 border-[#C1A45D]/30 border-t-[#C1A45D] rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-white">Dashboard</h1>
          <p className="text-white/40 text-sm mt-1">Genel bakış ve istatistikler</p>
        </div>
        <button
          onClick={handleSeed}
          disabled={seeding}
          className="flex items-center gap-2 px-4 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-xs text-white/60 hover:text-white transition-all disabled:opacity-50"
        >
          <Database size={14} />
          {seeding ? 'Aktarılıyor...' : 'Verileri Firestore\'a Aktar'}
        </button>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {statCards.map((card) => {
          const Icon = card.icon;
          return (
            <Link
              key={card.label}
              href={card.href}
              className="bg-[#0a1628] border border-white/5 rounded-xl p-6 hover:border-white/10 transition-all group"
            >
              <div className="flex items-center justify-between mb-4">
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center"
                  style={{ background: `${card.color}15` }}
                >
                  <Icon size={20} style={{ color: card.color }} />
                </div>
                {card.badge ? (
                  <span className="bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                    {card.badge}
                  </span>
                ) : null}
              </div>
              <p className="text-3xl font-semibold text-white mb-1">{card.value}</p>
              <p className="text-xs text-white/40">{card.label}</p>
              <div className="flex items-center gap-1 mt-3 text-xs text-white/30 group-hover:text-[#C1A45D] transition-colors">
                <TrendingUp size={12} />
                Yönet
              </div>
            </Link>
          );
        })}
      </div>

      {/* Recent Contacts */}
      <div className="bg-[#0a1628] border border-white/5 rounded-xl">
        <div className="px-6 py-4 border-b border-white/5 flex items-center justify-between">
          <h2 className="text-sm font-medium text-white">Son İletişim Talepleri</h2>
          <Link href="/admin/contacts" className="text-xs text-[#C1A45D] hover:text-[#d4b76e] transition-colors">
            Tümünü Gör
          </Link>
        </div>
        {recentContacts.length === 0 ? (
          <div className="px-6 py-12 text-center text-white/30 text-sm">
            Henüz iletişim talebi yok
          </div>
        ) : (
          <div className="divide-y divide-white/5">
            {recentContacts.map((contact) => (
              <div key={contact.id} className="px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  {!contact.read && (
                    <div className="w-2 h-2 rounded-full bg-[#C1A45D]" />
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
