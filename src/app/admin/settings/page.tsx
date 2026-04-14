'use client';

import { useEffect, useState } from 'react';
import { Save, Globe, Phone, Mail, MapPin, Share2 } from 'lucide-react';
import { adminApi } from '@/lib/adminApi';

interface Settings {
  companyName: string;
  email: string;
  phoneLondon: string;
  phoneDubai: string;
  phoneTurkey: string;
  whatsapp: string;
  addressLondon: string;
  socialLinkedin: string;
  socialInstagram: string;
  socialTwitter: string;
}

const defaultSettings: Settings = {
  companyName: 'Innovest Capital',
  email: 'info@innovest.uk',
  phoneLondon: '+44 7491 510941',
  phoneDubai: '+971 54 755 0101',
  phoneTurkey: '+90 531 420 0331',
  whatsapp: '+447491510941',
  addressLondon: 'Berkeley Square House, 2nd Floor, Berkeley Square, Mayfair, London W1J 6BE',
  socialLinkedin: '',
  socialInstagram: '',
  socialTwitter: '',
};

const inputClass = 'w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-[#C1A45D]/50 transition-colors';
const labelClass = 'block text-xs text-white/50 uppercase tracking-wider mb-2 font-medium';

export default function SettingsPage() {
  const [data, setData] = useState<Settings>(defaultSettings);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    async function load() {
      try {
        const settings = await adminApi.getSettings();
        setData(prev => ({ ...prev, ...settings }));
      } catch { /* use defaults */ }
      finally { setLoading(false); }
    }
    load();
  }, []);

  function update(field: keyof Settings, value: string) {
    setData(prev => ({ ...prev, [field]: value }));
    setSaved(false);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    try {
      await adminApi.updateSettings(data as unknown as Record<string, unknown>);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (err) {
      alert('Kaydetme hatası: ' + (err instanceof Error ? err.message : 'Bilinmeyen hata'));
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return <div className="flex justify-center py-20"><div className="w-8 h-8 border-2 border-[#C1A45D]/30 border-t-[#C1A45D] rounded-full animate-spin" /></div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-white">Site Ayarları</h1>
        <p className="text-white/40 text-sm mt-1">Genel iletişim bilgileri ve sosyal medya ayarları</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 max-w-3xl">
        {/* Company Info */}
        <div className="bg-[#0a1628] border border-white/5 rounded-xl p-6 space-y-6">
          <div className="flex items-center gap-3 mb-2">
            <Globe size={16} className="text-[#C1A45D]" />
            <h2 className="text-sm font-medium text-white">Şirket Bilgileri</h2>
          </div>
          <div>
            <label className={labelClass}>Şirket Adı</label>
            <input value={data.companyName} onChange={e => update('companyName', e.target.value)} className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>E-posta</label>
            <input type="email" value={data.email} onChange={e => update('email', e.target.value)} className={inputClass} />
          </div>
        </div>

        {/* Phone Numbers */}
        <div className="bg-[#0a1628] border border-white/5 rounded-xl p-6 space-y-6">
          <div className="flex items-center gap-3 mb-2">
            <Phone size={16} className="text-[#C1A45D]" />
            <h2 className="text-sm font-medium text-white">Telefon Numaraları</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className={labelClass}>Londra</label>
              <input value={data.phoneLondon} onChange={e => update('phoneLondon', e.target.value)} className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Dubai</label>
              <input value={data.phoneDubai} onChange={e => update('phoneDubai', e.target.value)} className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Türkiye</label>
              <input value={data.phoneTurkey} onChange={e => update('phoneTurkey', e.target.value)} className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>WhatsApp</label>
              <input value={data.whatsapp} onChange={e => update('whatsapp', e.target.value)} className={inputClass} placeholder="+447491510941" />
            </div>
          </div>
        </div>

        {/* Address */}
        <div className="bg-[#0a1628] border border-white/5 rounded-xl p-6 space-y-6">
          <div className="flex items-center gap-3 mb-2">
            <MapPin size={16} className="text-[#C1A45D]" />
            <h2 className="text-sm font-medium text-white">Adres</h2>
          </div>
          <div>
            <label className={labelClass}>Londra Ofis Adresi</label>
            <textarea value={data.addressLondon} onChange={e => update('addressLondon', e.target.value)} className={`${inputClass} min-h-[80px] resize-y`} />
          </div>
        </div>

        {/* Social Media */}
        <div className="bg-[#0a1628] border border-white/5 rounded-xl p-6 space-y-6">
          <div className="flex items-center gap-3 mb-2">
            <Share2 size={16} className="text-[#C1A45D]" />
            <h2 className="text-sm font-medium text-white">Sosyal Medya</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className={labelClass}>LinkedIn</label>
              <input value={data.socialLinkedin} onChange={e => update('socialLinkedin', e.target.value)} className={inputClass} placeholder="https://linkedin.com/company/..." />
            </div>
            <div>
              <label className={labelClass}>Instagram</label>
              <input value={data.socialInstagram} onChange={e => update('socialInstagram', e.target.value)} className={inputClass} placeholder="https://instagram.com/..." />
            </div>
            <div>
              <label className={labelClass}>Twitter / X</label>
              <input value={data.socialTwitter} onChange={e => update('socialTwitter', e.target.value)} className={inputClass} placeholder="https://x.com/..." />
            </div>
          </div>
        </div>

        {/* Save */}
        <div className="flex items-center gap-4">
          <button type="submit" disabled={saving}
            className="flex items-center gap-2 px-8 py-3 bg-[#C1A45D] hover:bg-[#d4b76e] disabled:opacity-50 text-white text-sm font-medium rounded-lg transition-colors">
            <Save size={16} />
            {saving ? 'Kaydediliyor...' : 'Kaydet'}
          </button>
          {saved && <span className="text-green-400 text-sm">Kaydedildi!</span>}
        </div>
      </form>
    </div>
  );
}
