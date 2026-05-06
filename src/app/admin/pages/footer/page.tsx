'use client';

import { useEffect, useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { adminApi } from '@/lib/adminApi';
import { footerDefaults, type FooterContent } from '@/lib/pageDefaults';
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

export default function FooterEditor() {
  const slug = 'footer';
  const [data, setData] = useState<FooterContent>(footerDefaults);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    (async () => { try { const r = await adminApi.getPage(slug); setData({ ...footerDefaults, ...(r as object) } as FooterContent); } catch {} finally { setLoading(false); } })();
  }, []);

  function setField<K extends keyof FooterContent>(s: K, v: FooterContent[K]) { setData((p) => ({ ...p, [s]: v })); setSaved(false); }
  async function handleSave() {
    setSaving(true);
    try { await adminApi.updatePage(slug, data as unknown as Record<string, unknown>); setSaved(true); setTimeout(() => setSaved(false), 3000); }
    catch (e) { alert('Hata: ' + (e instanceof Error ? e.message : '')); } finally { setSaving(false); }
  }
  async function handleReset() {
    if (!confirm('Tüm içerikleri varsayılana döndürmek istediğine emin misin?')) return;
    setData(footerDefaults); setSaving(true);
    try { await adminApi.updatePage(slug, footerDefaults as unknown as Record<string, unknown>); setSaved(true); setTimeout(() => setSaved(false), 3000); }
    catch (e) { alert('Hata: ' + (e instanceof Error ? e.message : '')); } finally { setSaving(false); }
  }
  if (loading) return <LoadingSpinner />;

  return (
    <div>
      <StickyEditorHeader title="Footer" description="Şirket açıklaması, linkler, iletişim, sosyal medya, yasal" previewHref="/" saving={saving} saved={saved} onSave={handleSave} onReset={handleReset} />
      <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
        <section className={sectionCard}>
          <div className={sectionInner}>
            <SectionTitle>Marka</SectionTitle>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
              <FieldArea label="Açıklama (TR)" rows={4} value={data.brand.descriptionTr} onChange={(v) => setField('brand', { ...data.brand, descriptionTr: v })} />
              <FieldArea label="Description (EN)" rows={4} value={data.brand.descriptionEn} onChange={(v) => setField('brand', { ...data.brand, descriptionEn: v })} />
              <Field label="Logo URL" value={data.brand.logo} onChange={(v) => setField('brand', { ...data.brand, logo: v })} />
            </div>
          </div>
        </section>

        <section className={sectionCard}>
          <div className={sectionInner}>
            <div className="flex items-center justify-between border-b border-white/[0.08] pb-2.5" style={{ marginBottom: '20px' }}>
              <h2 className="flex items-center gap-3 uppercase font-bold text-[#C9A84C]" style={{ fontSize: '13px', letterSpacing: '0.08em' }}>
                <span className="w-1 h-3.5 bg-[#C9A84C] rounded-full" /> Hızlı Linkler
              </h2>
              <button onClick={() => setField('quickLinks', [...data.quickLinks, { labelEn: '', labelTr: '', href: '/' }])} className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/[0.04] hover:bg-white/[0.08] text-[11px] text-white/70 rounded-md uppercase tracking-wider"><Plus size={11} /> Yeni</button>
            </div>
            <div className="space-y-2">
              {data.quickLinks.map((l, i) => (
                <div key={i} className="grid grid-cols-1 md:grid-cols-4 gap-3 items-end">
                  <Field label="Etiket (TR)" value={l.labelTr} onChange={(v) => { const a = [...data.quickLinks]; a[i] = { ...a[i], labelTr: v }; setField('quickLinks', a); }} />
                  <Field label="Label (EN)" value={l.labelEn} onChange={(v) => { const a = [...data.quickLinks]; a[i] = { ...a[i], labelEn: v }; setField('quickLinks', a); }} />
                  <Field label="Bağlantı" value={l.href} onChange={(v) => { const a = [...data.quickLinks]; a[i] = { ...a[i], href: v }; setField('quickLinks', a); }} />
                  <button onClick={() => setField('quickLinks', data.quickLinks.filter((_, j) => j !== i))} className="text-red-400/70 hover:text-red-400 text-[11px] py-2.5 inline-flex items-center gap-1"><Trash2 size={12} /> Sil</button>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className={sectionCard}>
          <div className={sectionInner}>
            <div className="flex items-center justify-between border-b border-white/[0.08] pb-2.5" style={{ marginBottom: '20px' }}>
              <h2 className="flex items-center gap-3 uppercase font-bold text-[#C9A84C]" style={{ fontSize: '13px', letterSpacing: '0.08em' }}>
                <span className="w-1 h-3.5 bg-[#C9A84C] rounded-full" /> Hizmet Linkleri
              </h2>
              <button onClick={() => setField('serviceLinks', [...data.serviceLinks, { labelEn: '', labelTr: '', href: '/' }])} className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/[0.04] hover:bg-white/[0.08] text-[11px] text-white/70 rounded-md uppercase tracking-wider"><Plus size={11} /> Yeni</button>
            </div>
            <div className="space-y-2">
              {data.serviceLinks.map((l, i) => (
                <div key={i} className="grid grid-cols-1 md:grid-cols-4 gap-3 items-end">
                  <Field label="Etiket (TR)" value={l.labelTr} onChange={(v) => { const a = [...data.serviceLinks]; a[i] = { ...a[i], labelTr: v }; setField('serviceLinks', a); }} />
                  <Field label="Label (EN)" value={l.labelEn} onChange={(v) => { const a = [...data.serviceLinks]; a[i] = { ...a[i], labelEn: v }; setField('serviceLinks', a); }} />
                  <Field label="Bağlantı" value={l.href} onChange={(v) => { const a = [...data.serviceLinks]; a[i] = { ...a[i], href: v }; setField('serviceLinks', a); }} />
                  <button onClick={() => setField('serviceLinks', data.serviceLinks.filter((_, j) => j !== i))} className="text-red-400/70 hover:text-red-400 text-[11px] py-2.5 inline-flex items-center gap-1"><Trash2 size={12} /> Sil</button>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className={sectionCard}>
          <div className={sectionInner}>
            <SectionTitle>İletişim Bilgileri</SectionTitle>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
              <Field label="Başlık (TR)" value={data.contactInfo.titleTr} onChange={(v) => setField('contactInfo', { ...data.contactInfo, titleTr: v })} />
              <Field label="Title (EN)" value={data.contactInfo.titleEn} onChange={(v) => setField('contactInfo', { ...data.contactInfo, titleEn: v })} />
              <FieldArea label="Adres (TR)" rows={3} value={data.contactInfo.addressTr} onChange={(v) => setField('contactInfo', { ...data.contactInfo, addressTr: v })} />
              <FieldArea label="Address (EN)" rows={3} value={data.contactInfo.addressEn} onChange={(v) => setField('contactInfo', { ...data.contactInfo, addressEn: v })} />
              <Field label="E-posta" value={data.contactInfo.email} onChange={(v) => setField('contactInfo', { ...data.contactInfo, email: v })} />
              <StringList label="Telefon numaraları" items={data.contactInfo.phones} onChange={(v) => setField('contactInfo', { ...data.contactInfo, phones: v })} />
            </div>
          </div>
        </section>

        <section className={sectionCard}>
          <div className={sectionInner}>
            <SectionTitle>Sosyal Medya</SectionTitle>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
              <Field label="Instagram" value={data.social.instagram} onChange={(v) => setField('social', { ...data.social, instagram: v })} />
              <Field label="Facebook" value={data.social.facebook} onChange={(v) => setField('social', { ...data.social, facebook: v })} />
              <Field label="YouTube" value={data.social.youtube} onChange={(v) => setField('social', { ...data.social, youtube: v })} />
              <Field label="LinkedIn" value={data.social.linkedin} onChange={(v) => setField('social', { ...data.social, linkedin: v })} />
            </div>
          </div>
        </section>

        <section className={sectionCard}>
          <div className={sectionInner}>
            <SectionTitle>Yasal & Telif</SectionTitle>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
              <Field label="Telif (TR)" value={data.legal.copyrightTr} onChange={(v) => setField('legal', { ...data.legal, copyrightTr: v })} />
              <Field label="Copyright (EN)" value={data.legal.copyrightEn} onChange={(v) => setField('legal', { ...data.legal, copyrightEn: v })} />
              <Field label="Gizlilik (TR)" value={data.legal.privacyTr} onChange={(v) => setField('legal', { ...data.legal, privacyTr: v })} />
              <Field label="Privacy (EN)" value={data.legal.privacyEn} onChange={(v) => setField('legal', { ...data.legal, privacyEn: v })} />
              <Field label="Kullanım Koşulları (TR)" value={data.legal.termsTr} onChange={(v) => setField('legal', { ...data.legal, termsTr: v })} />
              <Field label="Terms (EN)" value={data.legal.termsEn} onChange={(v) => setField('legal', { ...data.legal, termsEn: v })} />
              <Field label="Sorumluluk Reddi (TR)" value={data.legal.disclaimerTr} onChange={(v) => setField('legal', { ...data.legal, disclaimerTr: v })} />
              <Field label="Disclaimer (EN)" value={data.legal.disclaimerEn} onChange={(v) => setField('legal', { ...data.legal, disclaimerEn: v })} />
            </div>
            <p className={subBlockTitle + ' mt-4'}>Not: Bu metinler footer alt çizgisinde linkli olarak gösterilir.</p>
          </div>
        </section>

        <EditorFooter saving={saving} saved={saved} onSave={handleSave} onReset={handleReset} />
      </div>
    </div>
  );
}
