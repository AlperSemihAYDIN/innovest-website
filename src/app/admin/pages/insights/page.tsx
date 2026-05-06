'use client';

import { useEffect, useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { adminApi } from '@/lib/adminApi';
import { insightsDefaults, type InsightsPageContent } from '@/lib/pageDefaults';
import {
  Field, FieldArea, SectionTitle, StickyEditorHeader, EditorFooter, LoadingSpinner,
  sectionCard, sectionInner, inputClass, labelClass, labelStyle, subBlockTitle,
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

export default function InsightsPageEditor() {
  const slug = 'insights';
  const [data, setData] = useState<InsightsPageContent>(insightsDefaults);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    (async () => { try { const r = await adminApi.getPage(slug); setData({ ...insightsDefaults, ...(r as object) } as InsightsPageContent); } catch {} finally { setLoading(false); } })();
  }, []);

  function setField<K extends keyof InsightsPageContent>(s: K, v: InsightsPageContent[K]) { setData((p) => ({ ...p, [s]: v })); setSaved(false); }
  async function handleSave() {
    setSaving(true);
    try { await adminApi.updatePage(slug, data as unknown as Record<string, unknown>); setSaved(true); setTimeout(() => setSaved(false), 3000); }
    catch (e) { alert('Hata: ' + (e instanceof Error ? e.message : '')); } finally { setSaving(false); }
  }
  async function handleReset() {
    if (!confirm('Tüm içerikleri varsayılana döndürmek istediğine emin misin?')) return;
    setData(insightsDefaults); setSaving(true);
    try { await adminApi.updatePage(slug, insightsDefaults as unknown as Record<string, unknown>); setSaved(true); setTimeout(() => setSaved(false), 3000); }
    catch (e) { alert('Hata: ' + (e instanceof Error ? e.message : '')); } finally { setSaving(false); }
  }
  if (loading) return <LoadingSpinner />;

  return (
    <div>
      <StickyEditorHeader title="İçgörüler" description="Hero, kategori etiketleri, makale CTA" previewHref="/insights" saving={saving} saved={saved} onSave={handleSave} onReset={handleReset} />
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
            <SectionTitle>Öne Çıkan Makale Etiketi</SectionTitle>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
              <Field label="Etiket (TR)" value={data.featuredArticle.taglineTr} onChange={(v) => setField('featuredArticle', { ...data.featuredArticle, taglineTr: v })} />
              <Field label="Tagline (EN)" value={data.featuredArticle.taglineEn} onChange={(v) => setField('featuredArticle', { ...data.featuredArticle, taglineEn: v })} />
            </div>
          </div>
        </section>

        <section className={sectionCard}>
          <div className={sectionInner}>
            <SectionTitle>Kategoriler</SectionTitle>
            <p className={subBlockTitle + ' mb-3'}>İlk öğe genellikle &quot;Tümü / All&quot; olmalıdır</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
              <StringList label="Kategoriler (TR)" items={data.categoriesTr} onChange={(v) => setField('categoriesTr', v)} />
              <StringList label="Categories (EN)" items={data.categoriesEn} onChange={(v) => setField('categoriesEn', v)} />
            </div>
          </div>
        </section>

        <section className={sectionCard}>
          <div className={sectionInner}>
            <SectionTitle>Makale CTA Butonu</SectionTitle>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
              <Field label="Buton metni (TR)" value={data.cta.buttonTextTr} onChange={(v) => setField('cta', { ...data.cta, buttonTextTr: v })} />
              <Field label="Button (EN)" value={data.cta.buttonTextEn} onChange={(v) => setField('cta', { ...data.cta, buttonTextEn: v })} />
            </div>
          </div>
        </section>

        <EditorFooter saving={saving} saved={saved} onSave={handleSave} onReset={handleReset} />
      </div>
    </div>
  );
}
