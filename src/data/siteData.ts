export const navItems = [
  { label: 'Home', href: '#home' },
  { label: 'Services', href: '#services' },
  { label: 'Our story', href: '#story' },
  { label: 'Insights', href: '#insights' },
  { label: 'Contact', href: '#contact' },
] as const;

export const stats = [
  { value: '12+', label: 'Years of craft' },
  { value: '86', label: 'Projects delivered' },
  { value: '98%', label: 'Client referrals' },
  { value: '24/7', label: 'Project care' },
] as const;

export const services = [
  {
    number: '01',
    title: 'Turnkey homes',
    description: 'From first sketch to final handover, every detail works as one considered whole.',
    detail: 'A calm, accountable building experience for homes that feel unmistakably yours.',
    accent: 'blue',
    visual: 'tower',
  },
  {
    number: '02',
    title: 'Modern villas',
    description: 'Distinctive architecture, refined materials and light-filled spaces built to last.',
    detail: 'Composed villas for contemporary families who care about both beauty and longevity.',
    accent: 'orange',
    visual: 'villa',
  },
  {
    number: '03',
    title: 'Interior craft',
    description: 'Layered, tactile interiors that make everyday rituals feel quietly exceptional.',
    detail: 'Material-led interiors with a focus on natural light, proportion and lasting comfort.',
    accent: 'teal',
    visual: 'interior',
  },
  {
    number: '04',
    title: 'Renovation',
    description: 'Thoughtful transformations that respect what is there and reveal what can be.',
    detail: 'Sensitive upgrades that make existing spaces work harder without losing their soul.',
    accent: 'gold',
    visual: 'renovation',
  },
  {
    number: '05',
    title: 'Commercial spaces',
    description: 'High-performing environments that express the ambition behind your business.',
    detail: 'Workplaces and commercial spaces that align operational clarity with strong identity.',
    accent: 'blue',
    visual: 'commercial',
  },
  {
    number: '06',
    title: 'Project care',
    description: 'Clear communication, rigorous supervision and a finish you can feel proud of.',
    detail: 'A single trusted partner keeping budget, quality and timeline in perfect view.',
    accent: 'orange',
    visual: 'care',
  },
] as const;

export const processSteps = [
  { number: '01', title: 'Listen', text: 'We begin with your brief, your site and the way you want to live.' },
  { number: '02', title: 'Shape', text: 'Ideas become clear plans, honest budgets and a shared direction.' },
  { number: '03', title: 'Build', text: 'Our people bring precision, care and quiet problem-solving to every day.' },
  { number: '04', title: 'Belong', text: 'You move into a space made to hold your life for years to come.' },
] as const;

export const insights = [
  { category: 'Journal', date: '18.04.26', title: 'The quiet power of a well-planned home', read: '5 min read', visual: 'light' },
  { category: 'Materials', date: '03.04.26', title: 'Choosing finishes that grow more beautiful', read: '4 min read', visual: 'stone' },
  { category: 'Perspective', date: '21.03.26', title: 'Why every good build begins with listening', read: '6 min read', visual: 'plan' },
] as const;

export const faqs = [
  { question: 'What kind of projects do you take on?', answer: 'We work across bespoke homes, villas, interiors, renovations and considered commercial spaces in Bengaluru and beyond.' },
  { question: 'How early should we involve Sathya Constructions?', answer: 'The earlier the better. Bringing us in during the idea stage helps align design, material choices, budget and buildability from the beginning.' },
  { question: 'How do you keep projects on track?', answer: 'One point of contact, clear milestones and regular site updates keep every decision visible and every phase moving with confidence.' },
] as const;

export const chatReplies: Record<string, string> = {
  services: 'We create turnkey homes, villas, interiors, renovations and commercial spaces with one accountable team.',
  quote: 'Share a few details through the enquiry form and K. Vijaya Ganesh will get back to you personally.',
  timeline: 'Most bespoke homes take 10–18 months, depending on scope, approvals and the level of finish you choose.',
  location: 'Our studio is at #44, Muneeshwara Layout, Opp. Reva College, Kattigenahalli, Yelahanka, Bangalore – 560064.',
};
