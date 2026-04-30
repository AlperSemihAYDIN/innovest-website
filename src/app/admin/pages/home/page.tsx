'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Save, Plus, Trash2, ExternalLink, RotateCcw } from 'lucide-react';
import { adminApi } from '@/lib/adminApi';
import { homeDefaults, type HomePageContent } from '@/lib/pageDefaults';

const inputClass =
  'w-full bg-white/[0.04] border border-white/10 rounded-lg px-3.5 py-2.5 text-sm text-white placeholder:text-white/25 focus:outline-none focus:border-[#C1A45D]/60 focus:bg-white/[0.06] transition-colors';
const textareaClass = `${inputClass} resize-y min-h-[72px] leading-relaxed`;
const labelClass = 'block uppercase font-semibold mb-1.5 text-white/45';
const labelStyle: React.CSSProperties = { fontSize: '10px', letterSpacing: '0.1em' };
const sectionCard = 'bg-[#0a1628] border border-white/[0.06] rounded-2xl';
const sectionInner = 'p-7';
const sectionTitleClass =
  'flex items-center gap-3 uppercase font-bold text-[#C1A45D] border-b border-white/[0.08] pb-2.5';
const sectionTitleStyle: React.CSSProperties = { fontSize: '13px', letterSpacing: '0.08em', marginBottom: '20px' };
const subBlock = 'border border-white/[0.06] rounded-xl p-5 bg-white/[0.015] space-y-4 relative';
const subBlockTitle = 'text-[11px] uppercase tracking-[0.12em] text-white/35 font-semibold';

function Field({ label, value, onChange, placeholder }: { label: string; value: string; onChange: (v: string) => void; placeholder?: string }) {
  return (
    <div>
      <label className={labelClass} style={labelStyle}>{label}</label>
      <input value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} className={inputClass} />
    </div>
  );
}

function FieldArea({ label, value, onChange, rows = 3 }: { label: string; value: string; onChange: (v: string) => void; rows?: number }) {
  return (
    <div>
      <label className={labelClass} style={labelStyle}>{label}</label>
      <textarea value={value} onChange={(e) => onChange(e.target.value)} rows={rows} className={textareaClass} />
    </div>
  );
}

