'use client';

import { useEffect, useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { adminApi } from '@/lib/adminApi';
import { businessDefaults, type BusinessPageContent } from '@/lib/pageDefaults';
import {
  Field, FieldArea, SectionTitle, StickyEditorHeader, EditorFooter, LoadingSpinner,
  sectionCard, sectionInner, subBlock, subBlockTitle,
} from '@/components/admin/PageEditorPrimitives';

export default function BusinessPageEditor() {
  const slug = 'business-expansion';
  const [data, setData] = useState<BusinessPageContent>(businessDefaults);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    (async () => { try { const r = await adminApi.getPage(slug); setData({ ...businessDefaults, ...(r as object) } as BusinessPageContent); } catch {} finally { setLoading(false); } })();
  }, []);

  function setField<K extends keyof BusinessPageContent>(s: K, v: BusinessPageContent[K]) { setData((p) => ({ ...p, [s]: v })); setSaved(false); }
  async function handleSave() {
    setSaving(true);
    try { await adminApi.updatePage(slug, data as unknown as Record<string, unknown>); setSaved(true); setTimeout(() => setSaved(false), 3000); }
    catch (e) { alert('Hata: ' + (e instanceof Error ? e.message : '')); } finally { setSaving(false); }
  }
  async function handleReset() {
    if (!confirm('Tüm içerikleri varsayılana döndürmek istediğine emin misin?')) return;
    setData(businessDefaults); setSaving(true);
    try { await adminApi.updatePage(slug, businessDefaults as unknown as Record<string, unknown>); setSaved(true); setTimeout(() => setSaved(false), 3000); }
    catch (e) { alert('Hata: ' + (e instanceof Error ? e.message : '')); } finally { setSaving(false); }
  }
  if (loading) return <LoadingSpinner />;

  return (
    <div>
      <StickyEditorHeader title="İş Geliştirme" description="Hero, hizmet kartları, kapsanan pazarlar, alt CTA" previewHref="/business-expansion" saving={saving} saved={saved} onSave={handleSave} onReset={handleReset} />
      <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
        <section className={sectionCard}>
          <div className={sectionInner}>
            <SectionTitle>Hero (Üst Banner)</SectionTitle>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
              <Field label="Başlık (TR)" value={data.hero.titleTr} onChange={(v) => setField('hero', { ...data.hero, titleTr: v })} />
              <Field label="Title (EN)" value={data.hero.titleEn} onChange={(v) => setField('hero', { ...data.hero, titleEn: v })} />
              <Field label="Vurgulu (TR)" value={data.hero.titleHighlightTr} onChange={(v) => setField('hero', { ...data.hero, titleHighlightTr: v })} />
              <Field label="Highlight (EN)" value={data.hero.titleHighlightEn} onChange={(v) => setField('hero', { ...data.hero, titleHighlightEn: v })} />
              <FieldArea label="Alt metin (TR)" rows={3} value={data.hero.subtitleTr} onChange={(v) => setField('hero', { ...data.hero, subtitleTr: v })} />
              <FieldArea label="Subtitle (EN)" rows={3} value={data.hero.subtitleEn} onChange={(v) => setField('hero', { ...data.hero, subtitleEn: v })} />
            </div>
          </div>
        </section>

        <section className={sectionCard}>
          <div className={sectionInner}>
            <div className="flex items-center justify-between border-b border-white/[0.08] pb-2.5" style={{ marginBottom: '20px' }}>
              <h2 className="flex items-center gap-3 uppercase font-bold text-[#C9A84C]" style={{ fontSize: '13px', letterSpacing: '0.08em' }}>
                <span className="w-1 h-3.5 bg-[#C9A84C] rounded-full" /> Hizmet Kartları
              </h2>
              <button onClick={() => setField('services', [...data.services, { titleEn: '', titleTr: '', descEn: '', descTr: '', icon: 'Briefcase' }])} className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/[0.04] hover:bg-white/[0.08] text-[11px] text-white/70 rounded-md uppercase tracking-wider"><Plus size={11} /> Yeni</button>
            </div>
            <div className="space-y-3">
              {data.services.map((s, i) => (
                <div key={i} className={subBlock}>
                  <div className="flex items-center justify-between">
                    <span className={subBlockTitle}>Hizmet #{i + 1}</span>
                    <button onClick={() => setField('services', data.services.filter((_, j) => j !== i))} className="opacity-60 hover:opacity-100 text-red-400/80 hover:text-red-400"><Trash2 size={14} /></button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                    <Field label="Başlık (TR)" value={s.titleTr} onChange={(v) => { const a = [...data.services]; a[i] = { ...a[i], titleTr: v }; setField('services', a); }} />
                    <Field label="Title (EN)" value={s.titleEn} onChange={(v) => { const a = [...data.services]; a[i] = { ...a[i], titleEn: v }; setField('services', a); }} />
                    <FieldArea label="Açıklama (TR)" rows={3} value={s.descTr} onChange={(v) => { const a = [...data.services]; a[i] = { ...a[i], descTr: v }; setField('services', a); }} />
                    <FieldArea label="Description (EN)" rows={3} value={s.descEn} onChange={(v) => { const a = [...data.services]; a[i] = { ...a[i], descEn: v }; setField('services', a); }} />
                    <Field label="İkon (lucide)" placeholder="Globe" value={s.icon} onChange={(v) => { const a = [...data.services]; a[i] = { ...a[i], icon: v }; setField('services', a); }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className={sectionCard}>
          <div className={sectionInner}>
            <div className="flex items-center justify-between border-b border-white/[0.08] pb-2.5" style={{ marginBottom: '20px' }}>
              <h2 className="flex items-center gap-3 uppercase font-bold text-[#C9A84C]" style={{ fontSize: '13px', letterSpacing: '0.08em' }}>
                <span className="w-1 h-3.5 bg-[#C9A84C] rounded-full" /> Pazarlar
              </h2>
              <button onClick={() => setField('markets', { ...data.markets, items: [...data.markets.items, { name: '', flag: '🌍' }] })} className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/[0.04] hover:bg-white/[0.08] text-[11px] text-white/70 rounded-md uppercase tracking-wider"><Plus size={11} /> Yeni</button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5 mb-6">
              <Field label="Etiket (TR)" value={data.markets.taglineTr} onChange={(v) => setField('markets', { ...data.markets, taglineTr: v })} />
              <Field label="Tagline (EN)" value={data.markets.taglineEn} onChange={(v) => setField('markets', { ...data.markets, taglineEn: v })} />
              <Field label="Başlık (TR)" value={data.markets.titleTr} onChange={(v) => setField('markets', { ...data.markets, titleTr: v })} />
              <Field label="Title (EN)" value={data.markets.titleEn} onChange={(v) => setField('markets', { ...data.markets, titleEn: v })} />
              <Field label="Vurgulu (TR)" value={data.markets.titleHighlightTr} onChange={(v) => setField('markets', { ...data.markets, titleHighlightTr: v })} />
              <Field label="Highlight (EN)" value={data.markets.titleHighlightEn} onChange={(v) => setField('markets', { ...data.markets, titleHighlightEn: v })} />
            </div>
            <div className="pt-5 border-t border-white/[0.06] space-y-2">
              <p className={subBlockTitle}>Pazar Listesi</p>
              {data.markets.items.map((it, i) => (
                <div key={i} className="grid grid-cols-1 md:grid-cols-3 gap-3 items-end">
                  <Field label={`Ad #${i + 1}`} value={it.name} onChange={(v) => { const arr = [...data.markets.items]; arr[i] = { ...arr[i], name: v }; setField('markets', { ...data.markets, items: arr }); }} />
                  <Field label="Bayrak (emoji)" value={it.flag} onChange={(v) => { const arr = [...data.markets.items]; arr[i] = { ...arr[i], flag: v }; setField('markets', { ...data.markets, items: arr }); }} />
                  <button onClick={() => setField('markets', { ...data.markets, items: data.markets.items.filter((_, j) => j !== i) })} className="text-red-400/70 hover:text-red-400 text-[11px] py-2.5 inline-flex items-center gap-1"><Trash2 size={12} /> Sil</button>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className={sectionCard}>
          <div className={sectionInner}>
            <SectionTitle>Alt CTA</SectionTitle>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
              <Field label="Başlık (TR)" value={data.cta.titleTr} onChange={(v) => setField('cta', { ...data.cta, titleTr: v })} />
              <Field label="Title (EN)" value={data.cta.titleEn} onChange={(v) => setField('cta', { ...data.cta, titleEn: v })} />
              <Field label="Vurgulu (TR)" value={data.cta.titleHighlightTr} onChange={(v) => setField('cta', { ...data.cta, titleHighlightTr: v })} />
              <Field label="Highlight (EN)" value={data.cta.titleHighlightEn} onChange={(v) => setField('cta', { ...data.cta, titleHighlightEn: v })} />
              <FieldArea label="Alt metin (TR)" rows={3} value={data.cta.subtitleTr} onChange={(v) => setField('cta', { ...data.cta, subtitleTr: v })} />
              <FieldArea label="Subtitle (EN)" rows={3} value={data.cta.subtitleEn} onChange={(v) => setField('cta', { ...data.cta, subtitleEn: v })} />
            </div>
          </div>
        </section>

        <EditorFooter saving={saving} saved={saved} onSave={handleSave} onReset={handleReset} />
      </div>
    </div>
  );
}
