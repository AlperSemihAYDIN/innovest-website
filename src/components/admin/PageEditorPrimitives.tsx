'use client';

import Link from 'next/link';
import { ArrowLeft, Save, ExternalLink, RotateCcw } from 'lucide-react';
import type { ReactNode } from 'react';

export const inputClass =
  'w-full bg-white/[0.04] border border-white/10 rounded-lg px-3.5 py-2.5 text-sm text-white placeholder:text-white/25 focus:outline-none focus:border-[#C9A84C]/60 focus:bg-white/[0.06] transition-colors';
export const textareaClass = `${inputClass} resize-y min-h-[72px] leading-relaxed`;
export const labelClass = 'block uppercase font-semibold mb-1.5 text-white/45';
export const labelStyle: React.CSSProperties = { fontSize: '10px', letterSpacing: '0.1em' };
export const sectionCard = 'bg-white/[0.04] border border-white/[0.06] rounded-2xl';
export const sectionInner = 'p-7';
export const sectionTitleClass =
  'flex items-center gap-3 uppercase font-bold text-[#C9A84C] border-b border-white/[0.08] pb-2.5';
export const sectionTitleStyle: React.CSSProperties = {
  fontSize: '13px',
  letterSpacing: '0.08em',
  marginBottom: '20px',
};
export const subBlock =
  'border border-white/[0.06] rounded-xl p-5 bg-white/[0.015] space-y-4 relative';
export const subBlockTitle = 'text-[11px] uppercase tracking-[0.12em] text-white/35 font-semibold';

export function Field({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <div>
      <label className={labelClass} style={labelStyle}>
        {label}
      </label>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={inputClass}
      />
    </div>
  );
}

export function FieldArea({
  label,
  value,
  onChange,
  rows = 3,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  rows?: number;
}) {
  return (
    <div>
      <label className={labelClass} style={labelStyle}>
        {label}
      </label>
      <textarea value={value} onChange={(e) => onChange(e.target.value)} rows={rows} className={textareaClass} />
    </div>
  );
}

export function SectionTitle({ children }: { children: ReactNode }) {
  return (
    <h2 className={sectionTitleClass} style={sectionTitleStyle}>
      <span className="w-1 h-3.5 bg-[#C9A84C] rounded-full" /> {children}
    </h2>
  );
}

export function StickyEditorHeader({
  title,
  description,
  previewHref,
  saving,
  saved,
  onSave,
  onReset,
}: {
  title: string;
  description: string;
  previewHref: string;
  saving: boolean;
  saved: boolean;
  onSave: () => void;
  onReset: () => void;
}) {
  return (
    <div
      className="sticky z-30 -mx-2 px-2 py-3 bg-[#060e1a]/95 backdrop-blur-md border-b border-white/[0.06] mb-8"
      style={{ top: '0px' }}
    >
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 min-w-0">
          <Link
            href="/admin/pages"
            className="w-9 h-9 rounded-lg flex items-center justify-center bg-white/5 hover:bg-white/10 text-white/60 hover:text-white transition-all flex-shrink-0"
            aria-label="Geri"
          >
            <ArrowLeft size={16} />
          </Link>
          <div className="min-w-0">
            <h1 className="text-xl font-semibold text-white truncate">{title}</h1>
            <p className="text-white/40 text-[11px] mt-0.5 truncate">{description}</p>
          </div>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <a
            href={previewHref}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 text-[12px] text-white/50 hover:text-white transition-colors"
          >
            Önizle <ExternalLink size={11} />
          </a>
          <button
            onClick={onReset}
            disabled={saving}
            title="Orijinal içeriklere geri dön"
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 text-[12px] text-white/50 hover:text-red-300 transition-colors disabled:opacity-50"
          >
            <RotateCcw size={12} /> Sıfırla
          </button>
          <button
            onClick={onSave}
            disabled={saving}
            className="inline-flex items-center gap-2 bg-[#C9A84C] hover:bg-[#d4b87a] text-[#060e1a] font-semibold rounded-lg transition-all disabled:opacity-50"
            style={{ padding: '10px 28px', fontSize: '13px' }}
          >
            <Save size={14} />
            {saving ? 'Kaydediliyor...' : saved ? 'Kaydedildi ✓' : 'Kaydet'}
          </button>
        </div>
      </div>
    </div>
  );
}

export function EditorFooter({
  saving,
  saved,
  onSave,
  onReset,
}: {
  saving: boolean;
  saved: boolean;
  onSave: () => void;
  onReset: () => void;
}) {
  return (
    <div className="flex items-center justify-between gap-4 pt-2 pb-4">
      <button
        onClick={onReset}
        disabled={saving}
        className="inline-flex items-center gap-2 px-4 py-2.5 text-[12px] text-white/50 hover:text-red-300 transition-colors disabled:opacity-50"
      >
        <RotateCcw size={13} /> Tüm içerikleri sıfırla
      </button>
      <button
        onClick={onSave}
        disabled={saving}
        className="inline-flex items-center gap-2 bg-[#C9A84C] hover:bg-[#d4b87a] text-[#060e1a] font-semibold rounded-lg transition-all disabled:opacity-50"
        style={{ padding: '12px 32px', fontSize: '13px' }}
      >
        <Save size={14} />
        {saving ? 'Kaydediliyor...' : saved ? 'Kaydedildi ✓' : 'Tüm Değişiklikleri Kaydet'}
      </button>
    </div>
  );
}

export function LoadingSpinner() {
  return (
    <div className="flex justify-center py-20">
      <div className="w-8 h-8 border-2 border-[#C9A84C]/30 border-t-[#C9A84C] rounded-full animate-spin" />
    </div>
  );
}
