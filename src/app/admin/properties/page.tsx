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
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-white">Gayrimenkuller</h1>
          <p className="text-white/40 text-sm mt-1">{properties.length} gayrimenkul</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 px-5 py-2.5 bg-[#C1A45D] hover:bg-[#d4b76e] text-white text-sm font-medium rounded-lg transition-colors"
        >
          <Plus size={16} /> Yeni Ekle
        </button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Gayrimenkul ara..."
          className="w-full bg-[#0a1628] border border-white/5 rounded-lg pl-11 pr-4 py-3 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-[#C1A45D]/30 transition-colors"
        />
      </div>

      {/* Table */}
      {loading ? (
        <div className="flex justify-center py-20">
          <div className="w-8 h-8 border-2 border-[#C1A45D]/30 border-t-[#C1A45D] rounded-full animate-spin" />
        </div>
      ) : filtered.length === 0 ? (
        <div className="bg-[#0a1628] border border-white/5 rounded-xl py-20 text-center">
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
        <div className="bg-[#0a1628] border border-white/5 rounded-xl overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/5">
                <th className="text-left px-6 py-4 text-xs text-white/40 font-medium uppercase tracking-wider">Proje</th>
                <th className="text-left px-6 py-4 text-xs text-white/40 font-medium uppercase tracking-wider">Konum</th>
                <th className="text-left px-6 py-4 text-xs text-white/40 font-medium uppercase tracking-wider">Fiyat</th>
                <th className="text-left px-6 py-4 text-xs text-white/40 font-medium uppercase tracking-wider">Getiri</th>
                <th className="text-left px-6 py-4 text-xs text-white/40 font-medium uppercase tracking-wider">Teslim</th>
                <th className="text-right px-6 py-4 text-xs text-white/40 font-medium uppercase tracking-wider">İşlemler</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filtered.map((prop) => (
                <tr key={prop.id} className="hover:bg-white/[0.02] transition-colors">
                  <td className="px-6 py-4">
                    <p className="text-sm text-white font-medium">{prop.name}</p>
                    <p className="text-xs text-white/30 mt-0.5">{prop.beds}</p>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <MapPin size={12} className="text-white/30" />
                      <span className="text-sm text-white/60 capitalize">{prop.city}</span>
                      <span className="text-[10px] px-1.5 py-0.5 bg-white/5 rounded text-white/40">{prop.region}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-white/70">{prop.price}</td>
                  <td className="px-6 py-4 text-sm text-[#C1A45D]">{prop.yield}</td>
                  <td className="px-6 py-4 text-sm text-white/50">{prop.completion}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
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
  );
}
