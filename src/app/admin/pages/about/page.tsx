'use client';

import { useEffect, useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { adminApi } from '@/lib/adminApi';
import { aboutDefaults, type AboutPageContent } from '@/lib/pageDefaults';
import {
  Field,
  FieldArea,
  SectionTitle,
  StickyEditorHeader,
  EditorFooter,
  LoadingSpinner,
  sectionCard,
  sectionInner,
  subBlock,
  subBlockTitle,
} from '@/components/admin/PageEditorPrimitives';

export default function AboutPageEditor() {
  const slug = 'about';
  const [data, setData] = useState<AboutPageContent>(aboutDefaults);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const remote = await adminApi.getPage(slug);
        setData({ ...aboutDefaults, ...(remote as object) } as AboutPageContent);
      } catch {}
      finally { setLoading(false); }
    })();
  }, []);

  function setField<K extends keyof AboutPageContent>(section: K, value: AboutPageContent[K]) {
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
    if (!confirm('Tüm içerikleri varsayılana döndürmek istediğine emin misin?')) return;
    setData(aboutDefaults);
    setSaving(true);
    try {
      await adminApi.updatePage(slug, aboutDefaults as unknown as Record<string, unknown>);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (err) {
      alert('Geri yükleme hatası: ' + (err instanceof Error ? err.message : 'Bilinmeyen hata'));
    } finally { setSaving(false); }
  }

  if (loading) return <LoadingSpinner />;

  return (
    <div>
      <StickyEditorHeader
        title="Hakkımızda"
        description="Hero, biz kimiz, misyon/vizyon, ekip, hikaye ve değerler"
        previewHref="/about"
        saving={saving}
        saved={saved}
        onSave={handleSave}
        onReset={handleReset}
      />

      <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
        {/* HERO */}
        <section className={sectionCard}>
          <div className={sectionInner}>
            <SectionTitle>Hero (Üst Banner)</SectionTitle>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
              <Field label="Başlık (TR)" value={data.hero.titleTr} onChange={(v) => setField('hero', { ...data.hero, titleTr: v })} />
              <Field label="Title (EN)" value={data.hero.titleEn} onChange={(v) => setField('hero', { ...data.hero, titleEn: v })} />
              <Field label="Vurgulu kısım (TR)" value={data.hero.titleHighlightTr} onChange={(v) => setField('hero', { ...data.hero, titleHighlightTr: v })} />
              <Field label="Highlight (EN)" value={data.hero.titleHighlightEn} onChange={(v) => setField('hero', { ...data.hero, titleHighlightEn: v })} />
              <FieldArea label="Alt metin (TR)" rows={4} value={data.hero.subtitleTr} onChange={(v) => setField('hero', { ...data.hero, subtitleTr: v })} />
              <FieldArea label="Subtitle (EN)" rows={4} value={data.hero.subtitleEn} onChange={(v) => setField('hero', { ...data.hero, subtitleEn: v })} />
            </div>
          </div>
        </section>

        {/* WHO WE ARE */}
        <section className={sectionCard}>
          <div className={sectionInner}>
            <SectionTitle>Biz Kimiz</SectionTitle>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
              <Field label="Etiket (TR)" value={data.whoWeAre.taglineTr} onChange={(v) => setField('whoWeAre', { ...data.whoWeAre, taglineTr: v })} />
              <Field label="Tagline (EN)" value={data.whoWeAre.taglineEn} onChange={(v) => setField('whoWeAre', { ...data.whoWeAre, taglineEn: v })} />
              <Field label="Başlık (TR)" value={data.whoWeAre.titleTr} onChange={(v) => setField('whoWeAre', { ...data.whoWeAre, titleTr: v })} />
              <Field label="Title (EN)" value={data.whoWeAre.titleEn} onChange={(v) => setField('whoWeAre', { ...data.whoWeAre, titleEn: v })} />
              <Field label="Vurgulu (TR)" value={data.whoWeAre.titleHighlightTr} onChange={(v) => setField('whoWeAre', { ...data.whoWeAre, titleHighlightTr: v })} />
              <Field label="Highlight (EN)" value={data.whoWeAre.titleHighlightEn} onChange={(v) => setField('whoWeAre', { ...data.whoWeAre, titleHighlightEn: v })} />
            </div>
          </div>
        </section>

        {/* MISSION & VISION */}
        <section className={sectionCard}>
          <div className={sectionInner}>
            <SectionTitle>Misyon & Vizyon</SectionTitle>
            <div className="space-y-3">
              <div className={subBlock}>
                <span className={subBlockTitle}>Misyon</span>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                  <Field label="Başlık (TR)" value={data.mission.titleTr} onChange={(v) => setField('mission', { ...data.mission, titleTr: v })} />
                  <Field label="Title (EN)" value={data.mission.titleEn} onChange={(v) => setField('mission', { ...data.mission, titleEn: v })} />
                  <FieldArea label="Açıklama (TR)" rows={4} value={data.mission.descTr} onChange={(v) => setField('mission', { ...data.mission, descTr: v })} />
                  <FieldArea label="Description (EN)" rows={4} value={data.mission.descEn} onChange={(v) => setField('mission', { ...data.mission, descEn: v })} />
                </div>
              </div>
              <div className={subBlock}>
                <span className={subBlockTitle}>Vizyon</span>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                  <Field label="Başlık (TR)" value={data.vision.titleTr} onChange={(v) => setField('vision', { ...data.vision, titleTr: v })} />
                  <Field label="Title (EN)" value={data.vision.titleEn} onChange={(v) => setField('vision', { ...data.vision, titleEn: v })} />
                  <FieldArea label="Açıklama (TR)" rows={4} value={data.vision.descTr} onChange={(v) => setField('vision', { ...data.vision, descTr: v })} />
                  <FieldArea label="Description (EN)" rows={4} value={data.vision.descEn} onChange={(v) => setField('vision', { ...data.vision, descEn: v })} />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* TEAM */}
        <section className={sectionCard}>
          <div className={sectionInner}>
            <div className="flex items-center justify-between border-b border-white/[0.08] pb-2.5" style={{ marginBottom: '20px' }}>
              <h2 className="flex items-center gap-3 uppercase font-bold text-[#C9A84C]" style={{ fontSize: '13px', letterSpacing: '0.08em' }}>
                <span className="w-1 h-3.5 bg-[#C9A84C] rounded-full" /> Ekip
              </h2>
              <button onClick={() => setField('team', { ...data.team, members: [...data.team.members, { name: '', image: '' }] })} className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/[0.04] hover:bg-white/[0.08] text-[11px] text-white/70 rounded-md transition-all uppercase tracking-wider font-medium">
                <Plus size={11} /> Yeni
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5 mb-6">
              <Field label="Etiket (TR)" value={data.team.taglineTr} onChange={(v) => setField('team', { ...data.team, taglineTr: v })} />
              <Field label="Tagline (EN)" value={data.team.taglineEn} onChange={(v) => setField('team', { ...data.team, taglineEn: v })} />
              <Field label="Başlık (TR)" value={data.team.titleTr} onChange={(v) => setField('team', { ...data.team, titleTr: v })} />
              <Field label="Title (EN)" value={data.team.titleEn} onChange={(v) => setField('team', { ...data.team, titleEn: v })} />
              <FieldArea label="Alt metin (TR)" value={data.team.subtitleTr} onChange={(v) => setField('team', { ...data.team, subtitleTr: v })} />
              <FieldArea label="Subtitle (EN)" value={data.team.subtitleEn} onChange={(v) => setField('team', { ...data.team, subtitleEn: v })} />
            </div>
            <div className="pt-5 border-t border-white/[0.06] space-y-3">
              <p className={subBlockTitle}>Ekip Üyeleri</p>
              {data.team.members.map((m, i) => (
                <div key={i} className={subBlock}>
                  <div className="flex items-center justify-between">
                    <span className={subBlockTitle}>Üye #{i + 1}</span>
                    <button onClick={() => setField('team', { ...data.team, members: data.team.members.filter((_, j) => j !== i) })} className="opacity-60 hover:opacity-100 text-red-400/80 hover:text-red-400" aria-label="Sil"><Trash2 size={14} /></button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                    <Field label="Ad" value={m.name} onChange={(v) => { const arr = [...data.team.members]; arr[i] = { ...arr[i], name: v }; setField('team', { ...data.team, members: arr }); }} />
                    <Field label="Fotoğraf URL" placeholder="/team/xxx.png" value={m.image} onChange={(v) => { const arr = [...data.team.members]; arr[i] = { ...arr[i], image: v }; setField('team', { ...data.team, members: arr }); }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* STORY */}
        <section className={sectionCard}>
          <div className={sectionInner}>
            <div className="flex items-center justify-between border-b border-white/[0.08] pb-2.5" style={{ marginBottom: '20px' }}>
              <h2 className="flex items-center gap-3 uppercase font-bold text-[#C9A84C]" style={{ fontSize: '13px', letterSpacing: '0.08em' }}>
                <span className="w-1 h-3.5 bg-[#C9A84C] rounded-full" /> Hikayemiz
              </h2>
              <button onClick={() => setField('story', { ...data.story, paragraphs: [...data.story.paragraphs, { textEn: '', textTr: '' }] })} className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/[0.04] hover:bg-white/[0.08] text-[11px] text-white/70 rounded-md transition-all uppercase tracking-wider font-medium">
                <Plus size={11} /> Yeni paragraf
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5 mb-6">
              <Field label="Etiket (TR)" value={data.story.taglineTr} onChange={(v) => setField('story', { ...data.story, taglineTr: v })} />
              <Field label="Tagline (EN)" value={data.story.taglineEn} onChange={(v) => setField('story', { ...data.story, taglineEn: v })} />
              <Field label="Başlık (TR)" value={data.story.titleTr} onChange={(v) => setField('story', { ...data.story, titleTr: v })} />
              <Field label="Title (EN)" value={data.story.titleEn} onChange={(v) => setField('story', { ...data.story, titleEn: v })} />
              <Field label="Vurgulu (TR)" value={data.story.titleHighlightTr} onChange={(v) => setField('story', { ...data.story, titleHighlightTr: v })} />
              <Field label="Highlight (EN)" value={data.story.titleHighlightEn} onChange={(v) => setField('story', { ...data.story, titleHighlightEn: v })} />
            </div>
            <div className="pt-5 border-t border-white/[0.06] space-y-3">
              <p className={subBlockTitle}>Paragraflar</p>
              {data.story.paragraphs.map((p, i) => (
                <div key={i} className={subBlock}>
                  <div className="flex items-center justify-between">
                    <span className={subBlockTitle}>Paragraf #{i + 1}</span>
                    <button onClick={() => setField('story', { ...data.story, paragraphs: data.story.paragraphs.filter((_, j) => j !== i) })} className="opacity-60 hover:opacity-100 text-red-400/80 hover:text-red-400"><Trash2 size={14} /></button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                    <FieldArea label="Metin (TR)" rows={4} value={p.textTr} onChange={(v) => { const arr = [...data.story.paragraphs]; arr[i] = { ...arr[i], textTr: v }; setField('story', { ...data.story, paragraphs: arr }); }} />
                    <FieldArea label="Text (EN)" rows={4} value={p.textEn} onChange={(v) => { const arr = [...data.story.paragraphs]; arr[i] = { ...arr[i], textEn: v }; setField('story', { ...data.story, paragraphs: arr }); }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* VALUES */}
        <section className={sectionCard}>
          <div className={sectionInner}>
            <div className="flex items-center justify-between border-b border-white/[0.08] pb-2.5" style={{ marginBottom: '20px' }}>
              <h2 className="flex items-center gap-3 uppercase font-bold text-[#C9A84C]" style={{ fontSize: '13px', letterSpacing: '0.08em' }}>
                <span className="w-1 h-3.5 bg-[#C9A84C] rounded-full" /> Değerlerimiz
              </h2>
              <button onClick={() => setField('values', { ...data.values, items: [...data.values.items, { titleEn: '', titleTr: '', descEn: '', descTr: '', icon: 'Shield', roman: 'V' }] })} className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/[0.04] hover:bg-white/[0.08] text-[11px] text-white/70 rounded-md transition-all uppercase tracking-wider font-medium">
                <Plus size={11} /> Yeni
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5 mb-6">
              <Field label="Etiket (TR)" value={data.values.taglineTr} onChange={(v) => setField('values', { ...data.values, taglineTr: v })} />
              <Field label="Tagline (EN)" value={data.values.taglineEn} onChange={(v) => setField('values', { ...data.values, taglineEn: v })} />
              <Field label="Başlık (TR)" value={data.values.titleTr} onChange={(v) => setField('values', { ...data.values, titleTr: v })} />
              <Field label="Title (EN)" value={data.values.titleEn} onChange={(v) => setField('values', { ...data.values, titleEn: v })} />
              <Field label="Vurgulu (TR)" value={data.values.titleHighlightTr} onChange={(v) => setField('values', { ...data.values, titleHighlightTr: v })} />
              <Field label="Highlight (EN)" value={data.values.titleHighlightEn} onChange={(v) => setField('values', { ...data.values, titleHighlightEn: v })} />
              <FieldArea label="Alt metin (TR)" value={data.values.subtitleTr} onChange={(v) => setField('values', { ...data.values, subtitleTr: v })} />
              <FieldArea label="Subtitle (EN)" value={data.values.subtitleEn} onChange={(v) => setField('values', { ...data.values, subtitleEn: v })} />
            </div>
            <div className="pt-5 border-t border-white/[0.06] space-y-3">
              <p className={subBlockTitle}>Değer Kartları</p>
              {data.values.items.map((it, i) => (
                <div key={i} className={subBlock}>
                  <div className="flex items-center justify-between">
                    <span className={subBlockTitle}>Değer #{i + 1}</span>
                    <button onClick={() => setField('values', { ...data.values, items: data.values.items.filter((_, j) => j !== i) })} className="opacity-60 hover:opacity-100 text-red-400/80 hover:text-red-400"><Trash2 size={14} /></button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                    <Field label="Başlık (TR)" value={it.titleTr} onChange={(v) => { const arr = [...data.values.items]; arr[i] = { ...arr[i], titleTr: v }; setField('values', { ...data.values, items: arr }); }} />
                    <Field label="Title (EN)" value={it.titleEn} onChange={(v) => { const arr = [...data.values.items]; arr[i] = { ...arr[i], titleEn: v }; setField('values', { ...data.values, items: arr }); }} />
                    <FieldArea label="Açıklama (TR)" rows={3} value={it.descTr} onChange={(v) => { const arr = [...data.values.items]; arr[i] = { ...arr[i], descTr: v }; setField('values', { ...data.values, items: arr }); }} />
                    <FieldArea label="Description (EN)" rows={3} value={it.descEn} onChange={(v) => { const arr = [...data.values.items]; arr[i] = { ...arr[i], descEn: v }; setField('values', { ...data.values, items: arr }); }} />
                    <Field label="İkon (lucide adı)" placeholder="Shield" value={it.icon} onChange={(v) => { const arr = [...data.values.items]; arr[i] = { ...arr[i], icon: v }; setField('values', { ...data.values, items: arr }); }} />
                    <Field label="Roma rakamı" placeholder="I" value={it.roman} onChange={(v) => { const arr = [...data.values.items]; arr[i] = { ...arr[i], roman: v }; setField('values', { ...data.values, items: arr }); }} />
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
