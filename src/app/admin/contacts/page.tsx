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
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-white">İletişim Talepleri</h1>
        <p className="text-white/40 text-sm mt-1">
          {contacts.length} toplam {unreadCount > 0 && `· ${unreadCount} okunmamış`}
        </p>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" />
          <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="İsim, e-posta veya ilgi alanı ara..."
            className="w-full bg-[#0a1628] border border-white/5 rounded-lg pl-11 pr-4 py-3 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-[#C1A45D]/30 transition-colors" />
        </div>
        <div className="flex gap-1 bg-[#0a1628] border border-white/5 rounded-lg p-1">
          {(['all', 'unread', 'read'] as const).map(f => (
            <button key={f} onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-md text-xs font-medium transition-all ${filter === f ? 'bg-[#C1A45D]/15 text-[#C1A45D]' : 'text-white/40 hover:text-white/60'}`}>
              {f === 'all' ? 'Tümü' : f === 'unread' ? 'Okunmamış' : 'Okunmuş'}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-20"><div className="w-8 h-8 border-2 border-[#C1A45D]/30 border-t-[#C1A45D] rounded-full animate-spin" /></div>
      ) : filtered.length === 0 ? (
        <div className="bg-[#0a1628] border border-white/5 rounded-xl py-20 text-center">
          <p className="text-white/30 text-sm">{search || filter !== 'all' ? 'Sonuç bulunamadı' : 'Henüz iletişim talebi yok'}</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map(contact => (
            <div key={contact.id} className={`bg-[#0a1628] border rounded-xl overflow-hidden transition-all ${!contact.read ? 'border-[#C1A45D]/20' : 'border-white/5'}`}>
              {/* Header Row */}
              <div
                className="px-6 py-4 flex items-center justify-between cursor-pointer hover:bg-white/[0.02] transition-colors"
                onClick={() => {
                  setExpandedId(expandedId === contact.id ? null : contact.id);
                  if (!contact.read) handleMarkRead(contact.id);
                }}
              >
                <div className="flex items-center gap-4">
                  {!contact.read ? (
                    <Mail size={16} className="text-[#C1A45D]" />
                  ) : (
                    <MailOpen size={16} className="text-white/20" />
                  )}
                  <div>
                    <p className={`text-sm ${!contact.read ? 'text-white font-medium' : 'text-white/70'}`}>{contact.firstname}</p>
                    <p className="text-xs text-white/40">{contact.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right hidden md:block">
                    <span className="text-xs px-2 py-1 bg-white/5 rounded text-white/40">{contact.interest}</span>
                    <p className="text-[10px] text-white/30 mt-1">{new Date(contact.createdAt).toLocaleString('tr-TR')}</p>
                  </div>
                  <button onClick={(e) => { e.stopPropagation(); handleDelete(contact.id); }}
                    className="p-2 hover:bg-red-500/10 rounded-lg text-white/20 hover:text-red-400 transition-all">
                    <Trash2 size={14} />
                  </button>
                  {expandedId === contact.id ? <ChevronUp size={16} className="text-white/30" /> : <ChevronDown size={16} className="text-white/30" />}
                </div>
              </div>

              {/* Expanded Detail */}
              {expandedId === contact.id && (
                <div className="px-6 pb-5 pt-2 border-t border-white/5">
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-4 mb-5">
                    <div>
                      <p className="text-[10px] text-white/30 uppercase tracking-wider mb-1">Ad Soyad</p>
                      <p className="text-sm text-white/70">{contact.firstname || '—'}</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-white/30 uppercase tracking-wider mb-1">E-posta</p>
                      <a href={`mailto:${contact.email}`} className="text-sm text-[#C1A45D] hover:underline break-all">{contact.email || '—'}</a>
                    </div>
                    <div>
                      <p className="text-[10px] text-white/30 uppercase tracking-wider mb-1">Telefon</p>
                      <a href={`tel:${contact.phone}`} className="text-sm text-white/70 hover:text-white transition-colors">{contact.phone || '—'}</a>
                    </div>
                    <div>
                      <p className="text-[10px] text-white/30 uppercase tracking-wider mb-1">Şehir</p>
                      <p className="text-sm text-white/70">{contact.city || '—'}</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-white/30 uppercase tracking-wider mb-1">Bütçe</p>
                      <p className="text-sm text-white/70">{contact.budget || '—'}</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-white/30 uppercase tracking-wider mb-1">İlgi Alanı</p>
                      <p className="text-sm text-white/70">{contact.interest || '—'}</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-white/30 uppercase tracking-wider mb-1">Tarih</p>
                      <p className="text-sm text-white/70">{contact.createdAt ? new Date(contact.createdAt).toLocaleString('tr-TR') : '—'}</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-white/30 uppercase tracking-wider mb-1">Kaynak</p>
                      <p className="text-sm text-white/70">{contact.source || '—'}</p>
                    </div>
                  </div>
                  {contact.message && (
                    <div>
                      <p className="text-[10px] text-white/30 uppercase tracking-wider mb-2">Mesaj</p>
                      <p className="text-sm text-white/60 leading-relaxed bg-white/[0.02] rounded-lg p-4">{contact.message}</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
