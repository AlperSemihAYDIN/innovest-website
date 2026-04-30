'use client';

import { useEffect, useState } from 'react';
import { Save, Globe, Phone, MapPin, Share2 } from 'lucide-react';
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

export default function SettingsPage() {
  const [data, setData] = useState<Settings>(defaultSettings);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const settings = await adminApi.getSettings();
        setData((prev) => ({ ...prev, ...settings }));
      } catch {}
      finally { setLoading(false); }
    })();
  }, []);

  function update(field: keyof Settings, value: string) {
    setData((prev) => ({ ...prev, [field]: value }));
    setSaved(false);
  }

  async function handleSave() {
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
    return (
      <div className="flex justify-center py-20">
        <div className="w-8 h-8 border-2 border-[#C9A84C]/30 border-t-[#C9A84C] rounded-full animate-spin" />
      </div>
    );
  }

  const SaveButton = ({ label = 'Kaydet' }: { label?: string }) => (
    <button onClick={handleSave} disabled={saving} className="admin-btn-primary">
      <Save size={14} />
      {saving ? 'Kaydediliyor...' : saved ? 'Kaydedildi ✓' : label}
    </button>
  );

  return (
    <div>
      {/* Sticky top bar */}
      <div className="admin-sticky-bar" style={{ marginBottom: '32px' }}>
        <div className="mr-auto">
          <h1 className="text-lg font-semibold text-white">Site Ayarları</h1>
          <p className="text-white/40 text-[11px] mt-0.5">İletişim bilgileri ve sosyal medya</p>
        </div>
        <SaveButton />
      </div>

      <form onSubmit={(e) => { e.preventDefault(); handleSave(); }}>
        <div className="admin-card">
          <h2 className="admin-section-title">
            <Globe size={13} /> Şirket Bilgileri
          </h2>
          <div className="admin-field">
            <label className="admin-label">Şirket Adı</label>
            <input value={data.companyName} onChange={(e) => update('companyName', e.target.value)} className="admin-input" />
          </div>
          <div className="admin-field">
            <label className="admin-label">E-posta</label>
            <input type="email" value={data.email} onChange={(e) => update('email', e.target.value)} className="admin-input" />
          </div>
        </div>

        <div className="admin-card">
          <h2 className="admin-section-title">
            <Phone size={13} /> Telefon Numaraları
          </h2>
          <div className="admin-grid-2 admin-field">
            <div>
              <label className="admin-label">Londra</label>
              <input value={data.phoneLondon} onChange={(e) => update('phoneLondon', e.target.value)} className="admin-input" />
            </div>
            <div>
              <label className="admin-label">Dubai</label>
              <input value={data.phoneDubai} onChange={(e) => update('phoneDubai', e.target.value)} className="admin-input" />
            </div>
          </div>
          <div className="admin-grid-2 admin-field">
            <div>
              <label className="admin-label">Türkiye</label>
              <input value={data.phoneTurkey} onChange={(e) => update('phoneTurkey', e.target.value)} className="admin-input" />
            </div>
            <div>
              <label className="admin-label">WhatsApp</label>
              <input value={data.whatsapp} onChange={(e) => update('whatsapp', e.target.value)} className="admin-input" placeholder="+447491510941" />
            </div>
          </div>
        </div>

        <div className="admin-card">
          <h2 className="admin-section-title">
            <MapPin size={13} /> Adres
          </h2>
          <div className="admin-field">
            <label className="admin-label">Londra Ofis Adresi</label>
            <textarea value={data.addressLondon} onChange={(e) => update('addressLondon', e.target.value)} className="admin-input admin-textarea" rows={3} />
          </div>
        </div>

        <div className="admin-card">
          <h2 className="admin-section-title">
            <Share2 size={13} /> Sosyal Medya
          </h2>
          <div className="admin-grid-2 admin-field">
            <div>
              <label className="admin-label">LinkedIn</label>
              <input value={data.socialLinkedin} onChange={(e) => update('socialLinkedin', e.target.value)} className="admin-input" placeholder="https://linkedin.com/company/..." />
            </div>
            <div>
              <label className="admin-label">Instagram</label>
              <input value={data.socialInstagram} onChange={(e) => update('socialInstagram', e.target.value)} className="admin-input" placeholder="https://instagram.com/..." />
            </div>
          </div>
          <div className="admin-field">
            <label className="admin-label">Twitter / X</label>
            <input value={data.socialTwitter} onChange={(e) => update('socialTwitter', e.target.value)} className="admin-input" placeholder="https://x.com/..." />
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', paddingTop: '8px' }}>
          <SaveButton label="Tüm Değişiklikleri Kaydet" />
        </div>
      </form>
    </div>
  );
}
