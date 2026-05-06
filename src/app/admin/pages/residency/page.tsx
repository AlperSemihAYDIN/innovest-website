'use client';

import { useEffect, useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { adminApi } from '@/lib/adminApi';
import { residencyDefaults, type ResidencyPageContent } from '@/lib/pageDefaults';
import {
  Field, FieldArea, SectionTitle, StickyEditorHeader, EditorFooter, LoadingSpinner,
  sectionCard, sectionInner, subBlock, subBlockTitle, inputClass, labelClass, labelStyle,
} from '@/components/admin/PageEditorPrimitives';

function StringList({ label, items, onChange }: { label: string; items: string[]; onChange: (v: string[]) => void }) {
  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <label className={labelClass} style={labelStyle}>{label}</label>
        <button onClick={() => onChange([...items, ''])} className="text-[10px] uppercase tracking-wider text-white/50 hover:text-white inline-flex items-center gap-1"><Plus size={10} /> Ekle</button>
      </div>
      <div className="space-y-2">
        {items.map((it, i) => (
          <div key={i} className="flex gap-2">
            <input value={it} onChange={(e) => { const a = [...items]; a[i] = e.target.value; onChange(a); }} className={inputClass} />
            <button onClick={() => onChange(items.filter((_, j) => j !== i))} className="text-red-400/70 hover:text-red-400 px-2"><Trash2 size={14} /></button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function ResidencyPageEditor() {
  const slug = 'residency';
  const [data, setData] = useState<ResidencyPageContent>(residencyDefaults);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    (async () => { try { const r = await adminApi.getPage(slug); setData({ ...residencyDefaults, ...(r as object) } as ResidencyPageContent); } catch {} finally { setLoading(false); } })();
  }, []);

  function setField<K extends keyof ResidencyPageContent>(s: K, v: ResidencyPageContent[K]) { setData((p) => ({ ...p, [s]: v })); setSaved(false); }
  async function handleSave() {
    setSaving(true);
    try { await adminApi.updatePage(slug, data as unknown as Record<string, unknown>); setSaved(true); setTimeout(() => setSaved(false), 3000); }
    catch (e) { alert('Hata: ' + (e instanceof Error ? e.message : '')); } finally { setSaving(false); }
  }
  async function handleReset() {
    if (!confirm('Tüm içerikleri varsayılana döndürmek istediğine emin misin?')) return;
    setData(residencyDefaults); setSaving(true);
    try { await adminApi.updatePage(slug, residencyDefaults as unknown as Record<string, unknown>); setSaved(true); setTimeout(() => setSaved(false), 3000); }
    catch (e) { alert('Hata: ' + (e instanceof Error ? e.message : '')); } finally { setSaving(false); }
  }
  if (loading) return <LoadingSpinner />;

  return (
    <div>
      <StickyEditorHeader title="Yatırım ile Oturum" description="Hero, ülke programları, süreç adımları, alt CTA" previewHref="/residency" saving={saving} saved={saved} onSave={handleSave} onReset={handleReset} />
      <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
        <section className={sectionCard}>
          <div className={sectionInner}>
            <SectionTitle>Hero (Üst Banner)</SectionTitle>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
              <Field label="Başlık (TR)" value={data.hero.titleTr} onChange={(v) => setField('hero', { ...data.hero, titleTr: v })} />
              <Field label="Title (EN)" value={data.hero.titleEn} onChange={(v) => setField('hero', { ...data.hero, titleEn: v })} />
              <Field label="Vurgulu (TR)" value={data.hero.titleHighlightTr} onChange={(v) => setField('hero', { ...data.hero, titleHighlightTr: v })} />
              <Field label="Highlight (EN)" value={data.hero.titleHighlightEn} onChange={(v) => setField('hero', { ...data.hero, titleHighlightEn: v })} />
              <FieldArea label="Alt metin (TR)" rows={4} value={data.hero.subtitleTr} onChange={(v) => setField('hero', { ...data.hero, subtitleTr: v })} />
              <FieldArea label="Subtitle (EN)" rows={4} value={data.hero.subtitleEn} onChange={(v) => setField('hero', { ...data.hero, subtitleEn: v })} />
            </div>
          </div>
        </section>

        <section className={sectionCard}>
          <div className={sectionInner}>
            <div className="flex items-center justify-between border-b border-white/[0.08] pb-2.5" style={{ marginBottom: '20px' }}>
              <h2 className="flex items-center gap-3 uppercase font-bold text-[#C9A84C]" style={{ fontSize: '13px', letterSpacing: '0.08em' }}>
                <span className="w-1 h-3.5 bg-[#C9A84C] rounded-full" /> Ülke Programları
              </h2>
              <button onClick={() => setField('programmes', [...data.programmes, { country: '', titleEn: '', titleTr: '', investmentEn: '', investmentTr: '', timelineEn: '', timelineTr: '', benefitsEn: [], benefitsTr: [] }])} className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/[0.04] hover:bg-white/[0.08] text-[11px] text-white/70 rounded-md uppercase tracking-wider font-medium"><Plus size={11} /> Yeni</button>
            </div>
            <div className="space-y-3">
              {data.programmes.map((p, i) => (
                <div key={i} className={subBlock}>
                  <div className="flex items-center justify-between">
                    <span className={subBlockTitle}>Program #{i + 1} — {p.country}</span>
                    <button onClick={() => setField('programmes', data.programmes.filter((_, j) => j !== i))} className="opacity-60 hover:opacity-100 text-red-400/80 hover:text-red-400"><Trash2 size={14} /></button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                    <Field label="Ülke kodu/adı" value={p.country} onChange={(v) => { const a = [...data.programmes]; a[i] = { ...a[i], country: v }; setField('programmes', a); }} />
                    <div />
                    <Field label="Başlık (TR)" value={p.titleTr} onChange={(v) => { const a = [...data.programmes]; a[i] = { ...a[i], titleTr: v }; setField('programmes', a); }} />
                    <Field label="Title (EN)" value={p.titleEn} onChange={(v) => { const a = [...data.programmes]; a[i] = { ...a[i], titleEn: v }; setField('programmes', a); }} />
                    <Field label="Yatırım (TR)" value={p.investmentTr} onChange={(v) => { const a = [...data.programmes]; a[i] = { ...a[i], investmentTr: v }; setField('programmes', a); }} />
                    <Field label="Investment (EN)" value={p.investmentEn} onChange={(v) => { const a = [...data.programmes]; a[i] = { ...a[i], investmentEn: v }; setField('programmes', a); }} />
                    <Field label="Süre (TR)" value={p.timelineTr} onChange={(v) => { const a = [...data.programmes]; a[i] = { ...a[i], timelineTr: v }; setField('programmes', a); }} />
                    <Field label="Timeline (EN)" value={p.timelineEn} onChange={(v) => { const a = [...data.programmes]; a[i] = { ...a[i], timelineEn: v }; setField('programmes', a); }} />
                    <StringList label="Avantajlar (TR)" items={p.benefitsTr} onChange={(arr) => { const a = [...data.programmes]; a[i] = { ...a[i], benefitsTr: arr }; setField('programmes', a); }} />
                    <StringList label="Benefits (EN)" items={p.benefitsEn} onChange={(arr) => { const a = [...data.programmes]; a[i] = { ...a[i], benefitsEn: arr }; setField('programmes', a); }} />
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
                <span className="w-1 h-3.5 bg-[#C9A84C] rounded-full" /> Süreç
              </h2>
              <button onClick={() => setField('process', { ...data.process, steps: [...data.process.steps, { num: '', titleEn: '', titleTr: '', descEn: '', descTr: '' }] })} className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/[0.04] hover:bg-white/[0.08] text-[11px] text-white/70 rounded-md uppercase tracking-wider"><Plus size={11} /> Yeni adım</button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5 mb-6">
              <Field label="Etiket (TR)" value={data.process.taglineTr} onChange={(v) => setField('process', { ...data.process, taglineTr: v })} />
              <Field label="Tagline (EN)" value={data.process.taglineEn} onChange={(v) => setField('process', { ...data.process, taglineEn: v })} />
              <Field label="Başlık (TR)" value={data.process.titleTr} onChange={(v) => setField('process', { ...data.process, titleTr: v })} />
              <Field label="Title (EN)" value={data.process.titleEn} onChange={(v) => setField('process', { ...data.process, titleEn: v })} />
              <Field label="Vurgulu (TR)" value={data.process.titleHighlightTr} onChange={(v) => setField('process', { ...data.process, titleHighlightTr: v })} />
              <Field label="Highlight (EN)" value={data.process.titleHighlightEn} onChange={(v) => setField('process', { ...data.process, titleHighlightEn: v })} />
            </div>
            <div className="pt-5 border-t border-white/[0.06] space-y-3">
              <p className={subBlockTitle}>Adımlar</p>
              {data.process.steps.map((s, i) => (
                <div key={i} className={subBlock}>
                  <div className="flex items-center justify-between">
                    <span className={subBlockTitle}>Adım {s.num || `#${i + 1}`}</span>
                    <button onClick={() => setField('process', { ...data.process, steps: data.process.steps.filter((_, j) => j !== i) })} className="opacity-60 hover:opacity-100 text-red-400/80 hover:text-red-400"><Trash2 size={14} /></button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                    <Field label="Numara" placeholder="01" value={s.num} onChange={(v) => { const arr = [...data.process.steps]; arr[i] = { ...arr[i], num: v }; setField('process', { ...data.process, steps: arr }); }} />
                    <div />
                    <Field label="Başlık (TR)" value={s.titleTr} onChange={(v) => { const arr = [...data.process.steps]; arr[i] = { ...arr[i], titleTr: v }; setField('process', { ...data.process, steps: arr }); }} />
                    <Field label="Title (EN)" value={s.titleEn} onChange={(v) => { const arr = [...data.process.steps]; arr[i] = { ...arr[i], titleEn: v }; setField('process', { ...data.process, steps: arr }); }} />
                    <FieldArea label="Açıklama (TR)" rows={3} value={s.descTr} onChange={(v) => { const arr = [...data.process.steps]; arr[i] = { ...arr[i], descTr: v }; setField('process', { ...data.process, steps: arr }); }} />
                    <FieldArea label="Description (EN)" rows={3} value={s.descEn} onChange={(v) => { const arr = [...data.process.steps]; arr[i] = { ...arr[i], descEn: v }; setField('process', { ...data.process, steps: arr }); }} />
                  </div>
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
