'use client';

import { useEffect, useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { adminApi } from '@/lib/adminApi';
import { contactDefaults, type ContactPageContent } from '@/lib/pageDefaults';
import {
  Field, FieldArea, SectionTitle, StickyEditorHeader, EditorFooter, LoadingSpinner,
  sectionCard, sectionInner, inputClass, labelClass, labelStyle,
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

export default function ContactPageEditor() {
  const slug = 'contact';
  const [data, setData] = useState<ContactPageContent>(contactDefaults);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    (async () => { try { const r = await adminApi.getPage(slug); setData({ ...contactDefaults, ...(r as object) } as ContactPageContent); } catch {} finally { setLoading(false); } })();
  }, []);

  function setField<K extends keyof ContactPageContent>(s: K, v: ContactPageContent[K]) { setData((p) => ({ ...p, [s]: v })); setSaved(false); }
  async function handleSave() {
    setSaving(true);
    try { await adminApi.updatePage(slug, data as unknown as Record<string, unknown>); setSaved(true); setTimeout(() => setSaved(false), 3000); }
    catch (e) { alert('Hata: ' + (e instanceof Error ? e.message : '')); } finally { setSaving(false); }
  }
  async function handleReset() {
    if (!confirm('Tüm içerikleri varsayılana döndürmek istediğine emin misin?')) return;
    setData(contactDefaults); setSaving(true);
    try { await adminApi.updatePage(slug, contactDefaults as unknown as Record<string, unknown>); setSaved(true); setTimeout(() => setSaved(false), 3000); }
    catch (e) { alert('Hata: ' + (e instanceof Error ? e.message : '')); } finally { setSaving(false); }
  }
  if (loading) return <LoadingSpinner />;

  return (
    <div>
      <StickyEditorHeader title="İletişim" description="Hero, form alanları, başarı mesajı, doğrudan iletişim" previewHref="/contact" saving={saving} saved={saved} onSave={handleSave} onReset={handleReset} />
      <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
        <section className={sectionCard}>
          <div className={sectionInner}>
            <SectionTitle>Hero (Üst Banner)</SectionTitle>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
              <Field label="Etiket (TR)" value={data.hero.taglineTr} onChange={(v) => setField('hero', { ...data.hero, taglineTr: v })} />
              <Field label="Tagline (EN)" value={data.hero.taglineEn} onChange={(v) => setField('hero', { ...data.hero, taglineEn: v })} />
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
            <SectionTitle>Form: Başlık & Etiketler</SectionTitle>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
              <Field label="Form başlığı (TR)" value={data.form.sectionTitleTr} onChange={(v) => setField('form', { ...data.form, sectionTitleTr: v })} />
              <Field label="Form Title (EN)" value={data.form.sectionTitleEn} onChange={(v) => setField('form', { ...data.form, sectionTitleEn: v })} />
              <Field label="Vurgulu (TR)" value={data.form.sectionTitleHighlightTr} onChange={(v) => setField('form', { ...data.form, sectionTitleHighlightTr: v })} />
              <Field label="Highlight (EN)" value={data.form.sectionTitleHighlightEn} onChange={(v) => setField('form', { ...data.form, sectionTitleHighlightEn: v })} />
              <FieldArea label="Form alt metni (TR)" rows={3} value={data.form.sectionSubtitleTr} onChange={(v) => setField('form', { ...data.form, sectionSubtitleTr: v })} />
              <FieldArea label="Form subtitle (EN)" rows={3} value={data.form.sectionSubtitleEn} onChange={(v) => setField('form', { ...data.form, sectionSubtitleEn: v })} />
              <Field label="Ad-Soyad etiketi (TR)" value={data.form.nameTr} onChange={(v) => setField('form', { ...data.form, nameTr: v })} />
              <Field label="Name label (EN)" value={data.form.nameEn} onChange={(v) => setField('form', { ...data.form, nameEn: v })} />
              <Field label="E-posta etiketi (TR)" value={data.form.emailTr} onChange={(v) => setField('form', { ...data.form, emailTr: v })} />
              <Field label="Email label (EN)" value={data.form.emailEn} onChange={(v) => setField('form', { ...data.form, emailEn: v })} />
              <Field label="Telefon etiketi (TR)" value={data.form.phoneTr} onChange={(v) => setField('form', { ...data.form, phoneTr: v })} />
              <Field label="Phone label (EN)" value={data.form.phoneEn} onChange={(v) => setField('form', { ...data.form, phoneEn: v })} />
              <Field label="Konum etiketi (TR)" value={data.form.locationTr} onChange={(v) => setField('form', { ...data.form, locationTr: v })} />
              <Field label="Location label (EN)" value={data.form.locationEn} onChange={(v) => setField('form', { ...data.form, locationEn: v })} />
              <Field label="Bütçe etiketi (TR)" value={data.form.budgetTr} onChange={(v) => setField('form', { ...data.form, budgetTr: v })} />
              <Field label="Budget label (EN)" value={data.form.budgetEn} onChange={(v) => setField('form', { ...data.form, budgetEn: v })} />
              <Field label="İlgi alanı etiketi (TR)" value={data.form.interestTr} onChange={(v) => setField('form', { ...data.form, interestTr: v })} />
              <Field label="Interest label (EN)" value={data.form.interestEn} onChange={(v) => setField('form', { ...data.form, interestEn: v })} />
              <Field label="Mesaj etiketi (TR)" value={data.form.messageTr} onChange={(v) => setField('form', { ...data.form, messageTr: v })} />
              <Field label="Message label (EN)" value={data.form.messageEn} onChange={(v) => setField('form', { ...data.form, messageEn: v })} />
              <Field label="Gönder butonu (TR)" value={data.form.submitTr} onChange={(v) => setField('form', { ...data.form, submitTr: v })} />
              <Field label="Submit button (EN)" value={data.form.submitEn} onChange={(v) => setField('form', { ...data.form, submitEn: v })} />
              <FieldArea label="Form notu (TR)" rows={2} value={data.form.noteTr} onChange={(v) => setField('form', { ...data.form, noteTr: v })} />
              <FieldArea label="Form note (EN)" rows={2} value={data.form.noteEn} onChange={(v) => setField('form', { ...data.form, noteEn: v })} />
            </div>
          </div>
        </section>

        <section className={sectionCard}>
          <div className={sectionInner}>
            <SectionTitle>Form: Bütçe & İlgi Seçenekleri</SectionTitle>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
              <StringList label="Bütçe seçenekleri (TR)" items={data.form.budgetOptionsTr} onChange={(v) => setField('form', { ...data.form, budgetOptionsTr: v })} />
              <StringList label="Budget options (EN)" items={data.form.budgetOptionsEn} onChange={(v) => setField('form', { ...data.form, budgetOptionsEn: v })} />
              <StringList label="İlgi alanı seçenekleri (TR)" items={data.form.interestOptionsTr} onChange={(v) => setField('form', { ...data.form, interestOptionsTr: v })} />
              <StringList label="Interest options (EN)" items={data.form.interestOptionsEn} onChange={(v) => setField('form', { ...data.form, interestOptionsEn: v })} />
            </div>
          </div>
        </section>

        <section className={sectionCard}>
          <div className={sectionInner}>
            <SectionTitle>Başarı Mesajı</SectionTitle>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
              <Field label="Başlık (TR)" value={data.successMessage.titleTr} onChange={(v) => setField('successMessage', { ...data.successMessage, titleTr: v })} />
              <Field label="Title (EN)" value={data.successMessage.titleEn} onChange={(v) => setField('successMessage', { ...data.successMessage, titleEn: v })} />
              <FieldArea label="Alt metin (TR)" rows={3} value={data.successMessage.subtitleTr} onChange={(v) => setField('successMessage', { ...data.successMessage, subtitleTr: v })} />
              <FieldArea label="Subtitle (EN)" rows={3} value={data.successMessage.subtitleEn} onChange={(v) => setField('successMessage', { ...data.successMessage, subtitleEn: v })} />
            </div>
          </div>
        </section>

        <section className={sectionCard}>
          <div className={sectionInner}>
            <SectionTitle>Doğrudan İletişim</SectionTitle>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
              <Field label="Başlık (TR)" value={data.directContact.titleTr} onChange={(v) => setField('directContact', { ...data.directContact, titleTr: v })} />
              <Field label="Title (EN)" value={data.directContact.titleEn} onChange={(v) => setField('directContact', { ...data.directContact, titleEn: v })} />
              <Field label="E-posta" value={data.directContact.email} onChange={(v) => setField('directContact', { ...data.directContact, email: v })} />
              <Field label="WhatsApp CTA (TR)" value={data.directContact.whatsappCTATr} onChange={(v) => setField('directContact', { ...data.directContact, whatsappCTATr: v })} />
              <Field label="WhatsApp CTA (EN)" value={data.directContact.whatsappCTAEn} onChange={(v) => setField('directContact', { ...data.directContact, whatsappCTAEn: v })} />
              <StringList label="Telefon numaraları" items={data.directContact.phones} onChange={(v) => setField('directContact', { ...data.directContact, phones: v })} />
            </div>
          </div>
        </section>

        <EditorFooter saving={saving} saved={saved} onSave={handleSave} onReset={handleReset} />
      </div>
    </div>
  );
}
