'use client';

import { useEffect, useState, useCallback } from 'react';
import { Upload, Plus, X } from 'lucide-react';
import { adminApi } from '@/lib/adminApi';

interface PropertyFormProps {
  id?: string | null;
  onSaved: () => void;
}

const defaultData = {
  slug: '',
  name: '',
  developer: '',
  location: '',
  fullAddress: '',
  region: 'UK' as const,
  city: 'london' as const,
  price: '',
  priceNote: { en: 'Starting from', tr: 'Başlangıç fiyatı' },
  yield: '',
  completion: '',
  beds: '',
  floors: '',
  totalUnits: '',
  lat: 0,
  lng: 0,
  heroImage: '',
  images: [] as string[],
  description: { en: '', tr: '' },
  highlights: { en: [] as string[], tr: [] as string[] },
  amenities: [] as string[],
};

type FormData = typeof defaultData;

const inputClass = 'w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-[#C1A45D]/50 transition-colors';
const labelClass = 'block text-xs text-white/50 uppercase tracking-wider mb-2 font-medium';

export default function PropertyForm({ id, onSaved }: PropertyFormProps) {
  const [data, setData] = useState<FormData>(defaultData);
  const [loading, setLoading] = useState(!!id);
  const [saving, setSaving] = useState(false);
  const [tab, setTab] = useState<'general' | 'en' | 'tr' | 'media'>('general');

  const loadProperty = useCallback(async () => {
    if (!id) return;
    try {
      const prop = await adminApi.getProperty(id);
      setData(prop);
    } catch {
      alert('Veri yüklenemedi');
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    loadProperty();
  }, [loadProperty]);

  function update(field: string, value: unknown) {
    setData(prev => ({ ...prev, [field]: value }));
  }

  function updateNested(parent: 'description' | 'priceNote', lang: 'en' | 'tr', value: string) {
    setData(prev => ({ ...prev, [parent]: { ...prev[parent], [lang]: value } }));
  }

  function updateHighlight(lang: 'en' | 'tr', index: number, value: string) {
    setData(prev => {
      const arr = [...prev.highlights[lang]];
      arr[index] = value;
      return { ...prev, highlights: { ...prev.highlights, [lang]: arr } };
    });
  }

  function addHighlight(lang: 'en' | 'tr') {
    setData(prev => ({
      ...prev,
      highlights: { ...prev.highlights, [lang]: [...prev.highlights[lang], ''] },
    }));
  }

  function removeHighlight(lang: 'en' | 'tr', index: number) {
    setData(prev => ({
      ...prev,
      highlights: { ...prev.highlights, [lang]: prev.highlights[lang].filter((_, i) => i !== index) },
    }));
  }

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>, field: 'heroImage' | 'images') {
    const files = e.target.files;
    if (!files) return;

    for (const file of Array.from(files)) {
      try {
        const result = await adminApi.upload(file, `properties/${data.slug || 'new'}`);
        if (field === 'heroImage') {
          update('heroImage', result.url);
        } else {
          setData(prev => ({ ...prev, images: [...prev.images, result.url] }));
        }
      } catch {
        alert('Yükleme hatası');
      }
    }
    e.target.value = '';
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);

    try {
      if (id) {
        await adminApi.updateProperty(id, data);
      } else {
        await adminApi.createProperty(data);
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
        <div className="w-8 h-8 border-2 border-[#C1A45D]/30 border-t-[#C1A45D] rounded-full animate-spin" />
      </div>
    );
  }

  const tabs = [
    { key: 'general' as const, label: 'Genel Bilgiler' },
    { key: 'en' as const, label: 'English' },
    { key: 'tr' as const, label: 'Türkçe' },
    { key: 'media' as const, label: 'Medya' },
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Tabs */}
      <div className="flex gap-1 bg-[#0a1628] border border-white/5 rounded-xl p-1.5">
        {tabs.map(t => (
          <button
            key={t.key}
            type="button"
            onClick={() => setTab(t.key)}
            className={`flex-1 px-4 py-2.5 rounded-lg text-xs font-medium transition-all ${
              tab === t.key ? 'bg-[#C1A45D]/15 text-[#C1A45D]' : 'text-white/40 hover:text-white/60'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="bg-[#0a1628] border border-white/5 rounded-xl p-6 space-y-6">
        {/* General Tab */}
        {tab === 'general' && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className={labelClass}>Proje Adı *</label>
                <input value={data.name} onChange={e => update('name', e.target.value)} className={inputClass} required placeholder="Westminster Tower" />
              </div>
              <div>
                <label className={labelClass}>Slug *</label>
                <input value={data.slug} onChange={e => update('slug', e.target.value)} className={inputClass} required placeholder="westminster-tower" />
              </div>
              <div>
                <label className={labelClass}>Geliştirici</label>
                <input value={data.developer} onChange={e => update('developer', e.target.value)} className={inputClass} placeholder="London Square" />
              </div>
              <div>
                <label className={labelClass}>Konum</label>
                <input value={data.location} onChange={e => update('location', e.target.value)} className={inputClass} placeholder="SE1 7SP, London" />
              </div>
              <div className="md:col-span-2">
                <label className={labelClass}>Tam Adres</label>
                <input value={data.fullAddress} onChange={e => update('fullAddress', e.target.value)} className={inputClass} placeholder="3 Albert Embankment, London SE1 7SP, UK" />
              </div>
              <div>
                <label className={labelClass}>Bölge *</label>
                <select value={data.region} onChange={e => update('region', e.target.value)} className={inputClass}>
                  <option value="UK">UK</option>
                  <option value="UAE">UAE</option>
                </select>
              </div>
              <div>
                <label className={labelClass}>Şehir *</label>
                <select value={data.city} onChange={e => update('city', e.target.value)} className={inputClass}>
                  <option value="london">London</option>
                  <option value="dubai">Dubai</option>
                </select>
              </div>
              <div>
                <label className={labelClass}>Fiyat *</label>
                <input value={data.price} onChange={e => update('price', e.target.value)} className={inputClass} required placeholder="£550,000" />
              </div>
              <div>
                <label className={labelClass}>Getiri *</label>
                <input value={data.yield} onChange={e => update('yield', e.target.value)} className={inputClass} required placeholder="5.2%" />
              </div>
              <div>
                <label className={labelClass}>Teslim Tarihi</label>
                <input value={data.completion} onChange={e => update('completion', e.target.value)} className={inputClass} placeholder="Q2 2026" />
              </div>
              <div>
                <label className={labelClass}>Yatak Odası</label>
                <input value={data.beds} onChange={e => update('beds', e.target.value)} className={inputClass} placeholder="1–3 Bed" />
              </div>
              <div>
                <label className={labelClass}>Kat Sayısı</label>
                <input value={data.floors || ''} onChange={e => update('floors', e.target.value)} className={inputClass} placeholder="30" />
              </div>
              <div>
                <label className={labelClass}>Toplam Ünite</label>
                <input value={data.totalUnits || ''} onChange={e => update('totalUnits', e.target.value)} className={inputClass} placeholder="218" />
              </div>
              <div>
                <label className={labelClass}>Enlem</label>
                <input type="number" step="any" value={data.lat} onChange={e => update('lat', parseFloat(e.target.value) || 0)} className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Boylam</label>
                <input type="number" step="any" value={data.lng} onChange={e => update('lng', parseFloat(e.target.value) || 0)} className={inputClass} />
              </div>
            </div>
            {/* Amenities */}
            <div>
              <label className={labelClass}>Olanaklar (virgülle ayırın)</label>
              <input
                value={data.amenities.join(', ')}
                onChange={e => update('amenities', e.target.value.split(',').map(s => s.trim()).filter(Boolean))}
                className={inputClass}
                placeholder="24hr Concierge, Gym, Pool"
              />
            </div>
            {/* Price Notes */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className={labelClass}>Fiyat Notu (EN)</label>
                <input value={data.priceNote.en} onChange={e => updateNested('priceNote', 'en', e.target.value)} className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Fiyat Notu (TR)</label>
                <input value={data.priceNote.tr} onChange={e => updateNested('priceNote', 'tr', e.target.value)} className={inputClass} />
              </div>
            </div>
          </>
        )}

        {/* English Tab */}
        {tab === 'en' && (
          <>
            <div>
              <label className={labelClass}>Description (English) *</label>
              <textarea
                value={data.description.en}
                onChange={e => updateNested('description', 'en', e.target.value)}
                className={`${inputClass} min-h-[200px] resize-y`}
                required
                placeholder="Property description in English..."
              />
            </div>
            <div>
              <div className="flex items-center justify-between mb-3">
                <label className={labelClass + ' mb-0'}>Highlights (English)</label>
                <button type="button" onClick={() => addHighlight('en')} className="text-xs text-[#C1A45D] hover:text-[#d4b76e] flex items-center gap-1">
                  <Plus size={12} /> Ekle
                </button>
              </div>
              <div className="space-y-2">
                {data.highlights.en.map((h, i) => (
                  <div key={i} className="flex gap-2">
                    <input value={h} onChange={e => updateHighlight('en', i, e.target.value)} className={inputClass} placeholder={`Highlight ${i + 1}`} />
                    <button type="button" onClick={() => removeHighlight('en', i)} className="p-2 text-white/20 hover:text-red-400 transition-colors">
                      <X size={16} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {/* Turkish Tab */}
        {tab === 'tr' && (
          <>
            <div>
              <label className={labelClass}>Açıklama (Türkçe) *</label>
              <textarea
                value={data.description.tr}
                onChange={e => updateNested('description', 'tr', e.target.value)}
                className={`${inputClass} min-h-[200px] resize-y`}
                required
                placeholder="Gayrimenkul açıklaması..."
              />
            </div>
            <div>
              <div className="flex items-center justify-between mb-3">
                <label className={labelClass + ' mb-0'}>Öne Çıkanlar (Türkçe)</label>
                <button type="button" onClick={() => addHighlight('tr')} className="text-xs text-[#C1A45D] hover:text-[#d4b76e] flex items-center gap-1">
                  <Plus size={12} /> Ekle
                </button>
              </div>
              <div className="space-y-2">
                {data.highlights.tr.map((h, i) => (
                  <div key={i} className="flex gap-2">
                    <input value={h} onChange={e => updateHighlight('tr', i, e.target.value)} className={inputClass} placeholder={`Öne çıkan ${i + 1}`} />
                    <button type="button" onClick={() => removeHighlight('tr', i)} className="p-2 text-white/20 hover:text-red-400 transition-colors">
                      <X size={16} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {/* Media Tab */}
        {tab === 'media' && (
          <>
            <div>
              <label className={labelClass}>Ana Görsel</label>
              {data.heroImage && (
                <div className="mb-3 relative inline-block">
                  <img src={data.heroImage} alt="" className="h-40 rounded-lg object-cover" />
                  <button
                    type="button"
                    onClick={() => update('heroImage', '')}
                    className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-white"
                  >
                    <X size={12} />
                  </button>
                </div>
              )}
              <div className="flex gap-3">
                <input value={data.heroImage} onChange={e => update('heroImage', e.target.value)} className={inputClass} placeholder="URL veya yükleyin" />
                <label className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg cursor-pointer text-xs text-white/60 hover:text-white transition-all whitespace-nowrap">
                  <Upload size={14} /> Yükle
                  <input type="file" accept="image/*" onChange={e => handleImageUpload(e, 'heroImage')} className="hidden" />
                </label>
              </div>
            </div>
            <div>
              <label className={labelClass}>Galeri Görselleri</label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-3">
                {data.images.map((img, i) => (
                  <div key={i} className="relative group">
                    <img src={img} alt="" className="h-24 w-full rounded-lg object-cover" />
                    <button
                      type="button"
                      onClick={() => setData(prev => ({ ...prev, images: prev.images.filter((_, idx) => idx !== i) }))}
                      className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X size={12} />
                    </button>
                  </div>
                ))}
              </div>
              <label className="flex items-center justify-center gap-2 px-4 py-6 bg-white/[0.02] hover:bg-white/5 border border-dashed border-white/10 rounded-lg cursor-pointer text-xs text-white/40 hover:text-white/60 transition-all">
                <Upload size={16} /> Görsel Yükle
                <input type="file" accept="image/*" multiple onChange={e => handleImageUpload(e, 'images')} className="hidden" />
              </label>
            </div>
          </>
        )}
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <button
          type="submit"
          disabled={saving}
          className="px-8 py-3 bg-[#C1A45D] hover:bg-[#d4b76e] disabled:opacity-50 text-white text-sm font-medium rounded-lg transition-colors"
        >
          {saving ? 'Kaydediliyor...' : id ? 'Güncelle' : 'Oluştur'}
        </button>
      </div>
    </form>
  );
}
