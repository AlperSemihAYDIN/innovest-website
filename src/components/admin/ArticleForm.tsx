'use client';

import { useEffect, useState, useCallback } from 'react';
import { Upload, Plus, X } from 'lucide-react';
import { adminApi } from '@/lib/adminApi';

interface ArticleFormProps {
  id?: string | null;
  onSaved: () => void;
}

const defaultData = {
  slug: '',
  title: '',
  titleTr: '',
  excerpt: '',
  excerptTr: '',
  bodyEn: [''],
  bodyTr: [''],
  category: '',
  date: '',
  dateTr: '',
  readTime: '',
  readTimeTr: '',
  image: '',
  featured: false,
};

type FormData = typeof defaultData;

const inputClass = 'w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-[#C9A84C]/50 transition-colors';
const labelClass = 'block text-xs text-white/50 uppercase tracking-wider mb-2 font-medium';

export default function ArticleForm({ id, onSaved }: ArticleFormProps) {
  const [data, setData] = useState<FormData>(defaultData);
  const [loading, setLoading] = useState(!!id);
  const [saving, setSaving] = useState(false);
  const [tab, setTab] = useState<'general' | 'en' | 'tr'>('general');

  const loadArticle = useCallback(async () => {
    if (!id) return;
    try {
      const article = await adminApi.getArticle(id);
      // Merge with defaults so legacy docs missing some fields don't cause uncontrolled-input errors.
      setData({ ...defaultData, ...article });
    } catch (err) {
      alert('Veri yüklenemedi: ' + (err instanceof Error ? err.message : 'Bilinmeyen hata'));
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    loadArticle();
  }, [loadArticle]);

  function update(field: string, value: unknown) {
    setData(prev => ({ ...prev, [field]: value }));
  }

  function updateParagraph(lang: 'bodyEn' | 'bodyTr', index: number, value: string) {
    setData(prev => {
      const arr = [...prev[lang]];
      arr[index] = value;
      return { ...prev, [lang]: arr };
    });
  }

  function addParagraph(lang: 'bodyEn' | 'bodyTr') {
    setData(prev => ({ ...prev, [lang]: [...prev[lang], ''] }));
  }

  function removeParagraph(lang: 'bodyEn' | 'bodyTr', index: number) {
    setData(prev => ({ ...prev, [lang]: prev[lang].filter((_, i) => i !== index) }));
  }

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const result = await adminApi.upload(file, `articles/${data.slug || 'new'}`);
      update('image', result.url);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Bilinmeyen hata';
      alert(`Yükleme hatası: ${message}\n\nAlternatif: "Kapak Görseli" alanına doğrudan bir resim URL'si yapıştırabilirsiniz.`);
    }
    e.target.value = '';
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    try {
      if (id) {
        await adminApi.updateArticle(id, data);
      } else {
        await adminApi.createArticle(data);
      }
      onSaved();
    } catch (err) {
      alert('Kaydetme hatası: ' + (err instanceof Error ? err.message : 'Bilinmeyen hata'));
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <div className="w-8 h-8 border-2 border-[#C9A84C]/30 border-t-[#C9A84C] rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Tabs */}
      <div className="flex gap-1 bg-white/[0.04] border border-white/[0.08] rounded-xl p-1.5">
        {(['general', 'en', 'tr'] as const).map(t => (
          <button
            key={t}
            type="button"
            onClick={() => setTab(t)}
            className={`flex-1 px-4 py-2.5 rounded-lg text-xs font-medium transition-all ${
              tab === t ? 'bg-[#C9A84C]/15 text-[#C9A84C]' : 'text-white/40 hover:text-white/60'
            }`}
          >
            {t === 'general' ? 'Genel' : t === 'en' ? 'English' : 'Türkçe'}
          </button>
        ))}
      </div>

      <div className="bg-white/[0.04] border border-white/[0.08] rounded-xl p-6 space-y-6">
        {tab === 'general' && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className={labelClass}>Slug *</label>
                <input value={data.slug} onChange={e => update('slug', e.target.value)} className={inputClass} required placeholder="london-property-market-2026" />
              </div>
              <div>
                <label className={labelClass}>Kategori *</label>
                <input value={data.category} onChange={e => update('category', e.target.value)} className={inputClass} required placeholder="Market Reports" />
              </div>
              <div>
                <label className={labelClass}>Tarih (EN)</label>
                <input value={data.date} onChange={e => update('date', e.target.value)} className={inputClass} placeholder="15 March 2026" />
              </div>
              <div>
                <label className={labelClass}>Tarih (TR)</label>
                <input value={data.dateTr} onChange={e => update('dateTr', e.target.value)} className={inputClass} placeholder="15 Mart 2026" />
              </div>
              <div>
                <label className={labelClass}>Okuma Süresi (EN)</label>
                <input value={data.readTime} onChange={e => update('readTime', e.target.value)} className={inputClass} placeholder="8 min read" />
              </div>
              <div>
                <label className={labelClass}>Okuma Süresi (TR)</label>
                <input value={data.readTimeTr} onChange={e => update('readTimeTr', e.target.value)} className={inputClass} placeholder="8 dk okuma" />
              </div>
            </div>
            <div className="flex items-center gap-3">
              <input type="checkbox" checked={data.featured} onChange={e => update('featured', e.target.checked)} className="rounded" id="featured" />
              <label htmlFor="featured" className="text-sm text-white/60">Öne Çıkan Makale</label>
            </div>
            {/* Image */}
            <div>
              <label className={labelClass}>Kapak Görseli</label>
              {data.image && <img src={data.image} alt="" className="h-32 rounded-lg object-cover mb-3" />}
              <div className="flex gap-3">
                <input value={data.image} onChange={e => update('image', e.target.value)} className={inputClass} placeholder="URL veya yükleyin" />
                <label className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg cursor-pointer text-xs text-white/60 hover:text-white transition-all whitespace-nowrap">
                  <Upload size={14} /> Yükle
                  <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                </label>
              </div>
            </div>
          </>
        )}

        {tab === 'en' && (
          <>
            <div>
              <label className={labelClass}>Title (EN) *</label>
              <input value={data.title} onChange={e => update('title', e.target.value)} className={inputClass} required placeholder="Article title in English" />
            </div>
            <div>
              <label className={labelClass}>Excerpt (EN) *</label>
              <textarea value={data.excerpt} onChange={e => update('excerpt', e.target.value)} className={`${inputClass} min-h-[80px] resize-y`} required placeholder="Short summary..." />
            </div>
            <div>
              <div className="flex items-center justify-between mb-3">
                <label className={labelClass + ' mb-0'}>Body Paragraphs (EN)</label>
                <button type="button" onClick={() => addParagraph('bodyEn')} className="text-xs text-[#C9A84C] hover:text-[#b8963e] flex items-center gap-1">
                  <Plus size={12} /> Paragraf Ekle
                </button>
              </div>
              <div className="space-y-3">
                {data.bodyEn.map((p, i) => (
                  <div key={i} className="flex gap-2">
                    <textarea value={p} onChange={e => updateParagraph('bodyEn', i, e.target.value)} className={`${inputClass} min-h-[100px] resize-y`} placeholder={`Paragraph ${i + 1}`} />
                    {data.bodyEn.length > 1 && (
                      <button type="button" onClick={() => removeParagraph('bodyEn', i)} className="p-2 text-white/20 hover:text-red-400 transition-colors self-start mt-2">
                        <X size={16} />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {tab === 'tr' && (
          <>
            <div>
              <label className={labelClass}>Başlık (TR) *</label>
              <input value={data.titleTr} onChange={e => update('titleTr', e.target.value)} className={inputClass} required placeholder="Makale başlığı..." />
            </div>
            <div>
              <label className={labelClass}>Özet (TR) *</label>
              <textarea value={data.excerptTr} onChange={e => update('excerptTr', e.target.value)} className={`${inputClass} min-h-[80px] resize-y`} required placeholder="Kısa özet..." />
            </div>
            <div>
              <div className="flex items-center justify-between mb-3">
                <label className={labelClass + ' mb-0'}>İçerik Paragrafları (TR)</label>
                <button type="button" onClick={() => addParagraph('bodyTr')} className="text-xs text-[#C9A84C] hover:text-[#b8963e] flex items-center gap-1">
                  <Plus size={12} /> Paragraf Ekle
                </button>
              </div>
              <div className="space-y-3">
                {data.bodyTr.map((p, i) => (
                  <div key={i} className="flex gap-2">
                    <textarea value={p} onChange={e => updateParagraph('bodyTr', i, e.target.value)} className={`${inputClass} min-h-[100px] resize-y`} placeholder={`Paragraf ${i + 1}`} />
                    {data.bodyTr.length > 1 && (
                      <button type="button" onClick={() => removeParagraph('bodyTr', i)} className="p-2 text-white/20 hover:text-red-400 transition-colors self-start mt-2">
                        <X size={16} />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>

      <div className="flex justify-end">
        <button type="submit" disabled={saving} className="px-8 py-3 bg-[#C9A84C] hover:bg-[#b8963e] disabled:opacity-50 text-white text-sm font-medium rounded-lg transition-colors">
          {saving ? 'Kaydediliyor...' : id ? 'Güncelle' : 'Oluştur'}
        </button>
      </div>
    </form>
  );
}
