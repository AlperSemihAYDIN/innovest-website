'use client';

import { useEffect, useState } from 'react';
import { Plus, Pencil, Trash2, Search, MapPin, X } from 'lucide-react';
import { adminApi } from '@/lib/adminApi';
import PropertyForm from '@/components/admin/PropertyForm';

interface Property {
  id: string;
  slug: string;
  name: string;
  city: string;
  region: string;
  price: string;
  yield: string;
  completion: string;
  beds: string;
}

export default function PropertiesPage() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    loadProperties();
  }, []);

  async function loadProperties() {
    try {
      const data = await adminApi.getProperties();
      setProperties(data);
    } catch {
      // Empty state
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id: string, name: string) {
    if (!confirm(`"${name}" gayrimenkulü silmek istediğinize emin misiniz?`)) return;
    try {
      await adminApi.deleteProperty(id);
      setProperties(prev => prev.filter(p => p.id !== id));
    } catch (err) {
      alert('Silme hatası: ' + (err instanceof Error ? err.message : 'Bilinmeyen hata'));
    }
  }

  function handleSaved() {
    setShowForm(false);
    setEditingId(null);
    loadProperties();
  }

  const filtered = properties.filter(p =>
    p.name?.toLowerCase().includes(search.toLowerCase()) ||
    p.city?.toLowerCase().includes(search.toLowerCase())
  );

  if (showForm || editingId) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-white">
            {editingId ? 'Gayrimenkul Düzenle' : 'Yeni Gayrimenkul'}
          </h1>
          <button
            onClick={() => { setShowForm(false); setEditingId(null); }}
            className="flex items-center gap-2 px-4 py-2 text-white/50 hover:text-white text-sm transition-colors"
          >
            <X size={16} /> İptal
          </button>
        </div>
        <PropertyForm id={editingId} onSaved={handleSaved} />
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="admin-sticky-bar" style={{ marginBottom: '24px' }}>
        <div className="mr-auto">
          <h1 className="text-lg font-semibold text-white">Gayrimenkuller</h1>
          <p className="text-white/40 text-[11px] mt-0.5">{properties.length} gayrimenkul</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="admin-btn-primary"
        >
          <Plus size={14} /> Yeni Ekle
        </button>
      </div>

      {/* Search + Liste tek kart */}
      <div className="admin-card">
        <h2 className="admin-section-title">Liste</h2>
        <div className="relative" style={{ marginBottom: '20px' }}>
          <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 pointer-events-none" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Gayrimenkul ara..."
            className="admin-input"
            style={{ paddingLeft: '44px' }}
          />
        </div>

        {loading ? (
          <div className="flex justify-center py-16">
            <div className="w-8 h-8 border-2 border-[#C9A84C]/30 border-t-[#C9A84C] rounded-full animate-spin" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="py-16 text-center">
            <p className="text-white/30 text-sm">
              {search ? 'Sonuç bulunamadı' : 'Henüz gayrimenkul eklenmedi'}
            </p>
            {!search && (
              <p className="text-white/20 text-xs mt-2">
                &quot;Verileri Firestore&apos;a Aktar&quot; ile mevcut verileri yükleyebilirsiniz
              </p>
            )}
          </div>
        ) : (
          <div className="overflow-x-auto -mx-2">
            <table className="w-full min-w-[640px]">
              <thead>
                <tr className="border-b border-white/[0.08]">
                  <th className="text-left px-3 py-3 text-[10px] text-white/40 font-semibold uppercase tracking-wider">Proje</th>
                  <th className="text-left px-3 py-3 text-[10px] text-white/40 font-semibold uppercase tracking-wider">Konum</th>
                  <th className="text-left px-3 py-3 text-[10px] text-white/40 font-semibold uppercase tracking-wider">Fiyat</th>
                  <th className="text-left px-3 py-3 text-[10px] text-white/40 font-semibold uppercase tracking-wider">Getiri</th>
                  <th className="text-right px-3 py-3 text-[10px] text-white/40 font-semibold uppercase tracking-wider">İşlem</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.06]">
                {filtered.map((prop) => (
                  <tr key={prop.id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="px-3 py-3">
                      <p className="text-sm text-white font-medium whitespace-nowrap">{prop.name}</p>
                      <p className="text-xs text-white/30 mt-0.5">{prop.beds}</p>
                    </td>
                    <td className="px-3 py-3">
                      <div className="flex items-center gap-2 whitespace-nowrap">
                        <MapPin size={12} className="text-white/30" />
                        <span className="text-sm text-white/60 capitalize">{prop.city}</span>
                      </div>
                    </td>
                    <td className="px-3 py-3 text-sm text-white/70 whitespace-nowrap">{prop.price}</td>
                    <td className="px-3 py-3 text-sm text-[#C9A84C] whitespace-nowrap">{prop.yield}</td>
                    <td className="px-3 py-3">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => setEditingId(prop.id)}
                          className="p-2 hover:bg-white/5 rounded-lg text-white/40 hover:text-white transition-all"
                          title="Düzenle"
                        >
                          <Pencil size={14} />
                        </button>
                        <button
                          onClick={() => handleDelete(prop.id, prop.name)}
                          className="p-2 hover:bg-red-500/10 rounded-lg text-white/40 hover:text-red-400 transition-all"
                          title="Sil"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
