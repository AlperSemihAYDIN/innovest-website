'use client';

import { useEffect, useState, useCallback } from 'react';
import { Upload, Plus, X } from 'lucide-react';
import { adminApi } from '@/lib/adminApi';

interface GuideFormProps {
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
  keyPoints: [] as string[],
  keyPointsTr: [] as string[],
  category: '',
  categoryTr: '',
  ctaType: 'soft' as 'soft' | 'hard' | 'inline',
  ctaText: '',
  ctaTextTr: '',
  ctaLink: '',
  image: '',
};

type FormData = typeof defaultData;

const inputClass = 'w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-[#C1A45D]/50 transition-colors';
const labelClass = 'block text-xs text-white/50 uppercase tracking-wider mb-2 font-medium';

export default function GuideForm({ id, onSaved }: GuideFormProps) {
  const [data, setData] = useState<FormData>(defaultData);
  const [loading, setLoading] = useState(!!id);
  const [saving, setSaving] = useState(false);
  const [tab, setTab] = useState<'general' | 'en' | 'tr'>('general');

  const loadGuide = useCallback(async () => {
    if (!id) return;
    try {
      const guide = await adminApi.getGuide(id);
      setData({ ...defaultData, ...guide });
    } catch {
      alert('Veri yüklenemedi');
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => { loadGuide(); }, [loadGuide]);

  function update(field: string, value: unknown) {
    setData(prev => ({ ...prev, [field]: value }));
  }

  function updateList(field: 'bodyEn' | 'bodyTr' | 'keyPoints' | 'keyPointsTr', index: number, value: string) {
    setData(prev => {
      const arr = [...(prev[field] as string[])];
      arr[index] = value;
      return { ...prev, [field]: arr };
    });
  }

  function addToList(field: 'bodyEn' | 'bodyTr' | 'keyPoints' | 'keyPointsTr') {
    setData(prev => ({ ...prev, [field]: [...(prev[field] as string[]), ''] }));
  }

  function removeFromList(field: 'bodyEn' | 'bodyTr' | 'keyPoints' | 'keyPointsTr', index: number) {
    setData(prev => ({ ...prev, [field]: (prev[field] as string[]).filter((_, i) => i !== index) }));
  }

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const result = await adminApi.upload(file, `guides/${data.slug || 'new'}`);
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
      if (id) { await adminApi.updateGuide(id, data); }
      else { await adminApi.createGuide(data); }
      onSaved();
    } catch (err) {
      alert('Kaydetme hatası: ' + (err instanceof Error ? err.message : 'Bilinmeyen hata'));
    } finally { setSaving(false); }
  }

  if (loading) {
    return <div className="flex justify-center py-20"><div className="w-8 h-8 border-2 border-[#C1A45D]/30 border-t-[#C1A45D] rounded-full animate-spin" /></div>;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex gap-1 bg-[#0a1628] border border-white/5 rounded-xl p-1.5">
        {(['general', 'en', 'tr'] as const).map(t => (
          <button key={t} type="button" onClick={() => setTab(t)}
            className={`flex-1 px-4 py-2.5 rounded-lg text-xs font-medium transition-all ${tab === t ? 'bg-[#C1A45D]/15 text-[#C1A45D]' : 'text-white/40 hover:text-white/60'}`}>
            {t === 'general' ? 'Genel' : t === 'en' ? 'English' : 'Türkçe'}
          </button>
        ))}
      </div>

      <div className="bg-[#0a1628] border border-white/5 rounded-xl p-6 space-y-6">
        {tab === 'general' && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className={labelClass}>Slug *</label>
                <input value={data.slug} onChange={e => update('slug', e.target.value)} className={inputClass} required placeholder="what-is-stamp-duty" />
              </div>
              <div>
                <label className={labelClass}>CTA Türü</label>
                <select value={data.ctaType} onChange={e => update('ctaType', e.target.value)} className={inputClass}>
                  <option value="soft">Soft</option>
                  <option value="hard">Hard</option>
                  <option value="inline">Inline</option>
                </select>
              </div>
              <div>
                <label className={labelClass}>Kategori (EN) *</label>
                <input value={data.category} onChange={e => update('category', e.target.value)} className={inputClass} required placeholder="London Real Estate" />
              </div>
              <div>
                <label className={labelClass}>Kategori (TR) *</label>
                <input value={data.categoryTr} onChange={e => update('categoryTr', e.target.value)} className={inputClass} required placeholder="Londra Gayrimenkul" />
              </div>
              <div>
                <label className={labelClass}>CTA Text (EN)</label>
                <input value={data.ctaText} onChange={e => update('ctaText', e.target.value)} className={inputClass} placeholder="Schedule a consultation" />
              </div>
              <div>
                <label className={labelClass}>CTA Text (TR)</label>
                <input value={data.ctaTextTr} onChange={e => update('ctaTextTr', e.target.value)} className={inputClass} placeholder="Danışma randevusu alın" />
              </div>
              <div className="md:col-span-2">
                <label className={labelClass}>CTA Link</label>
                <input value={data.ctaLink || ''} onChange={e => update('ctaLink', e.target.value)} className={inputClass} placeholder="/contact" />
              </div>
            </div>
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
              <input value={data.title} onChange={e => update('title', e.target.value)} className={inputClass} required />
            </div>
            <div>
              <label className={labelClass}>Excerpt (EN) *</label>
              <textarea value={data.excerpt} onChange={e => update('excerpt', e.target.value)} className={`${inputClass} min-h-[80px] resize-y`} required />
            </div>
            <div>
              <div className="flex items-center justify-between mb-3">
                <label className={labelClass + ' mb-0'}>Body Paragraphs (EN)</label>
                <button type="button" onClick={() => addToList('bodyEn')} className="text-xs text-[#C1A45D] flex items-center gap-1"><Plus size={12} /> Ekle</button>
              </div>
              <div className="space-y-3">
                {data.bodyEn.map((p, i) => (
                  <div key={i} className="flex gap-2">
                    <textarea value={p} onChange={e => updateList('bodyEn', i, e.target.value)} className={`${inputClass} min-h-[100px] resize-y`} />
                    {data.bodyEn.length > 1 && <button type="button" onClick={() => removeFromList('bodyEn', i)} className="p-2 text-white/20 hover:text-red-400 self-start mt-2"><X size={16} /></button>}
                  </div>
                ))}
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-3">
                <label className={labelClass + ' mb-0'}>Key Points (EN)</label>
                <button type="button" onClick={() => addToList('keyPoints')} className="text-xs text-[#C1A45D] flex items-center gap-1"><Plus size={12} /> Ekle</button>
              </div>
              <div className="space-y-2">
                {(data.keyPoints || []).map((p, i) => (
                  <div key={i} className="flex gap-2">
                    <input value={p} onChange={e => updateList('keyPoints', i, e.target.value)} className={inputClass} />
                    <button type="button" onClick={() => removeFromList('keyPoints', i)} className="p-2 text-white/20 hover:text-red-400"><X size={16} /></button>
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
              <input value={data.titleTr} onChange={e => update('titleTr', e.target.value)} className={inputClass} required />
            </div>
            <div>
              <label className={labelClass}>Özet (TR) *</label>
              <textarea value={data.excerptTr} onChange={e => update('excerptTr', e.target.value)} className={`${inputClass} min-h-[80px] resize-y`} required />
            </div>
            <div>
              <div className="flex items-center justify-between mb-3">
                <label className={labelClass + ' mb-0'}>İçerik Paragrafları (TR)</label>
                <button type="button" onClick={() => addToList('bodyTr')} className="text-xs text-[#C1A45D] flex items-center gap-1"><Plus size={12} /> Ekle</button>
              </div>
              <div className="space-y-3">
                {data.bodyTr.map((p, i) => (
                  <div key={i} className="flex gap-2">
                    <textarea value={p} onChange={e => updateList('bodyTr', i, e.target.value)} className={`${inputClass} min-h-[100px] resize-y`} />
                    {data.bodyTr.length > 1 && <button type="button" onClick={() => removeFromList('bodyTr', i)} className="p-2 text-white/20 hover:text-red-400 self-start mt-2"><X size={16} /></button>}
                  </div>
                ))}
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-3">
                <label className={labelClass + ' mb-0'}>Anahtar Noktalar (TR)</label>
                <button type="button" onClick={() => addToList('keyPointsTr')} className="text-xs text-[#C1A45D] flex items-center gap-1"><Plus size={12} /> Ekle</button>
              </div>
              <div className="space-y-2">
                {(data.keyPointsTr || []).map((p, i) => (
                  <div key={i} className="flex gap-2">
                    <input value={p} onChange={e => updateList('keyPointsTr', i, e.target.value)} className={inputClass} />
                    <button type="button" onClick={() => removeFromList('keyPointsTr', i)} className="p-2 text-white/20 hover:text-red-400"><X size={16} /></button>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>

      <div className="flex justify-end">
        <button type="submit" disabled={saving} className="px-8 py-3 bg-[#C1A45D] hover:bg-[#d4b76e] disabled:opacity-50 text-white text-sm font-medium rounded-lg transition-colors">
          {saving ? 'Kaydediliyor...' : id ? 'Güncelle' : 'Oluştur'}
        </button>
      </div>
    </form>
  );
}
