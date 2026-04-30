'use client';

import { useEffect, useState } from 'react';
import { Mail, MailOpen, Trash2, Search, ChevronDown, ChevronUp } from 'lucide-react';
import { adminApi } from '@/lib/adminApi';

interface Contact {
  id: string;
  firstname: string;
  email: string;
  phone: string;
  city: string;
  budget: string;
  interest: string;
  message: string;
  read: boolean;
  createdAt: string;
  source: string;
}

export default function ContactsPage() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [filter, setFilter] = useState<'all' | 'unread' | 'read'>('all');

  useEffect(() => { loadContacts(); }, []);

  async function loadContacts() {
    try { const data = await adminApi.getContacts(); setContacts(data); }
    catch { /* empty */ } finally { setLoading(false); }
  }

  async function handleMarkRead(id: string) {
    try {
      await adminApi.markContactRead(id);
      setContacts(prev => prev.map(c => c.id === id ? { ...c, read: true } : c));
    } catch { /* empty */ }
  }

  async function handleDelete(id: string) {
    if (!confirm('Bu iletişim kaydını silmek istediğinize emin misiniz?')) return;
    try {
      await adminApi.deleteContact(id);
      setContacts(prev => prev.filter(c => c.id !== id));
    } catch (err) { alert('Silme hatası: ' + (err instanceof Error ? err.message : '')); }
  }

  const filtered = contacts
    .filter(c => {
      if (filter === 'unread') return !c.read;
      if (filter === 'read') return c.read;
      return true;
    })
    .filter(c =>
      c.firstname?.toLowerCase().includes(search.toLowerCase()) ||
      c.email?.toLowerCase().includes(search.toLowerCase()) ||
      c.interest?.toLowerCase().includes(search.toLowerCase())
    );

  const unreadCount = contacts.filter(c => !c.read).length;

  return (
    <div>
      <div className="admin-sticky-bar" style={{ marginBottom: '24px' }}>
        <div className="mr-auto">
          <h1 className="text-lg font-semibold text-white">İletişim Talepleri</h1>
          <p className="text-white/40 text-[11px] mt-0.5">
            {contacts.length} toplam {unreadCount > 0 && `· ${unreadCount} okunmamış`}
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="admin-card">
        <h2 className="admin-section-title">Filtreler</h2>
        <div className="flex flex-col sm:flex-row sm:items-center gap-3">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" />
            <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="İsim, e-posta veya ilgi alanı ara..."
              className="admin-input" style={{ paddingLeft: '44px' }} />
          </div>
          <div className="flex gap-1 bg-white/[0.04] border border-white/[0.08] rounded-lg p-1">
            {(['all', 'unread', 'read'] as const).map(f => (
              <button key={f} onClick={() => setFilter(f)}
                className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${filter === f ? 'bg-[#C9A84C]/15 text-[#C9A84C]' : 'text-white/40 hover:text-white/60'}`}>
                {f === 'all' ? 'Tümü' : f === 'unread' ? 'Okunmamış' : 'Okunmuş'}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="admin-card">
        <h2 className="admin-section-title">Talepler</h2>
        {loading ? (
          <div className="flex justify-center py-16"><div className="w-8 h-8 border-2 border-[#C9A84C]/30 border-t-[#C9A84C] rounded-full animate-spin" /></div>
        ) : filtered.length === 0 ? (
          <div className="py-16 text-center">
            <p className="text-white/30 text-sm">{search || filter !== 'all' ? 'Sonuç bulunamadı' : 'Henüz iletişim talebi yok'}</p>
          </div>
        ) : (
          <div className="space-y-2">
            {filtered.map(contact => (
              <div key={contact.id} className={`rounded-lg overflow-hidden transition-all ${!contact.read ? 'border border-[#C9A84C]/25 bg-[#C9A84C]/[0.03]' : 'border border-white/[0.06] bg-white/[0.02]'}`}>
                {/* Header Row */}
                <div
                  className="px-4 py-3 flex items-center justify-between cursor-pointer hover:bg-white/[0.02] transition-colors"
                  onClick={() => {
                    setExpandedId(expandedId === contact.id ? null : contact.id);
                    if (!contact.read) handleMarkRead(contact.id);
                  }}
                >
                  <div className="flex items-center gap-3">
                    {!contact.read ? (
                      <Mail size={15} className="text-[#C9A84C]" />
                    ) : (
                      <MailOpen size={15} className="text-white/20" />
                    )}
                    <div>
                      <p className={`text-sm ${!contact.read ? 'text-white font-medium' : 'text-white/70'}`}>{contact.firstname}</p>
                      <p className="text-xs text-white/40">{contact.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-right hidden md:block">
                      <span className="text-[10px] px-2 py-0.5 bg-white/5 rounded text-white/40">{contact.interest}</span>
                      <p className="text-[10px] text-white/30 mt-0.5">{new Date(contact.createdAt).toLocaleDateString('tr-TR')}</p>
                    </div>
                    <button onClick={(e) => { e.stopPropagation(); handleDelete(contact.id); }}
                      className="p-1.5 hover:bg-red-500/10 rounded-lg text-white/20 hover:text-red-400 transition-all">
                      <Trash2 size={13} />
                    </button>
                    {expandedId === contact.id ? <ChevronUp size={15} className="text-white/30" /> : <ChevronDown size={15} className="text-white/30" />}
                  </div>
                </div>

                {/* Expanded Detail */}
                {expandedId === contact.id && (
                  <div className="px-4 pb-4 pt-2 border-t border-white/[0.06]">
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-4 mb-4 mt-3">
                      <div>
                        <p className="admin-label">Ad Soyad</p>
                        <p className="text-sm text-white/70">{contact.firstname || '—'}</p>
                      </div>
                      <div>
                        <p className="admin-label">E-posta</p>
                        <a href={`mailto:${contact.email}`} className="text-sm text-[#C9A84C] hover:underline break-all">{contact.email || '—'}</a>
                      </div>
                      <div>
                        <p className="admin-label">Telefon</p>
                        <a href={`tel:${contact.phone}`} className="text-sm text-white/70 hover:text-white transition-colors">{contact.phone || '—'}</a>
                      </div>
                      <div>
                        <p className="admin-label">Şehir</p>
                        <p className="text-sm text-white/70">{contact.city || '—'}</p>
                      </div>
                      <div>
                        <p className="admin-label">Bütçe</p>
                        <p className="text-sm text-white/70">{contact.budget || '—'}</p>
                      </div>
                      <div>
                        <p className="admin-label">İlgi Alanı</p>
                        <p className="text-sm text-white/70">{contact.interest || '—'}</p>
                      </div>
                      <div>
                        <p className="admin-label">Tarih</p>
                        <p className="text-sm text-white/70">{contact.createdAt ? new Date(contact.createdAt).toLocaleString('tr-TR') : '—'}</p>
                      </div>
                      <div>
                        <p className="admin-label">Kaynak</p>
                        <p className="text-sm text-white/70">{contact.source || '—'}</p>
                      </div>
                    </div>
                    {contact.message && (
                      <div>
                        <p className="admin-label">Mesaj</p>
                        <p className="text-sm text-white/60 leading-relaxed bg-white/[0.03] rounded-lg p-3">{contact.message}</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
