'use client';

import { useEffect, useState } from 'react';
import { Plus, Pencil, Trash2, Search, Star, X } from 'lucide-react';
import { adminApi } from '@/lib/adminApi';
import ArticleForm from '@/components/admin/ArticleForm';

interface Article {
  id: string;
  slug: string;
  title: string;
  titleTr: string;
  category: string;
  date: string;
  featured: boolean;
}

export default function ArticlesPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => { loadArticles(); }, []);

  async function loadArticles() {
    try {
      const data = await adminApi.getArticles();
      setArticles(data);
    } catch { /* empty */ } finally { setLoading(false); }
  }

  async function handleDelete(id: string, title: string) {
    if (!confirm(`"${title}" makalesini silmek istediğinize emin misiniz?`)) return;
    try {
      await adminApi.deleteArticle(id);
      setArticles(prev => prev.filter(a => a.id !== id));
    } catch (err) { alert('Silme hatası: ' + (err instanceof Error ? err.message : 'Bilinmeyen hata')); }
  }

  function handleSaved() { setShowForm(false); setEditingId(null); loadArticles(); }

  const filtered = articles.filter(a =>
    a.title?.toLowerCase().includes(search.toLowerCase()) ||
    a.category?.toLowerCase().includes(search.toLowerCase())
  );

  if (showForm || editingId) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-white">{editingId ? 'Makale Düzenle' : 'Yeni Makale'}</h1>
          <button onClick={() => { setShowForm(false); setEditingId(null); }} className="flex items-center gap-2 px-4 py-2 text-white/50 hover:text-white text-sm transition-colors">
            <X size={16} /> İptal
          </button>
        </div>
        <ArticleForm id={editingId} onSaved={handleSaved} />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-white">Makaleler</h1>
          <p className="text-white/40 text-sm mt-1">{articles.length} makale</p>
        </div>
        <button onClick={() => setShowForm(true)} className="flex items-center gap-2 px-5 py-2.5 bg-[#C9A84C] hover:bg-[#b8963e] text-white text-sm font-medium rounded-lg transition-colors">
          <Plus size={16} /> Yeni Ekle
        </button>
      </div>

      <div className="relative">
        <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" />
        <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Makale ara..."
          className="w-full bg-white/[0.04] border border-white/[0.08] rounded-lg pl-11 pr-4 py-3 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-[#C9A84C]/30 transition-colors" />
      </div>

      {loading ? (
        <div className="flex justify-center py-20"><div className="w-8 h-8 border-2 border-[#C9A84C]/30 border-t-[#C9A84C] rounded-full animate-spin" /></div>
      ) : filtered.length === 0 ? (
        <div className="bg-white/[0.04] border border-white/[0.08] rounded-xl py-20 text-center">
          <p className="text-white/30 text-sm">{search ? 'Sonuç bulunamadı' : 'Henüz makale eklenmedi'}</p>
        </div>
      ) : (
        <div className="bg-white/[0.04] border border-white/[0.08] rounded-xl overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/[0.08]">
                <th className="text-left px-6 py-4 text-xs text-white/40 font-medium uppercase tracking-wider">Başlık</th>
                <th className="text-left px-6 py-4 text-xs text-white/40 font-medium uppercase tracking-wider">Kategori</th>
                <th className="text-left px-6 py-4 text-xs text-white/40 font-medium uppercase tracking-wider">Tarih</th>
                <th className="text-right px-6 py-4 text-xs text-white/40 font-medium uppercase tracking-wider">İşlemler</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filtered.map(article => (
                <tr key={article.id} className="hover:bg-white/[0.02] transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      {article.featured && <Star size={12} className="text-[#C9A84C] fill-[#C9A84C]" />}
                      <p className="text-sm text-white">{article.title}</p>
                    </div>
                    <p className="text-xs text-white/30 mt-0.5">{article.titleTr}</p>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-xs px-2 py-1 bg-white/5 rounded text-white/50">{article.category}</span>
                  </td>
                  <td className="px-6 py-4 text-sm text-white/50">{article.date}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <button onClick={() => setEditingId(article.id)} className="p-2 hover:bg-white/5 rounded-lg text-white/40 hover:text-white transition-all" title="Düzenle">
                        <Pencil size={14} />
                      </button>
                      <button onClick={() => handleDelete(article.id, article.title)} className="p-2 hover:bg-red-500/10 rounded-lg text-white/40 hover:text-red-400 transition-all" title="Sil">
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
