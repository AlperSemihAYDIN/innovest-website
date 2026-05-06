'use client';

import { useEffect, useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { adminApi } from '@/lib/adminApi';
import { realEstateDefaults, type RealEstatePageContent } from '@/lib/pageDefaults';
import {
  Field, FieldArea, SectionTitle, StickyEditorHeader, EditorFooter, LoadingSpinner,
  sectionCard, sectionInner, subBlock, subBlockTitle,
} from '@/components/admin/PageEditorPrimitives';

export default function RealEstatePageEditor() {
  const slug = 'real-estate';
  const [data, setData] = useState<RealEstatePageContent>(realEstateDefaults);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    (async () => {
      try { const r = await adminApi.getPage(slug); setData({ ...realEstateDefaults, ...(r as object) } as RealEstatePageContent); } catch {}
      finally { setLoading(false); }
    })();
  }, []);

  function setField<K extends keyof RealEstatePageContent>(s: K, v: RealEstatePageContent[K]) { setData((p) => ({ ...p, [s]: v })); setSaved(false); }
  async function handleSave() {
    setSaving(true);
    try { await adminApi.updatePage(slug, data as unknown as Record<string, unknown>); setSaved(true); setTimeout(() => setSaved(false), 3000); }
    catch (e) { alert('Kaydetme hatası: ' + (e instanceof Error ? e.message : '')); } finally { setSaving(false); }
  }
  async function handleReset() {
    if (!confirm('Tüm içerikleri varsayılana döndürmek istediğine emin misin?')) return;
    setData(realEstateDefaults); setSaving(true);
    try { await adminApi.updatePage(slug, realEstateDefaults as unknown as Record<string, unknown>); setSaved(true); setTimeout(() => setSaved(false), 3000); }
    catch (e) { alert('Hata: ' + (e instanceof Error ? e.message : '')); } finally { setSaving(false); }
  }
  if (loading) return <LoadingSpinner />;

  return (
    <div>
      <StickyEditorHeader title="Gayrimenkul" description="Hero ve pazar (Londra/Dubai) kartları" previewHref="/real-estate" saving={saving} saved={saved} onSave={handleSave} onReset={handleReset} />
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
                <span className="w-1 h-3.5 bg-[#C9A84C] rounded-full" /> Pazarlar
              </h2>
              <button onClick={() => setField('markets', [...data.markets, { city: '', image: '', taglineEn: '', taglineTr: '', descEn: '', descTr: '', stats: [], ctaEn: '', ctaTr: '', href: '' }])} className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/[0.04] hover:bg-white/[0.08] text-[11px] text-white/70 rounded-md uppercase tracking-wider font-medium">
                <Plus size={11} /> Yeni
              </button>
            </div>
            <div className="space-y-3">
              {data.markets.map((m, i) => (
                <div key={i} className={subBlock}>
                  <div className="flex items-center justify-between">
                    <span className={subBlockTitle}>Pazar #{i + 1} — {m.city}</span>
                    <button onClick={() => setField('markets', data.markets.filter((_, j) => j !== i))} className="opacity-60 hover:opacity-100 text-red-400/80 hover:text-red-400"><Trash2 size={14} /></button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                    <Field label="Şehir" value={m.city} onChange={(v) => { const arr = [...data.markets]; arr[i] = { ...arr[i], city: v }; setField('markets', arr); }} />
                    <Field label="Görsel URL" value={m.image} onChange={(v) => { const arr = [...data.markets]; arr[i] = { ...arr[i], image: v }; setField('markets', arr); }} />
                    <Field label="Etiket (TR)" placeholder="YATIRIM YAP" value={m.taglineTr} onChange={(v) => { const arr = [...data.markets]; arr[i] = { ...arr[i], taglineTr: v }; setField('markets', arr); }} />
                    <Field label="Tagline (EN)" placeholder="INVEST IN" value={m.taglineEn} onChange={(v) => { const arr = [...data.markets]; arr[i] = { ...arr[i], taglineEn: v }; setField('markets', arr); }} />
                    <FieldArea label="Açıklama (TR)" rows={4} value={m.descTr} onChange={(v) => { const arr = [...data.markets]; arr[i] = { ...arr[i], descTr: v }; setField('markets', arr); }} />
                    <FieldArea label="Description (EN)" rows={4} value={m.descEn} onChange={(v) => { const arr = [...data.markets]; arr[i] = { ...arr[i], descEn: v }; setField('markets', arr); }} />
                    <Field label="CTA (TR)" value={m.ctaTr} onChange={(v) => { const arr = [...data.markets]; arr[i] = { ...arr[i], ctaTr: v }; setField('markets', arr); }} />
                    <Field label="CTA (EN)" value={m.ctaEn} onChange={(v) => { const arr = [...data.markets]; arr[i] = { ...arr[i], ctaEn: v }; setField('markets', arr); }} />
                    <Field label="Bağlantı (href)" placeholder="/real-estate/london" value={m.href} onChange={(v) => { const arr = [...data.markets]; arr[i] = { ...arr[i], href: v }; setField('markets', arr); }} />
                  </div>
                  <div className="pt-4 mt-4 border-t border-white/[0.06]">
                    <div className="flex items-center justify-between mb-3">
                      <p className={subBlockTitle}>İstatistikler</p>
                      <button onClick={() => { const arr = [...data.markets]; arr[i] = { ...arr[i], stats: [...arr[i].stats, { value: '', labelEn: '', labelTr: '' }] }; setField('markets', arr); }} className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-white/[0.04] hover:bg-white/[0.08] text-[10px] text-white/70 rounded uppercase tracking-wider"><Plus size={10} /> Yeni</button>
                    </div>
                    <div className="space-y-2">
                      {m.stats.map((st, k) => (
                        <div key={k} className="grid grid-cols-1 md:grid-cols-4 gap-3 items-end">
                          <Field label="Değer" value={st.value} onChange={(v) => { const arr = [...data.markets]; const sa = [...arr[i].stats]; sa[k] = { ...sa[k], value: v }; arr[i] = { ...arr[i], stats: sa }; setField('markets', arr); }} />
                          <Field label="Etiket (TR)" value={st.labelTr} onChange={(v) => { const arr = [...data.markets]; const sa = [...arr[i].stats]; sa[k] = { ...sa[k], labelTr: v }; arr[i] = { ...arr[i], stats: sa }; setField('markets', arr); }} />
                          <Field label="Label (EN)" value={st.labelEn} onChange={(v) => { const arr = [...data.markets]; const sa = [...arr[i].stats]; sa[k] = { ...sa[k], labelEn: v }; arr[i] = { ...arr[i], stats: sa }; setField('markets', arr); }} />
                          <button onClick={() => { const arr = [...data.markets]; arr[i] = { ...arr[i], stats: arr[i].stats.filter((_, x) => x !== k) }; setField('markets', arr); }} className="text-red-400/70 hover:text-red-400 text-[11px] py-2.5 inline-flex items-center gap-1"><Trash2 size={12} /> Sil</button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <EditorFooter saving={saving} saved={saved} onSave={handleSave} onReset={handleReset} />
      </div>
    </div>
  );
}
