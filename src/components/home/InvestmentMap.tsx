'use client';

import 'leaflet/dist/leaflet.css';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { X, ExternalLink, MapPin, TrendingUp } from 'lucide-react';
import { mapProperties, type MapProperty } from '@/lib/mapProperties';

interface InvestmentMapProps {
  locale: 'en' | 'tr';
}

const REGION_CENTERS: Record<'UK' | 'UAE', [number, number]> = {
  UK: [51.505, -0.09],
  UAE: [25.2048, 55.2708],
};

const REGION_ZOOM: Record<'UK' | 'UAE', number> = {
  UK: 10,
  UAE: 10,
};

export default function InvestmentMap({ locale }: InvestmentMapProps) {
  const [activeRegion, setActiveRegion] = useState<'UK' | 'UAE'>('UK');
  const [selected, setSelected] = useState<MapProperty | null>(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  // mapReady tracks when Leaflet is fully initialised — fixes initial marker bug
  const [mapReady, setMapReady] = useState(false);
  const mapRef = useRef<import('leaflet').Map | null>(null);
  const markersRef = useRef<import('leaflet').Marker[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  const filtered = mapProperties.filter((p) => p.region === activeRegion);

  const t = {
    en: {
      tagline: 'Interactive Property Map',
      title: 'Find Properties',
      titleHighlight: 'by Location',
      subtitle: 'Navigate the map to explore our curated investment developments across London and Dubai.',
      viewProject: 'View Project',
      yield: 'Yield',
      close: 'Close',
      uk: 'United Kingdom',
      uae: 'United Arab Emirates',
    },
    tr: {
      tagline: 'İnteraktif Emlak Haritası',
      title: 'Konuma Göre',
      titleHighlight: 'Proje Keşfet',
      subtitle: "Londra ve Dubai'daki yatırım projelerini haritada keşfedin, konuma tıklayarak detayları görün.",
      viewProject: 'Projeyi İncele',
      yield: 'Getiri',
      close: 'Kapat',
      uk: 'Birleşik Krallık',
      uae: 'Birleşik Arap Emirlikleri',
    },
  }[locale];

  // ─── 1. Init Leaflet map once ───────────────────────────────────────────────
  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    const init = async () => {
      const L = (await import('leaflet')).default;

      // Fix bundler-broken default icon URLs
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      delete (L.Icon.Default.prototype as any)._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
        iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
        shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
      });

      const map = L.map(containerRef.current!, {
        center: REGION_CENTERS['UK'],
        zoom: REGION_ZOOM['UK'],
        zoomControl: true,
        scrollWheelZoom: false,
      });

      // Carto Voyager — clean, modern, warm-toned tile
      L.tileLayer(
        'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
        {
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
          maxZoom: 19,
        }
      ).addTo(map);

      mapRef.current = map;
      setMapReady(true); // triggers the markers effect below
    };

    init();

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  // ─── 2. Place / refresh markers whenever map is ready OR region changes ─────
  useEffect(() => {
    if (!mapReady || !mapRef.current) return;

    const update = async () => {
      const L = (await import('leaflet')).default;

      // Remove previous markers
      markersRef.current.forEach((m) => m.remove());
      markersRef.current = [];

      // Fly to selected region
      mapRef.current!.flyTo(REGION_CENTERS[activeRegion], REGION_ZOOM[activeRegion], {
        duration: 1.2,
      });

      // Custom gold teardrop pin that matches brand palette
      const goldIcon = L.divIcon({
        className: '',
        html: `<div style="
          width: 26px; height: 26px;
          background: #C1A45D;
          border: 2.5px solid #F7F5EF;
          border-radius: 50% 50% 50% 0;
          transform: rotate(-45deg);
          box-shadow: 0 2px 10px rgba(193,164,93,0.45), 0 1px 3px rgba(0,0,0,0.3);
          cursor: pointer;
        "></div>`,
        iconSize: [26, 26],
        iconAnchor: [13, 26],
        popupAnchor: [0, -28],
      });

      mapProperties
        .filter((p) => p.region === activeRegion)
        .forEach((property) => {
          const marker = L.marker([property.lat, property.lng], { icon: goldIcon });
          marker.on('click', () => {
            setSelected(property);
            setLightboxOpen(false);
          });
          marker.addTo(mapRef.current!);
          markersRef.current.push(marker);
        });
    };

    update();
  }, [mapReady, activeRegion]);

  return (
    <section className="flex flex-col justify-center py-24 bg-surface">
      <div className="px-6 md:px-12 lg:px-16 xl:px-20 flex flex-col items-center">
        {/* Heading */}
        <div className="w-full max-w-3xl mx-auto text-center mb-16">
          <span
            className="text-gold text-xs tracking-[0.25em] uppercase font-medium mb-4 block"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            {t.tagline}
          </span>
          <h2
            className="text-3xl md:text-4xl lg:text-5xl font-light mb-6 leading-tight"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            {t.title}{' '}
            <span className="text-gold italic">{t.titleHighlight}</span>
          </h2>
          <p className="text-muted leading-relaxed">{t.subtitle}</p>
        </div>

        {/* Region Tabs */}
        <div className="flex mb-10 border border-border overflow-hidden">
          {(['UK', 'UAE'] as const).map((region) => (
            <button
              key={region}
              onClick={() => {
                setActiveRegion(region);
                setSelected(null);
              }}
              className={`px-6 sm:px-10 py-3 text-sm tracking-widest uppercase transition-all duration-300 ${
                activeRegion === region
                  ? 'bg-gold text-[#09090b] font-semibold'
                  : 'bg-transparent text-muted hover:text-foreground'
              }`}
              style={{ fontFamily: 'var(--font-display)' }}
            >
              {region === 'UK' ? t.uk : t.uae}
            </button>
          ))}
        </div>

        {/* Map + Side Panel */}
        <div className="w-full max-w-6xl mx-auto flex flex-col lg:flex-row border border-border overflow-hidden">
          {/* Map — responsive heights */}
          <div className="relative flex-1 h-[320px] sm:h-[420px] lg:h-[580px]">
            {/* Override Leaflet styles for brand-aligned warm light theme */}
            <style>{`
              .leaflet-container { background: #f0ede6; }
              .leaflet-tile-pane { filter: sepia(12%) contrast(0.92) brightness(1.03) saturate(0.82); }
              .leaflet-control-attribution {
                font-size: 10px;
                background: rgba(247,245,239,0.85) !important;
                color: #8A7A63;
              }
              .leaflet-bar a {
                background: #F7F5EF !important;
                color: #091B2A !important;
                border-color: #C1A45D !important;
              }
              .leaflet-bar a:hover {
                background: #C1A45D !important;
                color: #F7F5EF !important;
              }
            `}</style>
            <div ref={containerRef} className="w-full h-full" />
          </div>

          {/* Side Panel */}
          <div className="w-full lg:w-80 bg-background border-t lg:border-t-0 lg:border-l border-border flex flex-col">
            {selected ? (
              <div className="flex flex-col h-full">
                {/* Thumbnail — click opens lightbox */}
                <div
                  className="relative h-48 sm:h-56 overflow-hidden cursor-zoom-in group shrink-0"
                  onClick={() => setLightboxOpen(true)}
                  title={locale === 'en' ? 'Click to enlarge' : 'Büyütmek için tıklayın'}
                >
                  <Image
                    src={selected.image}
                    alt={selected.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="320px"
                  />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors" />
                  <div className="absolute bottom-2 right-2 bg-black/50 text-white text-xs px-2 py-1 backdrop-blur-sm">
                    {locale === 'en' ? 'Click to enlarge' : 'Büyütmek için tıklayın'}
                  </div>
                </div>

                {/* Details */}
                <div className="p-5 sm:p-6 flex flex-col flex-1 gap-4">
                  <div>
                    <p
                      className="text-gold text-xs tracking-widest uppercase mb-1"
                      style={{ fontFamily: 'var(--font-display)' }}
                    >
                      {selected.developer}
                    </p>
                    <h3
                      className="text-lg sm:text-xl font-light text-foreground leading-tight"
                      style={{ fontFamily: 'var(--font-display)' }}
                    >
                      {selected.name}
                    </h3>
                  </div>

                  <div className="flex items-center gap-2 text-muted text-sm">
                    <MapPin size={14} className="text-gold shrink-0" />
                    {selected.location}
                  </div>

                  <div className="grid grid-cols-2 gap-3 py-4 border-t border-b border-border">
                    <div>
                      <p className="text-xs text-muted mb-1">
                        {locale === 'en' ? 'Price from' : 'Başlangıç fiyatı'}
                      </p>
                      <p
                        className="text-gold font-medium"
                        style={{ fontFamily: 'var(--font-display)' }}
                      >
                        {selected.price}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-muted mb-1">{t.yield}</p>
                      <div
                        className="flex items-center gap-1 text-gold font-medium"
                        style={{ fontFamily: 'var(--font-display)' }}
                      >
                        <TrendingUp size={14} />
                        {selected.yield}
                      </div>
                    </div>
                  </div>

                  <Link
                    href={selected.href[locale]}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-auto w-full flex items-center justify-center gap-2 bg-gold text-[#09090b] py-3 text-sm tracking-widest uppercase hover:bg-gold-light transition-colors duration-300"
                    style={{ fontFamily: 'var(--font-display)' }}
                  >
                    {t.viewProject}
                    <ExternalLink size={14} />
                  </Link>
                </div>
              </div>
            ) : (
              /* Empty state with property list */
              <div className="flex flex-col items-center justify-center h-full py-12 px-6 text-center gap-4">
                <MapPin size={36} className="text-gold/40" />
                <p className="text-muted text-sm leading-relaxed">
                  {locale === 'en'
                    ? 'Click a marker on the map to see property details.'
                    : 'Proje detaylarını görmek için haritadaki işarete tıklayın.'}
                </p>
                <div className="mt-2 flex flex-col gap-1 w-full">
                  {filtered.slice(0, 5).map((p) => (
                    <button
                      key={p.id}
                      onClick={() => setSelected(p)}
                      className="flex items-center gap-3 px-2 py-2 text-left hover:bg-surface transition-colors group rounded-sm"
                    >
                      <span className="w-2 h-2 rounded-full bg-gold shrink-0 group-hover:scale-125 transition-transform" />
                      <span className="text-sm text-muted group-hover:text-foreground transition-colors truncate">
                        {p.name}
                      </span>
                    </button>
                  ))}
                  {filtered.length > 5 && (
                    <p className="text-xs text-muted/50 pl-5 mt-1">
                      +{filtered.length - 5} {locale === 'en' ? 'more' : 'proje daha'}
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ─── Lightbox — z-[9999] ensures it renders above Leaflet panes ──────── */}
      {lightboxOpen && selected && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
          onClick={() => setLightboxOpen(false)}
        >
          <div
            className="relative max-w-2xl w-full aspect-video bg-surface border border-border overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={selected.image}
              alt={selected.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 672px"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
              <p
                className="text-white font-light"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                {selected.name}
              </p>
              <p className="text-[#C1A45D] text-sm">
                {selected.developer} — {selected.location}
              </p>
            </div>
            <button
              onClick={() => setLightboxOpen(false)}
              className="absolute top-3 right-3 w-9 h-9 flex items-center justify-center bg-black/50 hover:bg-black/80 text-white transition-colors"
              aria-label={t.close}
            >
              <X size={18} />
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
