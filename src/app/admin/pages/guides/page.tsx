'use client';

import { useEffect, useState } from 'react';
import { adminApi } from '@/lib/adminApi';
import { guidesDefaults, type GuidesPageContent } from '@/lib/pageDefaults';
import {
  Field, FieldArea, SectionTitle, StickyEditorHeader, EditorFooter, LoadingSpinner,
  sectionCard, sectionInner,
} from '@/components/admin/PageEditorPrimitives';

export default function GuidesPageEditor() {
  const slug = 'guides';
  const [data, setData] = useState<GuidesPageContent>(guidesDefaults);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    (async () => { try { const r = await adminApi.getPage(slug); setData({ ...guidesDefaults, ...(r as object) } as GuidesPageContent); } catch {} finally { setLoading(false); } })();
  }, []);

  function setField<K extends keyof GuidesPageContent>(s: K, v: GuidesPageContent[K]) { setData((p) => ({ ...p, [s]: v })); setSaved(false); }
  async function handleSave() {
    setSaving(true);
    try { await adminApi.updatePage(slug, data as unknown as Record<string, unknown>); setSaved(true); setTimeout(() => setSaved(false), 3000); }
    catch (e) { alert('Hata: ' + (e instanceof Error ? e.message : '')); } finally { setSaving(false); }
  }
  async function handleReset() {
    if (!confirm('Tüm içerikleri varsayılana döndürmek istediğine emin misin?')) return;
    setData(guidesDefaults); setSaving(true);
    try { await adminApi.updatePage(slug, guidesDefaults as unknown as Record<string, unknown>); setSaved(true); setTimeout(() => setSaved(false), 3000); }
    catch (e) { alert('Hata: ' + (e instanceof Error ? e.message : '')); } finally { setSaving(false); }
  }
  if (loading) return <LoadingSpinner />;

  return (
    <div>
      <StickyEditorHeader title="Yatırım Rehberi" description="Hero metni" previewHref="/insights" saving={saving} saved={saved} onSave={handleSave} onReset={handleReset} />
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

        <EditorFooter saving={saving} saved={saved} onSave={handleSave} onReset={handleReset} />
      </div>
    </div>
  );
}
