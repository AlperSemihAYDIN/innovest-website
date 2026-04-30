'use client';

import { useEffect, useState } from 'react';
import { Plus, Pencil, Trash2, Search, X } from 'lucide-react';
import { adminApi } from '@/lib/adminApi';
import GuideForm from '@/components/admin/GuideForm';

interface Guide {
  id: string;
  slug: string;
  title: string;
  titleTr: string;
  category: string;
  categoryTr: string;
  ctaType: string;
}

export default function GuidesPage() {
  const [guides, setGuides] = useState<Guide[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => { loadGuides(); }, []);

  async function loadGuides() {
    try { const data = await adminApi.getGuides(); setGuides(data); }
    catch { /* empty */ } finally { setLoading(false); }
  }

  async function handleDelete(id: string, title: string) {
    if (!confirm(`"${title}" rehberini silmek istediğinize emin misiniz?`)) return;
    try { await adminApi.deleteGuide(id); setGuides(prev => prev.filter(g => g.id !== id)); }
    catch (err) { alert('Silme hatası: ' + (err instanceof Error ? err.message : 'Bilinmeyen hata')); }
  }

  function handleSaved() { setShowForm(false); setEditingId(null); loadGuides(); }

  const filtered = guides.filter(g =>
    g.title?.toLowerCase().includes(search.toLowerCase()) ||
    g.category?.toLowerCase().includes(search.toLowerCase())
  );

  if (showForm || editingId) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-white">{editingId ? 'Rehber Düzenle' : 'Yeni Rehber'}</h1>
          <button onClick={() => { setShowForm(false); setEditingId(null); }} className="flex items-center gap-2 px-4 py-2 text-white/50 hover:text-white text-sm transition-colors">
            <X size={16} /> İptal
          </button>
        </div>
        <GuideForm id={editingId} onSaved={handleSaved} />
      </div>
    );
  }

  return (
    <div>
      <div className="admin-sticky-bar" style={{ marginBottom: '24px' }}>
        <div className="mr-auto">
          <h1 className="text-lg font-semibold text-white">Rehberler</h1>
          <p className="text-white/40 text-[11px] mt-0.5">{guides.length} rehber</p>
        </div>
        <button onClick={() => setShowForm(true)} className="admin-btn-primary">
          <Plus size={14} /> Yeni Ekle
        </button>
      </div>

      <div className="admin-card">
        <h2 className="admin-section-title">Liste</h2>
        <div className="relative" style={{ marginBottom: '20px' }}>
          <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" />
          <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Rehber ara..."
            className="admin-input" style={{ paddingLeft: '44px' }} />
        </div>

        {loading ? (
          <div className="flex justify-center py-16"><div className="w-8 h-8 border-2 border-[#C9A84C]/30 border-t-[#C9A84C] rounded-full animate-spin" /></div>
        ) : filtered.length === 0 ? (
          <div className="py-16 text-center">
            <p className="text-white/30 text-sm">{search ? 'Sonuç bulunamadı' : 'Henüz rehber eklenmedi'}</p>
          </div>
        ) : (
          <div className="overflow-x-auto -mx-2">
            <table className="w-full min-w-[560px]">
              <thead>
                <tr className="border-b border-white/[0.08]">
                  <th className="text-left px-3 py-3 text-[10px] text-white/40 font-semibold uppercase tracking-wider">Başlık</th>
                  <th className="text-left px-3 py-3 text-[10px] text-white/40 font-semibold uppercase tracking-wider">Kategori</th>
                  <th className="text-left px-3 py-3 text-[10px] text-white/40 font-semibold uppercase tracking-wider">CTA</th>
                  <th className="text-right px-3 py-3 text-[10px] text-white/40 font-semibold uppercase tracking-wider">İşlem</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.06]">
                {filtered.map(guide => (
                  <tr key={guide.id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="px-3 py-3">
                      <p className="text-sm text-white">{guide.title}</p>
                      <p className="text-xs text-white/30 mt-0.5">{guide.titleTr}</p>
                    </td>
                    <td className="px-3 py-3">
                      <span className="text-xs px-2 py-1 bg-white/5 rounded text-white/50">{guide.category}</span>
                    </td>
                    <td className="px-3 py-3">
                      <span className={`text-[10px] px-2 py-1 rounded uppercase ${
                        guide.ctaType === 'hard' ? 'bg-red-500/10 text-red-400' :
                        guide.ctaType === 'inline' ? 'bg-blue-500/10 text-blue-400' :
                        'bg-green-500/10 text-green-400'
                      }`}>{guide.ctaType}</span>
                    </td>
                    <td className="px-3 py-3">
                      <div className="flex items-center justify-end gap-1">
                        <button onClick={() => setEditingId(guide.id)} className="p-2 hover:bg-white/5 rounded-lg text-white/40 hover:text-white transition-all"><Pencil size={14} /></button>
                        <button onClick={() => handleDelete(guide.id, guide.title)} className="p-2 hover:bg-red-500/10 rounded-lg text-white/40 hover:text-red-400 transition-all"><Trash2 size={14} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
