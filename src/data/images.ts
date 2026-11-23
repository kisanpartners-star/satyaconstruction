const photo = (id: string, width: number, quality = 85) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=${quality}`;

export const heroSlides = [
  {
    src: photo('photo-1600585154340-be6161a56a0c', 2000, 82),
    alt: 'Contemporary home exterior with garden and warm evening light',
    eyebrow: 'Independent builders / Bengaluru',
    headline: 'Building Your Dreams.',
    highlight: 'Creating Your Future.',
    description: 'We turn your construction ideas into reality through quality workmanship, innovative designs and professional project execution.',
    caption: 'Quality built around your vision',
  },
  {
    src: photo('photo-1600607687920-4e2a09cf159d', 2000, 82),
    alt: 'Architect-designed modern villa with a pool and landscaped grounds',
    eyebrow: 'Modern architecture / Thoughtful detail',
    headline: 'Thoughtful design.',
    highlight: 'Lasting homes.',
    description: 'From the first plan to the final finish, every choice is guided by quality, clarity and care.',
    caption: 'Spaces made to feel like yours',
  },
  {
    src: photo('photo-1600210492486-724fe5c67fb0', 2000, 82),
    alt: 'Photoreal contemporary living room with refined materials and natural light',
    eyebrow: 'Considered interiors / Everyday comfort',
    headline: 'Modern living.',
    highlight: 'Beautifully built.',
    description: 'Bring your ideas to life with refined architecture, reliable execution and details made to last.',
    caption: 'A better way to build',
  },
  {
    src: photo('photo-1600566753086-00f18fb6b3ea', 2000, 82),
    alt: 'Bright, contemporary home interior with warm natural finishes',
    eyebrow: 'Quality construction / Trusted execution',
    headline: 'Your vision.',
    highlight: 'Our craftsmanship.',
    description: 'Homes and spaces shaped around you, delivered by a team that takes care at every step.',
    caption: 'From first sketch to final key',
  },
] as const;

export const architecturalImages = {
  hero: {
    src: photo('photo-1600585154340-be6161a56a0c', 2400),
    alt: 'Contemporary home with a landscaped garden at golden hour',
  },
  tower: {
    src: photo('photo-1486406146926-c627a92ad1ab', 1200),
    alt: 'Modern glass commercial building viewed from below',
  },
  villa: {
    src: photo('photo-1600607687920-4e2a09cf159d', 1200),
    alt: 'Modern villa with warm lighting and a landscaped exterior',
  },
  interior: {
    src: photo('photo-1600210492486-724fe5c67fb0', 1200),
    alt: 'Warm, contemporary living room with considered finishes',
  },
  renovation: {
    src: photo('photo-1503387762-592deb58ef4e', 1200),
    alt: 'Architectural drawings and materials arranged for a building project',
  },
  commercial: {
    src: photo('photo-1497366811353-6870744d04b2', 1200),
    alt: 'Bright, modern commercial workspace',
  },
  care: {
    src: photo('photo-1504307651254-35680f356dfd', 1200),
    alt: 'Construction professionals working carefully on site',
  },
  light: {
    src: photo('photo-1600566753086-00f18fb6b3ea', 1200),
    alt: 'Sunlit modern home interior with natural materials',
  },
  stone: {
    src: photo('photo-1618221195710-dd6b41faaea6', 1200),
    alt: 'Refined interior details in a contemporary home',
  },
  plan: {
    src: photo('photo-1503387762-592deb58ef4e', 1200),
    alt: 'Architectural plans prepared for a construction project',
  },
} as const;
