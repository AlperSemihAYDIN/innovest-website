export interface Builder {
  name: string;
  logo: string;
  alt: string;
  /** Per-logo height override in px. Defaults to CSS base (80px mobile / 96px desktop). */
  height?: number;
}

export const LONDON_BUILDERS: Builder[] = [
  { name: 'Ballymore', logo: '/builders/london/ballymore.png', alt: 'Ballymore' },
  { name: 'Barratt London', logo: '/builders/london/barratt.jpg', alt: 'Barratt London' },
  { name: 'Berkeley', logo: '/builders/london/berkeley.png', alt: 'Berkeley Group' },
  { name: 'FEC', logo: '/builders/london/fec.jpg', alt: 'Far East Consortium' },
  { name: 'Fenton', logo: '/builders/london/fenton.jpg', alt: 'Fenton' },
  { name: 'Hill', logo: '/builders/london/hill.png', alt: 'Hill' },
  { name: 'Knight Dragon', logo: '/builders/london/knight-dragon.jpg', alt: 'Knight Dragon', height: 130 },
  { name: 'London Square', logo: '/builders/london/london-square.jpg', alt: 'London Square', height: 120 },
];

export const DUBAI_BUILDERS: Builder[] = [
  { name: 'Aldar', logo: '/builders/dubai/aldar.svg', alt: 'Aldar' },
  { name: 'Binghatti', logo: '/builders/dubai/binghatti.png', alt: 'Binghatti', height: 130 },
  { name: 'DAMAC', logo: '/builders/dubai/damac.jpg', alt: 'DAMAC' },
  { name: 'Ellington', logo: '/builders/dubai/ellington.png', alt: 'Ellington Properties' },
  { name: 'Emaar', logo: '/builders/dubai/emaar.png', alt: 'Emaar' },
  { name: 'Nakheel', logo: '/builders/dubai/nakheel.png', alt: 'Nakheel' },
  { name: 'Omniyat', logo: '/builders/dubai/omniyat.jpg', alt: 'Omniyat' },
];

export const ALL_BUILDERS: Builder[] = [...LONDON_BUILDERS, ...DUBAI_BUILDERS];
