'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Save, Plus, Trash2, ExternalLink } from 'lucide-react';
import { adminApi } from '@/lib/adminApi';
import { homeDefaults, type HomePageContent } from '@/lib/pageDefaults';

const inputClass =
  'w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-[#C1A45D]/50 transition-colors';
const textareaClass = `${inputClass} resize-y min-h-[80px]`;
const labelClass = 'block text-xs text-white/50 uppercase tracking-wider mb-2 font-medium';
const sectionCard = 'bg-[#0a1628] border border-white/5 rounded-xl p-6 space-y-5';
const sectionTitle = 'text-sm font-semibold text-white border-b border-white/10 pb-3 mb-4';
const subBlock = 'border border-white/5 rounded-lg p-4 space-y-3 bg-white/[0.02]';

interface PageEditorProps {
  slug: string;
}

export default function HomePageEditor({ slug = 'home' }: Partial<PageEditorProps> = {}) {
  const [data, setData] = useState<HomePageContent>(homeDefaults);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const remote = await adminApi.getPage(slug);
        setData({ ...homeDefaults, ...remote } as HomePageContent);
      } catch {
        // use defaults
      } finally {
        setLoading(false);
      }
    })();
  }, [slug]);

  function setField<K extends keyof HomePageContent>(section: K, value: HomePageContent[K]) {
    setData((prev) => ({ ...prev, [section]: value }));
    setSaved(false);
  }

  async function handleSave() {
    setSaving(true);
    try {
      await adminApi.updatePage(slug, data as unknown as Record<string, unknown>);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
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

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Header */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/pages"
            className="w-9 h-9 rounded-lg flex items-center justify-center bg-white/5 hover:bg-white/10 text-white/60 hover:text-white transition-all"
            aria-label="Geri"
          >
            <ArrowLeft size={16} />
          </Link>
          <div>
            <h1 className="text-2xl font-semibold text-white">Ana Sayfa</h1>
            <p className="text-white/40 text-xs mt-1">Hero, istatistik, hizmet, görüş ve CTA içerikleri</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex items-center gap-1.5 px-3 py-2.5 text-xs text-white/50 hover:text-white transition-colors"
          >
            Önizle <ExternalLink size={12} />
          </a>
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 px-5 py-2.5 bg-[#C1A45D] hover:bg-[#d4b87a] text-[#060e1a] text-sm font-semibold rounded-lg transition-all disabled:opacity-50"
          >
            <Save size={14} />
            {saving ? 'Kaydediliyor...' : saved ? 'Kaydedildi ✓' : 'Kaydet'}
          </button>
        </div>
      </div>

      {/* HERO */}
      <div className={sectionCard}>
        <h2 className={sectionTitle}>Hero (Üst Banner)</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>Başlık (TR)</label>
            <input
              value={data.hero.titleTr}
              onChange={(e) => setField('hero', { ...data.hero, titleTr: e.target.value })}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>Title (EN)</label>
            <input
              value={data.hero.titleEn}
              onChange={(e) => setField('hero', { ...data.hero, titleEn: e.target.value })}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>Vurgulu kısım (TR)</label>
            <input
              value={data.hero.titleHighlightTr}
              onChange={(e) => setField('hero', { ...data.hero, titleHighlightTr: e.target.value })}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>Highlight (EN)</label>
            <input
              value={data.hero.titleHighlightEn}
              onChange={(e) => setField('hero', { ...data.hero, titleHighlightEn: e.target.value })}
              className={inputClass}
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>Alt metin (TR)</label>
            <textarea
              value={data.hero.subtitleTr}
              onChange={(e) => setField('hero', { ...data.hero, subtitleTr: e.target.value })}
              className={textareaClass}
              rows={4}
            />
          </div>
          <div>
            <label className={labelClass}>Subtitle (EN)</label>
            <textarea
              value={data.hero.subtitleEn}
              onChange={(e) => setField('hero', { ...data.hero, subtitleEn: e.target.value })}
              className={textareaClass}
              rows={4}
            />
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <label className={labelClass}>Birincil Buton (TR)</label>
            <input value={data.hero.ctaTr} onChange={(e) => setField('hero', { ...data.hero, ctaTr: e.target.value })} className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Primary Button (EN)</label>
            <input value={data.hero.ctaEn} onChange={(e) => setField('hero', { ...data.hero, ctaEn: e.target.value })} className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>İkincil Buton (TR)</label>
            <input value={data.hero.ctaSecondaryTr} onChange={(e) => setField('hero', { ...data.hero, ctaSecondaryTr: e.target.value })} className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Secondary Button (EN)</label>
            <input value={data.hero.ctaSecondaryEn} onChange={(e) => setField('hero', { ...data.hero, ctaSecondaryEn: e.target.value })} className={inputClass} />
          </div>
        </div>
      </div>

      {/* STATS */}
      <div className={sectionCard}>
        <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4">
          <h2 className="text-sm font-semibold text-white">İstatistikler</h2>
          <button
            onClick={() => setField('stats', [...data.stats, { value: '', labelEn: '', labelTr: '' }])}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-white/5 hover:bg-white/10 text-xs text-white/70 rounded-md transition-all"
          >
            <Plus size={12} /> Yeni
          </button>
        </div>
        <div className="space-y-3">
          {data.stats.map((s, i) => (
            <div key={i} className={subBlock}>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div>
                  <label className={labelClass}>Değer</label>
                  <input
                    value={s.value}
                    onChange={(e) => {
                      const arr = [...data.stats];
                      arr[i] = { ...arr[i], value: e.target.value };
                      setField('stats', arr);
                    }}
                    className={inputClass}
                    placeholder="£100M+"
                  />
                </div>
                <div>
                  <label className={labelClass}>Etiket (TR)</label>
                  <input
                    value={s.labelTr}
                    onChange={(e) => {
                      const arr = [...data.stats];
                      arr[i] = { ...arr[i], labelTr: e.target.value };
                      setField('stats', arr);
                    }}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className={labelClass}>Label (EN)</label>
                  <input
                    value={s.labelEn}
                    onChange={(e) => {
                      const arr = [...data.stats];
                      arr[i] = { ...arr[i], labelEn: e.target.value };
                      setField('stats', arr);
                    }}
                    className={inputClass}
                  />
                </div>
              </div>
              <button
                onClick={() => setField('stats', data.stats.filter((_, j) => j !== i))}
                className="text-xs text-red-400/70 hover:text-red-400 flex items-center gap-1"
              >
                <Trash2 size={12} /> Sil
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* SERVICES */}
      <div className={sectionCard}>
        <h2 className={sectionTitle}>Hizmetler Bölümü</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>Etiket (TR)</label>
            <input value={data.services.taglineTr} onChange={(e) => setField('services', { ...data.services, taglineTr: e.target.value })} className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Tagline (EN)</label>
            <input value={data.services.taglineEn} onChange={(e) => setField('services', { ...data.services, taglineEn: e.target.value })} className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Başlık (TR)</label>
            <input value={data.services.titleTr} onChange={(e) => setField('services', { ...data.services, titleTr: e.target.value })} className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Title (EN)</label>
            <input value={data.services.titleEn} onChange={(e) => setField('services', { ...data.services, titleEn: e.target.value })} className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Vurgulu kısım (TR)</label>
            <input value={data.services.titleHighlightTr} onChange={(e) => setField('services', { ...data.services, titleHighlightTr: e.target.value })} className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Highlight (EN)</label>
            <input value={data.services.titleHighlightEn} onChange={(e) => setField('services', { ...data.services, titleHighlightEn: e.target.value })} className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Alt metin (TR)</label>
            <textarea value={data.services.subtitleTr} onChange={(e) => setField('services', { ...data.services, subtitleTr: e.target.value })} className={textareaClass} rows={2} />
          </div>
          <div>
            <label className={labelClass}>Subtitle (EN)</label>
            <textarea value={data.services.subtitleEn} onChange={(e) => setField('services', { ...data.services, subtitleEn: e.target.value })} className={textareaClass} rows={2} />
          </div>
        </div>
        <div className="space-y-3 pt-2">
          <p className="text-xs text-white/40 uppercase tracking-wider">Hizmet Kartları</p>
          {data.services.items.map((item, i) => (
            <div key={i} className={subBlock}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className={labelClass}>Başlık (TR)</label>
                  <input
                    value={item.titleTr}
                    onChange={(e) => {
                      const arr = [...data.services.items];
                      arr[i] = { ...arr[i], titleTr: e.target.value };
                      setField('services', { ...data.services, items: arr });
                    }}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className={labelClass}>Title (EN)</label>
                  <input
                    value={item.titleEn}
                    onChange={(e) => {
                      const arr = [...data.services.items];
                      arr[i] = { ...arr[i], titleEn: e.target.value };
                      setField('services', { ...data.services, items: arr });
                    }}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className={labelClass}>Açıklama (TR)</label>
                  <textarea
                    value={item.descTr}
                    onChange={(e) => {
                      const arr = [...data.services.items];
                      arr[i] = { ...arr[i], descTr: e.target.value };
                      setField('services', { ...data.services, items: arr });
                    }}
                    className={textareaClass}
                    rows={2}
                  />
                </div>
                <div>
                  <label className={labelClass}>Description (EN)</label>
                  <textarea
                    value={item.descEn}
                    onChange={(e) => {
                      const arr = [...data.services.items];
                      arr[i] = { ...arr[i], descEn: e.target.value };
                      setField('services', { ...data.services, items: arr });
                    }}
                    className={textareaClass}
                    rows={2}
                  />
                </div>
                <div>
                  <label className={labelClass}>Link metni (TR)</label>
                  <input
                    value={item.ctaTr}
                    onChange={(e) => {
                      const arr = [...data.services.items];
                      arr[i] = { ...arr[i], ctaTr: e.target.value };
                      setField('services', { ...data.services, items: arr });
                    }}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className={labelClass}>CTA (EN)</label>
                  <input
                    value={item.ctaEn}
                    onChange={(e) => {
                      const arr = [...data.services.items];
                      arr[i] = { ...arr[i], ctaEn: e.target.value };
                      setField('services', { ...data.services, items: arr });
                    }}
                    className={inputClass}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* TESTIMONIALS */}
      <div className={sectionCard}>
        <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4">
          <h2 className="text-sm font-semibold text-white">Müşteri Görüşleri</h2>
          <button
            onClick={() =>
              setField('testimonials', [
                ...data.testimonials,
                { quoteEn: '', quoteTr: '', name: '', role: '', image: '' },
              ])
            }
            className="flex items-center gap-1.5 px-3 py-1.5 bg-white/5 hover:bg-white/10 text-xs text-white/70 rounded-md transition-all"
          >
            <Plus size={12} /> Yeni
          </button>
        </div>
        <div className="space-y-3">
          {data.testimonials.map((t, i) => (
            <div key={i} className={subBlock}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className={labelClass}>Alıntı (TR)</label>
                  <textarea
                    value={t.quoteTr}
                    onChange={(e) => {
                      const arr = [...data.testimonials];
                      arr[i] = { ...arr[i], quoteTr: e.target.value };
                      setField('testimonials', arr);
                    }}
                    className={textareaClass}
                    rows={3}
                  />
                </div>
                <div>
                  <label className={labelClass}>Quote (EN)</label>
                  <textarea
                    value={t.quoteEn}
                    onChange={(e) => {
                      const arr = [...data.testimonials];
                      arr[i] = { ...arr[i], quoteEn: e.target.value };
                      setField('testimonials', arr);
                    }}
                    className={textareaClass}
                    rows={3}
                  />
                </div>
                <div>
                  <label className={labelClass}>İsim</label>
                  <input
                    value={t.name}
                    onChange={(e) => {
                      const arr = [...data.testimonials];
                      arr[i] = { ...arr[i], name: e.target.value };
                      setField('testimonials', arr);
                    }}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className={labelClass}>Unvan</label>
                  <input
                    value={t.role}
                    onChange={(e) => {
                      const arr = [...data.testimonials];
                      arr[i] = { ...arr[i], role: e.target.value };
                      setField('testimonials', arr);
                    }}
                    className={inputClass}
                  />
                </div>
                <div className="md:col-span-2">
                  <label className={labelClass}>Fotoğraf URL</label>
                  <input
                    value={t.image}
                    onChange={(e) => {
                      const arr = [...data.testimonials];
                      arr[i] = { ...arr[i], image: e.target.value };
                      setField('testimonials', arr);
                    }}
                    className={inputClass}
                    placeholder="https://..."
                  />
                </div>
              </div>
              <button
                onClick={() => setField('testimonials', data.testimonials.filter((_, j) => j !== i))}
                className="text-xs text-red-400/70 hover:text-red-400 flex items-center gap-1"
              >
                <Trash2 size={12} /> Sil
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className={sectionCard}>
        <h2 className={sectionTitle}>Alt CTA Bölümü</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>Başlık (TR)</label>
            <input value={data.cta.titleTr} onChange={(e) => setField('cta', { ...data.cta, titleTr: e.target.value })} className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Title (EN)</label>
            <input value={data.cta.titleEn} onChange={(e) => setField('cta', { ...data.cta, titleEn: e.target.value })} className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Vurgulu kısım (TR)</label>
            <input value={data.cta.titleHighlightTr} onChange={(e) => setField('cta', { ...data.cta, titleHighlightTr: e.target.value })} className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Highlight (EN)</label>
            <input value={data.cta.titleHighlightEn} onChange={(e) => setField('cta', { ...data.cta, titleHighlightEn: e.target.value })} className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Alt metin (TR)</label>
            <textarea value={data.cta.subtitleTr} onChange={(e) => setField('cta', { ...data.cta, subtitleTr: e.target.value })} className={textareaClass} rows={2} />
          </div>
          <div>
            <label className={labelClass}>Subtitle (EN)</label>
            <textarea value={data.cta.subtitleEn} onChange={(e) => setField('cta', { ...data.cta, subtitleEn: e.target.value })} className={textareaClass} rows={2} />
          </div>
          <div>
            <label className={labelClass}>Buton metni (TR)</label>
            <input value={data.cta.buttonTr} onChange={(e) => setField('cta', { ...data.cta, buttonTr: e.target.value })} className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Button (EN)</label>
            <input value={data.cta.buttonEn} onChange={(e) => setField('cta', { ...data.cta, buttonEn: e.target.value })} className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Not satırı (TR)</label>
            <input value={data.cta.noteTr} onChange={(e) => setField('cta', { ...data.cta, noteTr: e.target.value })} className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Note (EN)</label>
            <input value={data.cta.noteEn} onChange={(e) => setField('cta', { ...data.cta, noteEn: e.target.value })} className={inputClass} />
          </div>
        </div>
      </div>

      {/* Sticky save bar */}
      <div className="flex justify-end pt-4">
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 px-6 py-3 bg-[#C1A45D] hover:bg-[#d4b87a] text-[#060e1a] text-sm font-semibold rounded-lg transition-all disabled:opacity-50"
        >
          <Save size={14} />
          {saving ? 'Kaydediliyor...' : saved ? 'Kaydedildi ✓' : 'Tüm Değişiklikleri Kaydet'}
        </button>
      </div>
    </div>
  );
}