export default function HomePageEditor() {
  const slug = 'home';
  const [data, setData] = useState<HomePageContent>(homeDefaults);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const remote = await adminApi.getPage(slug);
        setData({ ...homeDefaults, ...remote } as HomePageContent);
      } catch {}
      finally { setLoading(false); }
    })();
  }, []);

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
    } finally { setSaving(false); }
  }

  async function handleReset() {
    if (!confirm('Tüm içerikleri orijinal/varsayılan haline döndürmek istediğinden emin misin? Bu işlem geri alınamaz.')) return;
    setData(homeDefaults);
    setSaving(true);
    try {
      await adminApi.updatePage(slug, homeDefaults as unknown as Record<string, unknown>);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (err) {
      alert('Geri yükleme hatası: ' + (err instanceof Error ? err.message : 'Bilinmeyen hata'));
    } finally { setSaving(false); }
  }

  if (loading) {
    return <div className="flex justify-center py-20"><div className="w-8 h-8 border-2 border-[#C1A45D]/30 border-t-[#C1A45D] rounded-full animate-spin" /></div>;
  }

  return (
    <div>
      {/* Sticky header */}
      <div className="sticky z-30 -mx-2 px-2 py-3 bg-[#060e1a]/95 backdrop-blur-md border-b border-white/[0.06] mb-8" style={{ top: '0px' }}>
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <Link href="/admin/pages" className="w-9 h-9 rounded-lg flex items-center justify-center bg-white/5 hover:bg-white/10 text-white/60 hover:text-white transition-all flex-shrink-0" aria-label="Geri">
              <ArrowLeft size={16} />
            </Link>
            <div className="min-w-0">
              <h1 className="text-xl font-semibold text-white truncate">Ana Sayfa</h1>
              <p className="text-white/40 text-[11px] mt-0.5 truncate">Hero, istatistik, hizmet, görüş ve CTA içerikleri</p>
            </div>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <a href="/" target="_blank" rel="noopener noreferrer" className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 text-[12px] text-white/50 hover:text-white transition-colors">
              Önizle <ExternalLink size={11} />
            </a>
            <button onClick={handleReset} disabled={saving} title="Orijinal içeriklere geri dön" className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 text-[12px] text-white/50 hover:text-red-300 transition-colors disabled:opacity-50">
              <RotateCcw size={12} /> Sıfırla
            </button>
            <button onClick={handleSave} disabled={saving} className="inline-flex items-center gap-2 bg-[#C1A45D] hover:bg-[#d4b87a] text-[#060e1a] font-semibold rounded-lg transition-all disabled:opacity-50" style={{ padding: '10px 28px', fontSize: '13px' }}>
              <Save size={14} />
              {saving ? 'Kaydediliyor...' : saved ? 'Kaydedildi ✓' : 'Kaydet'}
            </button>
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
        {/* HERO */}
        <section className={sectionCard}>
          <div className={sectionInner}>
            <h2 className={sectionTitleClass} style={sectionTitleStyle}>
              <span className="w-1 h-3.5 bg-[#C1A45D] rounded-full" /> Hero (Üst Banner)
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
              <Field label="Başlık (TR)" value={data.hero.titleTr} onChange={(v) => setField('hero', { ...data.hero, titleTr: v })} />
              <Field label="Title (EN)" value={data.hero.titleEn} onChange={(v) => setField('hero', { ...data.hero, titleEn: v })} />
              <Field label="Vurgulu kısım (TR)" value={data.hero.titleHighlightTr} onChange={(v) => setField('hero', { ...data.hero, titleHighlightTr: v })} />
              <Field label="Highlight (EN)" value={data.hero.titleHighlightEn} onChange={(v) => setField('hero', { ...data.hero, titleHighlightEn: v })} />
              <FieldArea label="Alt metin (TR)" value={data.hero.subtitleTr} onChange={(v) => setField('hero', { ...data.hero, subtitleTr: v })} rows={4} />
              <FieldArea label="Subtitle (EN)" value={data.hero.subtitleEn} onChange={(v) => setField('hero', { ...data.hero, subtitleEn: v })} rows={4} />
              <Field label="Birincil Buton (TR)" value={data.hero.ctaTr} onChange={(v) => setField('hero', { ...data.hero, ctaTr: v })} />
              <Field label="Primary Button (EN)" value={data.hero.ctaEn} onChange={(v) => setField('hero', { ...data.hero, ctaEn: v })} />
              <Field label="İkincil Buton (TR)" value={data.hero.ctaSecondaryTr} onChange={(v) => setField('hero', { ...data.hero, ctaSecondaryTr: v })} />
              <Field label="Secondary Button (EN)" value={data.hero.ctaSecondaryEn} onChange={(v) => setField('hero', { ...data.hero, ctaSecondaryEn: v })} />
            </div>
          </div>
        </section>

        {/* STATS */}
        <section className={sectionCard}>
          <div className={sectionInner}>
            <div className="flex items-center justify-between border-b border-white/[0.08] pb-2.5" style={{ marginBottom: '20px' }}>
              <h2 className="flex items-center gap-3 uppercase font-bold text-[#C1A45D]" style={{ fontSize: '13px', letterSpacing: '0.08em' }}>
                <span className="w-1 h-3.5 bg-[#C1A45D] rounded-full" /> İstatistikler
              </h2>
              <button onClick={() => setField('stats', [...data.stats, { value: '', labelEn: '', labelTr: '' }])} className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/[0.04] hover:bg-white/[0.08] text-[11px] text-white/70 rounded-md transition-all uppercase tracking-wider font-medium">
                <Plus size={11} /> Yeni
              </button>
            </div>
            <div className="space-y-3">
              {data.stats.map((s, i) => (
                <div key={i} className={subBlock}>
                  <div className="flex items-center justify-between">
                    <span className={subBlockTitle}>İstatistik #{i + 1}</span>
                    <button onClick={() => setField('stats', data.stats.filter((_, j) => j !== i))} className="opacity-60 hover:opacity-100 text-red-400/80 hover:text-red-400 transition-opacity" aria-label="Sil" title="Sil">
                      <Trash2 size={14} />
                    </button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-4">
                    <Field label="Değer" value={s.value} placeholder="£100M+" onChange={(v) => { const arr = [...data.stats]; arr[i] = { ...arr[i], value: v }; setField('stats', arr); }} />
                    <Field label="Etiket (TR)" value={s.labelTr} onChange={(v) => { const arr = [...data.stats]; arr[i] = { ...arr[i], labelTr: v }; setField('stats', arr); }} />
                    <Field label="Label (EN)" value={s.labelEn} onChange={(v) => { const arr = [...data.stats]; arr[i] = { ...arr[i], labelEn: v }; setField('stats', arr); }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SERVICES */}
        <section className={sectionCard}>
          <div className={sectionInner}>
            <h2 className={sectionTitleClass} style={sectionTitleStyle}>
              <span className="w-1 h-3.5 bg-[#C1A45D] rounded-full" /> Hizmetler Bölümü
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
              <Field label="Etiket (TR)" value={data.services.taglineTr} onChange={(v) => setField('services', { ...data.services, taglineTr: v })} />
              <Field label="Tagline (EN)" value={data.services.taglineEn} onChange={(v) => setField('services', { ...data.services, taglineEn: v })} />
              <Field label="Başlık (TR)" value={data.services.titleTr} onChange={(v) => setField('services', { ...data.services, titleTr: v })} />
              <Field label="Title (EN)" value={data.services.titleEn} onChange={(v) => setField('services', { ...data.services, titleEn: v })} />
              <Field label="Vurgulu kısım (TR)" value={data.services.titleHighlightTr} onChange={(v) => setField('services', { ...data.services, titleHighlightTr: v })} />
              <Field label="Highlight (EN)" value={data.services.titleHighlightEn} onChange={(v) => setField('services', { ...data.services, titleHighlightEn: v })} />
              <FieldArea label="Alt metin (TR)" value={data.services.subtitleTr} onChange={(v) => setField('services', { ...data.services, subtitleTr: v })} rows={2} />
              <FieldArea label="Subtitle (EN)" value={data.services.subtitleEn} onChange={(v) => setField('services', { ...data.services, subtitleEn: v })} rows={2} />
            </div>
            <div className="mt-7 pt-5 border-t border-white/[0.06] space-y-3">
              <p className={subBlockTitle}>Hizmet Kartları</p>
              {data.services.items.map((item, i) => (
                <div key={i} className={subBlock}>
                  <span className={subBlockTitle}>Hizmet #{i + 1}</span>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                    <Field label="Başlık (TR)" value={item.titleTr} onChange={(v) => { const arr = [...data.services.items]; arr[i] = { ...arr[i], titleTr: v }; setField('services', { ...data.services, items: arr }); }} />
                    <Field label="Title (EN)" value={item.titleEn} onChange={(v) => { const arr = [...data.services.items]; arr[i] = { ...arr[i], titleEn: v }; setField('services', { ...data.services, items: arr }); }} />
                    <FieldArea label="Açıklama (TR)" value={item.descTr} rows={3} onChange={(v) => { const arr = [...data.services.items]; arr[i] = { ...arr[i], descTr: v }; setField('services', { ...data.services, items: arr }); }} />
                    <FieldArea label="Description (EN)" value={item.descEn} rows={3} onChange={(v) => { const arr = [...data.services.items]; arr[i] = { ...arr[i], descEn: v }; setField('services', { ...data.services, items: arr }); }} />
                    <Field label="Link metni (TR)" value={item.ctaTr} onChange={(v) => { const arr = [...data.services.items]; arr[i] = { ...arr[i], ctaTr: v }; setField('services', { ...data.services, items: arr }); }} />
                    <Field label="CTA (EN)" value={item.ctaEn} onChange={(v) => { const arr = [...data.services.items]; arr[i] = { ...arr[i], ctaEn: v }; setField('services', { ...data.services, items: arr }); }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* TESTIMONIALS */}
        <section className={sectionCard}>
          <div className={sectionInner}>
            <div className="flex items-center justify-between border-b border-white/[0.08] pb-2.5" style={{ marginBottom: '20px' }}>
              <h2 className="flex items-center gap-3 uppercase font-bold text-[#C1A45D]" style={{ fontSize: '13px', letterSpacing: '0.08em' }}>
                <span className="w-1 h-3.5 bg-[#C1A45D] rounded-full" /> Müşteri Görüşleri
              </h2>
              <button onClick={() => setField('testimonials', [...data.testimonials, { quoteEn: '', quoteTr: '', name: '', role: '', image: '' }])} className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/[0.04] hover:bg-white/[0.08] text-[11px] text-white/70 rounded-md transition-all uppercase tracking-wider font-medium">
                <Plus size={11} /> Yeni
              </button>
            </div>
            <div className="space-y-3">
              {data.testimonials.map((t, i) => (
                <div key={i} className={subBlock}>
                  <div className="flex items-center justify-between">
                    <span className={subBlockTitle}>Görüş #{i + 1}</span>
                    <button onClick={() => setField('testimonials', data.testimonials.filter((_, j) => j !== i))} className="opacity-60 hover:opacity-100 text-red-400/80 hover:text-red-400 transition-opacity" aria-label="Sil" title="Sil">
                      <Trash2 size={14} />
                    </button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                    <FieldArea label="Alıntı (TR)" value={t.quoteTr} rows={4} onChange={(v) => { const arr = [...data.testimonials]; arr[i] = { ...arr[i], quoteTr: v }; setField('testimonials', arr); }} />
                    <FieldArea label="Quote (EN)" value={t.quoteEn} rows={4} onChange={(v) => { const arr = [...data.testimonials]; arr[i] = { ...arr[i], quoteEn: v }; setField('testimonials', arr); }} />
                    <Field label="İsim" value={t.name} onChange={(v) => { const arr = [...data.testimonials]; arr[i] = { ...arr[i], name: v }; setField('testimonials', arr); }} />
                    <Field label="Unvan" value={t.role} onChange={(v) => { const arr = [...data.testimonials]; arr[i] = { ...arr[i], role: v }; setField('testimonials', arr); }} />
                    <div className="md:col-span-2">
                      <Field label="Fotoğraf URL" value={t.image} placeholder="https://..." onChange={(v) => { const arr = [...data.testimonials]; arr[i] = { ...arr[i], image: v }; setField('testimonials', arr); }} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className={sectionCard}>
          <div className={sectionInner}>
            <h2 className={sectionTitleClass} style={sectionTitleStyle}>
              <span className="w-1 h-3.5 bg-[#C1A45D] rounded-full" /> Alt CTA Bölümü
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
              <Field label="Başlık (TR)" value={data.cta.titleTr} onChange={(v) => setField('cta', { ...data.cta, titleTr: v })} />
              <Field label="Title (EN)" value={data.cta.titleEn} onChange={(v) => setField('cta', { ...data.cta, titleEn: v })} />
              <Field label="Vurgulu kısım (TR)" value={data.cta.titleHighlightTr} onChange={(v) => setField('cta', { ...data.cta, titleHighlightTr: v })} />
              <Field label="Highlight (EN)" value={data.cta.titleHighlightEn} onChange={(v) => setField('cta', { ...data.cta, titleHighlightEn: v })} />
              <FieldArea label="Alt metin (TR)" value={data.cta.subtitleTr} onChange={(v) => setField('cta', { ...data.cta, subtitleTr: v })} rows={3} />
              <FieldArea label="Subtitle (EN)" value={data.cta.subtitleEn} onChange={(v) => setField('cta', { ...data.cta, subtitleEn: v })} rows={3} />
              <Field label="Buton metni (TR)" value={data.cta.buttonTr} onChange={(v) => setField('cta', { ...data.cta, buttonTr: v })} />
              <Field label="Button (EN)" value={data.cta.buttonEn} onChange={(v) => setField('cta', { ...data.cta, buttonEn: v })} />
              <Field label="Not satırı (TR)" value={data.cta.noteTr} onChange={(v) => setField('cta', { ...data.cta, noteTr: v })} />
              <Field label="Note (EN)" value={data.cta.noteEn} onChange={(v) => setField('cta', { ...data.cta, noteEn: v })} />
            </div>
          </div>
        </section>

        <div className="flex items-center justify-between gap-4 pt-2 pb-4">
          <button onClick={handleReset} disabled={saving} className="inline-flex items-center gap-2 px-4 py-2.5 text-[12px] text-white/50 hover:text-red-300 transition-colors disabled:opacity-50">
            <RotateCcw size={13} /> Tüm içerikleri sıfırla
          </button>
          <button onClick={handleSave} disabled={saving} className="inline-flex items-center gap-2 bg-[#C1A45D] hover:bg-[#d4b87a] text-[#060e1a] font-semibold rounded-lg transition-all disabled:opacity-50" style={{ padding: '12px 32px', fontSize: '13px' }}>
            <Save size={14} />
            {saving ? 'Kaydediliyor...' : saved ? 'Kaydedildi ✓' : 'Tüm Değişiklikleri Kaydet'}
          </button>
        </div>
      </div>
    </div>
  );
}
