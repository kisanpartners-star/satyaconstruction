import { useEffect, useMemo, useState, type FormEvent } from 'react';
import {
  ArrowDown,
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  Building2,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  CircleCheck,
  Compass,
  Hammer,
  Instagram,
  Layers3,
  Linkedin,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  Phone,
  Quote,
  Send,
  ShieldCheck,
  Sparkles,
  X,
  Youtube,
  type LucideIcon,
} from 'lucide-react';
import { chatReplies, faqs, insights, navItems, processSteps, services, stats } from '@/data/siteData';
import { architecturalImages, heroSlides } from '@/data/images';

type Service = (typeof services)[number];
type Accent = Service['accent'];

type IconButtonProps = {
  label: string;
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
};

const serviceIcons: Record<Service['visual'], LucideIcon> = {
  tower: Building2,
  villa: Compass,
  interior: Sparkles,
  renovation: Hammer,
  commercial: Layers3,
  care: ShieldCheck,
};

const accentClasses: Record<Accent, string> = {
  blue: 'bg-primary-700 text-white',
  orange: 'bg-accent-500 text-ink',
  teal: 'bg-secondary-500 text-white',
  gold: 'bg-accent-300 text-ink',
};

function LogoMark({ light = false }: { light?: boolean }) {
  return (
    <div className={`flex items-center gap-3 ${light ? 'text-white' : 'text-ink'}`} aria-label="Sathya Constructions">
      <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-white p-0.5 shadow-lg shadow-primary-700/20">
        <img src={`${import.meta.env.BASE_URL}assets/images/logo.jpeg`} alt="" className="h-full w-full object-contain" />
      </div>
      <div className="leading-none">
        <p className="font-display text-[13px] font-bold tracking-[0.18em]">SATHYA</p>
        <p className={`mt-1 text-[9px] font-semibold tracking-[0.15em] ${light ? 'text-white/75' : 'text-ink-soft'}`}>CONSTRUCTIONS</p>
      </div>
    </div>
  );
}

function Button({ children, variant = 'primary', href = '#contact', className = '' }: { children: React.ReactNode; variant?: 'primary' | 'light' | 'outline'; href?: string; className?: string }) {
  const styles = {
    primary: 'bg-primary-700 text-white shadow-lg shadow-primary-700/20 hover:bg-primary-900 hover:shadow-primary-700/30',
    light: 'bg-white text-primary-700 shadow-lg shadow-black/10 hover:bg-accent-50',
    outline: 'border border-ink/15 bg-white/40 text-ink hover:border-primary-500 hover:text-primary-700',
  };

  return (
    <a href={href} className={`group inline-flex min-h-12 items-center justify-center gap-3 rounded-full px-6 text-[11px] font-bold uppercase tracking-[0.16em] transition duration-300 hover:-translate-y-0.5 ${styles[variant]} ${className}`}>
      <span>{children}</span>
      <ArrowUpRight size={16} strokeWidth={1.8} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
    </a>
  );
}

function IconButton({ label, children, onClick, href }: IconButtonProps) {
  const shared = 'flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white transition hover:-translate-y-0.5 hover:bg-accent-500 hover:text-ink';
  if (href) {
    return <a className={shared} href={href} aria-label={label}>{children}</a>;
  }
  return <button className={shared} onClick={onClick} aria-label={label}>{children}</button>;
}

function SectionHeading({ eyebrow, title, copy, light = false, align = 'left' }: { eyebrow: string; title: React.ReactNode; copy?: string; light?: boolean; align?: 'left' | 'center' }) {
  return (
    <div className={`${align === 'center' ? 'mx-auto text-center' : ''} max-w-2xl`}>
      <p className={`mb-4 flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.25em] ${light ? 'text-accent-300' : 'text-primary-700'} ${align === 'center' ? 'justify-center' : ''}`}>
        <span className="h-px w-8 bg-current" />{eyebrow}
      </p>
      <h2 className={`font-display text-3xl font-semibold leading-[1.16] sm:text-4xl lg:text-[3.1rem] ${light ? 'text-white' : 'text-ink'}`}>{title}</h2>
      {copy && <p className={`mt-5 max-w-xl text-sm leading-7 ${light ? 'text-white/60' : 'text-ink-soft'} ${align === 'center' ? 'mx-auto' : ''}`}>{copy}</p>}
    </div>
  );
}

function ArchitecturalVisual({ variant = 'hero', className = '' }: { variant?: keyof typeof architecturalImages; className?: string }) {
  const image = architecturalImages[variant];
  return (
    <div className={`relative isolate overflow-hidden ${className}`}>
      <img src={image.src} alt={image.alt} loading={variant === 'hero' ? 'eager' : 'lazy'} decoding="async" className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/10 to-ink/10" />
    </div>
  );
}

function Preloader({ visible }: { visible: boolean }) {
  if (!visible) return null;
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-ink transition-opacity duration-700">
      <div className="text-center">
        <div className="mx-auto mb-8 w-fit animate-pulse"><LogoMark light /></div>
        <div className="mx-auto h-px w-32 overflow-hidden bg-white/15"><div className="h-full w-1/2 animate-loader bg-accent-500" /></div>
        <p className="mt-5 text-[9px] font-bold uppercase tracking-[0.35em] text-white/45">Building with intent</p>
      </div>
    </div>
  );
}

function App() {
  const [loading, setLoading] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const [activeHeroSlide, setActiveHeroSlide] = useState(0);
  const [heroPaused, setHeroPaused] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [activeFaq, setActiveFaq] = useState(0);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([{ from: 'assistant', text: 'Hello. How can we help shape your next space?' }]);
  const [chatInput, setChatInput] = useState('');
  const [formSent, setFormSent] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setLoading(false), 1300);
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  useEffect(() => {
    if (heroPaused || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const timer = window.setInterval(() => {
      setActiveHeroSlide((current) => (current + 1) % heroSlides.length);
    }, 6500);
    return () => window.clearInterval(timer);
  }, [heroPaused]);

  useEffect(() => {
    if (!menuOpen) return;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const testimonial = useMemo(() => [
    { quote: 'They made a complicated journey feel calm. The home is thoughtful in every corner and the quality is something we feel every day.', name: 'Ananya & Rohan', role: 'Homeowners, North Bengaluru' },
    { quote: 'There was complete clarity from the first meeting. Sathya delivered a space that feels considered, warm and exactly like us.', name: 'Priya Menon', role: 'Villa project, Yelahanka' },
    { quote: 'The team listens, solves quickly and cares about the last five percent. That is what made the difference for our studio.', name: 'Arjun Rao', role: 'Commercial interiors, Bengaluru' },
  ], []);

  const handleChatSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const question = chatInput.trim();
    if (!question) return;
    const lower = question.toLowerCase();
    const key = lower.includes('service') || lower.includes('build') ? 'services' : lower.includes('quote') || lower.includes('price') ? 'quote' : lower.includes('time') || lower.includes('long') ? 'timeline' : 'location';
    setChatMessages((messages) => [...messages, { from: 'user', text: question }, { from: 'assistant', text: chatReplies[key] }]);
    setChatInput('');
  };

  const handleContactSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormSent(true);
    event.currentTarget.reset();
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-paper text-ink selection:bg-accent-300 selection:text-ink">
      <Preloader visible={loading} />
      <div className="fixed left-0 top-0 z-[60] h-0.5 bg-gradient-to-r from-primary-700 via-secondary-500 to-accent-500" style={{ width: `${Math.min(100, (typeof window !== 'undefined' ? window.scrollY / Math.max(1, document.body.scrollHeight - window.innerHeight) : 0) * 100)}%` }} />

      <header className={`fixed left-0 right-0 top-0 z-50 transition-all duration-500 ${scrolled ? 'border-b border-ink/5 bg-white/85 shadow-sm backdrop-blur-xl' : 'bg-transparent'}`}>
        <div className="mx-auto flex h-[76px] max-w-[1440px] items-center justify-between px-5 sm:px-8 lg:px-12">
          <a href="#home" onClick={() => setMenuOpen(false)}><LogoMark light={!scrolled} /></a>
          <nav className={`hidden items-center gap-8 lg:flex ${scrolled ? 'text-ink' : 'text-white'}`}>
            {navItems.map((item) => <a key={item.href} href={item.href} className="group relative py-3 text-[10px] font-bold uppercase tracking-[0.18em] transition hover:text-primary-500"><span>{item.label}</span><span className="absolute bottom-0 left-0 h-px w-0 bg-accent-500 transition-all duration-300 group-hover:w-full" /></a>)}
          </nav>
          <div className="hidden items-center gap-5 lg:flex">
            <a href="tel:+919113264011" className={`text-[11px] font-bold tracking-wide transition ${scrolled ? 'text-ink-soft hover:text-primary-700' : 'text-white/70 hover:text-white'}`}>+91 91132 64011</a>
            <Button href="#contact" className="min-h-11 px-5 text-[10px]">Start a conversation</Button>
          </div>
          <button className={`flex h-11 w-11 items-center justify-center rounded-full lg:hidden ${scrolled ? 'bg-primary-50 text-ink' : 'bg-white/10 text-white'}`} onClick={() => setMenuOpen(true)} aria-label="Open menu"><Menu size={20} /></button>
        </div>
      </header>

      {menuOpen && <div className="fixed inset-0 z-[70] flex flex-col bg-ink p-6 text-white lg:hidden">
        <div className="flex items-center justify-between"><LogoMark light /><button className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10" onClick={() => setMenuOpen(false)} aria-label="Close menu"><X size={20} /></button></div>
        <nav className="mt-20 flex flex-col gap-7">{navItems.map((item, index) => <a key={item.href} href={item.href} onClick={() => setMenuOpen(false)} className="flex items-center justify-between border-b border-white/10 pb-5 font-display text-2xl"><span>0{index + 1} / {item.label}</span><ArrowUpRight size={20} className="text-accent-300" /></a>)}</nav>
        <div className="mt-auto border-t border-white/10 pt-6"><p className="text-xs text-white/45">Innovative solutions for stronger structures.</p><a href="tel:+919113264011" className="mt-3 block text-lg">+91 91132 64011</a></div>
      </div>}

      <main>
        <section
          id="home"
          className="relative flex min-h-[760px] items-end overflow-hidden bg-ink pb-16 pt-32 sm:min-h-screen lg:pb-24"
          onMouseEnter={() => setHeroPaused(true)}
          onMouseLeave={() => setHeroPaused(false)}
        >
          <div className="absolute inset-0">
            {heroSlides.map((slide, index) => (
              <img
                key={slide.src}
                src={slide.src}
                alt={index === activeHeroSlide ? slide.alt : ''}
                aria-hidden={index !== activeHeroSlide}
                loading={index < 2 ? 'eager' : 'lazy'}
                decoding="async"
                className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${index === activeHeroSlide ? 'animate-hero-zoom opacity-100' : 'scale-100 opacity-0'}`}
              />
            ))}
            <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/55 to-ink/15" />
            <div className="absolute inset-0 bg-primary-900/10" />
          </div>
          <div className="absolute left-6 top-1/2 hidden -translate-y-1/2 -rotate-90 items-center gap-3 text-[9px] font-bold uppercase tracking-[0.28em] text-white/45 lg:flex"><span className="h-px w-10 bg-white/30" /> Bengaluru / Est. 2014</div>
          <div className="relative mx-auto grid w-full max-w-[1440px] gap-12 px-5 sm:px-8 lg:grid-cols-[1.15fr_.85fr] lg:items-end lg:px-12">
            <div key={activeHeroSlide} className="max-w-3xl animate-hero-copy">
              <div className="mb-6 flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.28em] text-accent-300"><span className="h-px w-10 bg-accent-300" /> {heroSlides[activeHeroSlide].eyebrow}</div>
              <h1 className="font-display text-[clamp(2.85rem,7vw,6.7rem)] font-semibold leading-[1.02] tracking-[-0.04em] text-white">{heroSlides[activeHeroSlide].headline}<br /><span className="font-script font-normal tracking-normal text-accent-300">{heroSlides[activeHeroSlide].highlight}</span></h1>
              <p className="mt-5 text-[10px] font-bold uppercase tracking-[0.2em] text-white/80 sm:text-xs">Quality Construction <span className="px-1 text-accent-300">|</span> Modern Designs <span className="px-1 text-accent-300">|</span> Reliable Execution</p>
              <p className="mt-5 max-w-lg text-sm leading-7 text-white/75 sm:text-base">{heroSlides[activeHeroSlide].description}</p>
              <div className="mt-9 flex flex-wrap gap-3"><Button href="#contact" variant="light">Get a Free Quote</Button><Button href="#services" variant="outline" className="border-white/30 bg-white/5 text-white hover:border-accent-300 hover:bg-white/10 hover:text-white">View Services</Button></div>
              <div className="mt-8 flex items-center gap-2" aria-label="Hero slider controls">
                <button onClick={() => setActiveHeroSlide((activeHeroSlide - 1 + heroSlides.length) % heroSlides.length)} className="flex h-11 w-11 items-center justify-center rounded-full border border-white/25 text-white transition hover:border-accent-300 hover:text-accent-300" aria-label="Previous hero slide"><ChevronLeft size={18} /></button>
                {heroSlides.map((slide, index) => (
                  <button
                    key={slide.src}
                    onClick={() => setActiveHeroSlide(index)}
                    className={`h-1.5 rounded-full transition-all duration-300 ${index === activeHeroSlide ? 'w-10 bg-accent-300' : 'w-5 bg-white/45 hover:bg-white/80'}`}
                    aria-label={`Show slide ${index + 1}: ${slide.eyebrow}`}
                    aria-pressed={index === activeHeroSlide}
                  />
                ))}
                <button onClick={() => setActiveHeroSlide((activeHeroSlide + 1) % heroSlides.length)} className="flex h-11 w-11 items-center justify-center rounded-full border border-white/25 text-white transition hover:border-accent-300 hover:text-accent-300" aria-label="Next hero slide"><ChevronRight size={18} /></button>
              </div>
            </div>
            <div className="hidden justify-end lg:flex"><div className="w-64 border-l border-white/25 pl-8 text-white/65"><p className="font-display text-4xl text-white">{String(activeHeroSlide + 1).padStart(2, '0')}<span className="text-accent-300">—</span>{String(heroSlides.length).padStart(2, '0')}</p><p className="mt-4 text-[10px] font-bold uppercase tracking-[0.2em] text-white/65">{heroSlides[activeHeroSlide].caption}</p><div className="mt-8 h-px w-full bg-white/20" role="progressbar" aria-label="Hero slide progress" aria-valuemin={1} aria-valuemax={heroSlides.length} aria-valuenow={activeHeroSlide + 1}><div className="h-px bg-accent-300 transition-all duration-700" style={{ width: `${((activeHeroSlide + 1) / heroSlides.length) * 100}%` }} /></div><p className="mt-3 flex items-center justify-between text-[10px] uppercase tracking-widest"><span>Scroll to explore</span><ArrowDown size={14} /></p></div></div>
          </div>
        </section>

        <section className="border-b border-ink/5 bg-white py-8"><div className="mx-auto grid max-w-[1440px] grid-cols-2 gap-y-7 px-5 sm:grid-cols-4 sm:px-8 lg:px-12">{stats.map((stat) => <div key={stat.label} className="border-ink/10 first:border-0 sm:border-l sm:pl-8"><p className="font-display text-3xl text-primary-700 sm:text-4xl">{stat.value}</p><p className="mt-1 text-[10px] font-bold uppercase tracking-[0.18em] text-ink-soft">{stat.label}</p></div>)}</div></section>

        <section id="story" className="bg-white py-24 sm:py-32"><div className="mx-auto grid max-w-[1440px] gap-14 px-5 sm:px-8 lg:grid-cols-[.8fr_1.2fr] lg:gap-24 lg:px-12"><div><SectionHeading eyebrow="Welcome" title={<>Welcome to Sathya <span className="font-script font-normal text-primary-700">Constructions.</span></>} copy="Sathya Constructions is committed to delivering quality construction solutions with a focus on customer satisfaction, modern architecture and reliable execution. Our goal is to create durable, functional and beautiful spaces that meet our customers' expectations." /><div className="mt-8 border-l-2 border-accent-500 pl-4"><p className="text-[10px] font-bold uppercase tracking-[0.18em] text-primary-700">Proprietor</p><p className="mt-1 font-display text-lg text-ink">K. Vijaya Ganesh</p></div></div><div className="grid gap-5 sm:grid-cols-[.82fr_1.18fr] sm:items-end"><div className="group overflow-hidden rounded-[2rem] bg-primary-700"><ArchitecturalVisual variant="interior" className="aspect-[.78] transition duration-700 group-hover:scale-105" /><div className="p-5"><p className="text-[10px] font-bold uppercase tracking-[0.18em] text-ink-soft">01 / Design</p><p className="mt-2 font-display text-lg text-ink">Homes that hold a feeling.</p></div></div><div className="group overflow-hidden rounded-[2rem] bg-ink"><ArchitecturalVisual variant="villa" className="aspect-[1.18] transition duration-700 group-hover:scale-105" /><div className="p-5"><p className="text-[10px] font-bold uppercase tracking-[0.18em] text-ink-soft">02 / Craft</p><p className="mt-2 font-display text-lg text-ink">Details that earn their place.</p></div></div></div></div></section>

        <section id="services" className="bg-paper py-24 sm:py-32"><div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12"><div className="flex flex-col justify-between gap-8 md:flex-row md:items-end"><SectionHeading eyebrow="What we do" title={<>One team. <span className="font-script font-normal text-primary-700">Many possibilities.</span></>} copy="From a first conversation to the final key, we bring clarity and care to every layer of the build." /><p className="max-w-xs text-right text-xs leading-6 text-ink-soft">Tap a discipline to see<br />how we can help.</p></div><div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{services.map((service) => { const Icon = serviceIcons[service.visual]; return <button key={service.number} onClick={() => setSelectedService(service)} className="group relative min-h-[290px] overflow-hidden rounded-[1.5rem] bg-white text-left shadow-card transition duration-500 hover:-translate-y-1 hover:shadow-soft"><ArchitecturalVisual variant={service.visual} className="absolute inset-0 opacity-100 transition duration-500 group-hover:scale-105" /><div className="relative flex h-full min-h-[290px] flex-col justify-between p-6"><div className="flex items-start justify-between"><span className={`flex h-10 w-10 items-center justify-center rounded-xl ${accentClasses[service.accent]}`}><Icon size={19} strokeWidth={1.6} /></span><span className="font-display text-3xl text-white/60">{service.number}</span></div><div><p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/70">Sathya / {service.number}</p><h3 className="mt-3 font-display text-xl text-white">{service.title}</h3><p className="mt-2 max-w-xs text-xs leading-6 text-white/80">{service.description}</p><span className="mt-5 inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.18em] text-accent-300">Explore <ArrowUpRight size={14} /></span></div></div></button>; })}</div></div></section>

        <section className="relative overflow-hidden bg-ink py-24 sm:py-32"><div className="absolute right-0 top-0 h-full w-1/3 bg-primary-700/20" /><div className="relative mx-auto grid max-w-[1440px] gap-14 px-5 sm:px-8 lg:grid-cols-[.8fr_1.2fr] lg:items-center lg:px-12"><div><SectionHeading eyebrow="How we work" light title={<>Make space for <span className="font-script font-normal text-accent-300">better.</span></>} copy="A measured process creates room for better thinking, better decisions and a better result." /><div className="mt-10 flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.2em] text-white/40"><span className="h-px w-12 bg-accent-300" /> No shortcuts. No surprises.</div></div><div className="grid gap-0">{processSteps.map((step, index) => <div key={step.number} className="group grid grid-cols-[56px_1fr] gap-5 border-b border-white/10 py-6 first:pt-0 last:border-0"><div className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 font-display text-sm text-accent-300 transition group-hover:border-accent-300 group-hover:bg-accent-300 group-hover:text-ink">{step.number}</div><div><div className="flex items-center justify-between"><h3 className="font-display text-xl text-white">{step.title}</h3>{index < processSteps.length - 1 && <ArrowDownRight size={16} className="text-white/20" />}</div><p className="mt-2 max-w-md text-sm leading-6 text-white/50">{step.text}</p></div></div>)}</div></div></section>

        <section className="bg-white py-24 sm:py-32"><div className="mx-auto grid max-w-[1440px] gap-12 px-5 sm:px-8 lg:grid-cols-[.7fr_1.3fr] lg:items-end lg:px-12"><div><SectionHeading eyebrow="Client voices" title={<>Made to be <span className="font-script font-normal text-primary-700">lived in.</span></>} /><div className="mt-8 flex gap-2"><button onClick={() => setActiveTestimonial((activeTestimonial - 1 + testimonial.length) % testimonial.length)} className="flex h-11 w-11 items-center justify-center rounded-full border border-ink/10 transition hover:border-primary-700 hover:text-primary-700" aria-label="Previous testimonial"><ChevronLeft size={17} /></button><button onClick={() => setActiveTestimonial((activeTestimonial + 1) % testimonial.length)} className="flex h-11 w-11 items-center justify-center rounded-full border border-ink/10 transition hover:border-primary-700 hover:text-primary-700" aria-label="Next testimonial"><ChevronRight size={17} /></button></div></div><div className="relative rounded-[2rem] bg-paper p-8 sm:p-12"><Quote className="absolute right-10 top-10 text-primary-100" size={74} strokeWidth={1} /><div className="relative"><p className="max-w-2xl font-display text-2xl leading-[1.35] text-ink sm:text-3xl">“{testimonial[activeTestimonial].quote}”</p><div className="mt-8 flex items-center justify-between gap-5 border-t border-ink/10 pt-6"><div><p className="text-sm font-bold">{testimonial[activeTestimonial].name}</p><p className="mt-1 text-xs text-ink-soft">{testimonial[activeTestimonial].role}</p></div><div className="flex gap-1">{testimonial.map((_, index) => <span key={index} className={`h-1 w-6 rounded-full ${index === activeTestimonial ? 'bg-accent-500' : 'bg-ink/15'}`} />)}</div></div></div></div></div></section>

        <section className="bg-white pb-24 sm:pb-32"><div className="mx-auto grid max-w-[1440px] gap-12 px-5 sm:px-8 lg:grid-cols-[.7fr_1.3fr] lg:px-12"><SectionHeading eyebrow="Good to know" title={<>A few things, <span className="font-script font-normal text-primary-700">answered.</span></>} copy="The practical details, made simple." /><div className="divide-y divide-ink/10">{faqs.map((faq, index) => <div key={faq.question}><button onClick={() => setActiveFaq(activeFaq === index ? -1 : index)} className="flex w-full items-center justify-between gap-5 py-5 text-left" aria-expanded={activeFaq === index}><span className="flex items-center gap-4 font-display text-lg"><span className="text-xs text-primary-700">0{index + 1}</span>{faq.question}</span><ChevronDown size={18} className={`shrink-0 text-primary-700 transition-transform ${activeFaq === index ? 'rotate-180' : ''}`} /></button><div className={`grid transition-all duration-300 ${activeFaq === index ? 'grid-rows-[1fr] pb-5 opacity-100' : 'grid-rows-[0fr] opacity-0'}`}><div className="overflow-hidden pl-10 text-sm leading-7 text-ink-soft"><div className="flex gap-3"><Check size={17} className="mt-1 shrink-0 text-success" />{faq.answer}</div></div></div></div>)}</div></div></section>

        <section id="insights" className="bg-paper py-24 sm:py-32"><div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12"><div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end"><SectionHeading eyebrow="The journal" title={<>Notes on the <span className="font-script font-normal text-primary-700">everyday.</span></>} copy="Ideas, materials and quiet observations from the world of building well." /><a href="#contact" className="group inline-flex items-center gap-2 pb-1 text-[10px] font-bold uppercase tracking-[0.2em] text-primary-700">View all notes <ArrowRight size={15} className="transition group-hover:translate-x-1" /></a></div><div className="mt-14 grid gap-5 lg:grid-cols-3">{insights.map((insight) => <article key={insight.title} className="group"><div className="overflow-hidden rounded-[1.5rem] bg-white"><ArchitecturalVisual variant={insight.visual} className="aspect-[1.45] transition duration-700 group-hover:scale-105" /></div><div className="mt-5 flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.15em] text-primary-700"><span>{insight.category}</span><span className="h-1 w-1 rounded-full bg-accent-500" /><span className="text-ink-soft">{insight.date}</span></div><h3 className="mt-3 max-w-sm font-display text-xl leading-snug transition group-hover:text-primary-700">{insight.title}</h3><p className="mt-3 text-xs font-bold uppercase tracking-[0.14em] text-ink-soft">{insight.read}</p></article>)}</div></div></section>

        <section id="contact" className="relative overflow-hidden bg-primary-700 py-24 sm:py-32"><div className="absolute right-[-10%] top-[-30%] h-[600px] w-[600px] rounded-full border border-white/10" /><div className="absolute bottom-[-40%] left-[-10%] h-[600px] w-[600px] rounded-full border border-white/10" /><div className="relative mx-auto grid max-w-[1440px] gap-14 px-5 sm:px-8 lg:grid-cols-[.8fr_1.2fr] lg:px-12"><div><SectionHeading eyebrow="Your next chapter" light title={<>Let's Build Your <span className="font-script font-normal text-accent-300">Dream Together.</span></>} copy="Tell us a little about what you are imagining. We will bring the right people into the conversation." /><div className="mt-12 space-y-5 text-sm text-white/70"><a href="tel:+919113264011" className="flex items-center gap-4 transition hover:text-white"><span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15"><Phone size={16} /></span>+91 91132 64011</a><a href="mailto:kvijayaganesh1@gmail.com" className="flex items-center gap-4 transition hover:text-white"><span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15"><Mail size={16} /></span>kvijayaganesh1@gmail.com</a><div className="flex items-start gap-4"><span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/15"><MapPin size={16} /></span><span>#44, Muneeshwara Layout, Opp. Reva College,<br />Kattigenahalli, Yelahanka, Bangalore – 560064</span></div></div></div><form onSubmit={handleContactSubmit} className="rounded-[2rem] bg-white p-6 shadow-2xl sm:p-10"><div className="grid gap-5 sm:grid-cols-2"><label className="text-[10px] font-bold uppercase tracking-[0.18em] text-ink-soft">Your name<input name="name" required placeholder="K. Vijaya Ganesh" className="mt-3 w-full border-b border-ink/15 bg-transparent pb-3 text-sm font-normal tracking-normal text-ink outline-none transition placeholder:text-ink/30 focus:border-primary-700" /></label><label className="text-[10px] font-bold uppercase tracking-[0.18em] text-ink-soft">Phone number<input name="phone" required placeholder="+91 00000 00000" className="mt-3 w-full border-b border-ink/15 bg-transparent pb-3 text-sm font-normal tracking-normal text-ink outline-none transition placeholder:text-ink/30 focus:border-primary-700" /></label><label className="text-[10px] font-bold uppercase tracking-[0.18em] text-ink-soft">Email address<input type="email" name="email" required placeholder="you@example.com" className="mt-3 w-full border-b border-ink/15 bg-transparent pb-3 text-sm font-normal tracking-normal text-ink outline-none transition placeholder:text-ink/30 focus:border-primary-700" /></label><label className="text-[10px] font-bold uppercase tracking-[0.18em] text-ink-soft">Project type<select name="project" className="mt-3 w-full border-b border-ink/15 bg-transparent pb-3 text-sm font-normal tracking-normal text-ink outline-none focus:border-primary-700"><option>New home</option><option>Villa</option><option>Interior</option><option>Renovation</option><option>Commercial</option></select></label></div><label className="mt-8 block text-[10px] font-bold uppercase tracking-[0.18em] text-ink-soft">Tell us about the idea<textarea name="message" required rows={3} placeholder="A few words about your project, site or timeline..." className="mt-3 w-full resize-none border-b border-ink/15 bg-transparent pb-3 text-sm font-normal tracking-normal text-ink outline-none transition placeholder:text-ink/30 focus:border-primary-700" /></label><div className="mt-8 flex flex-wrap items-center justify-between gap-4"><p className={`text-xs ${formSent ? 'text-success' : 'text-ink-soft'}`}>{formSent ? 'Thank you. We will be in touch shortly.' : 'We reply within one working day.'}</p><button type="submit" className="group inline-flex min-h-12 items-center gap-3 rounded-full bg-primary-700 px-6 text-[10px] font-bold uppercase tracking-[0.18em] text-white transition hover:bg-ink">{formSent ? 'Message sent' : 'Send enquiry'}<Send size={15} className="transition group-hover:translate-x-1" /></button></div></form></div></section>
      </main>

      <footer className="bg-ink text-white"><div className="mx-auto max-w-[1440px] px-5 py-14 sm:px-8 lg:px-12"><div className="grid gap-12 border-b border-white/10 pb-12 sm:grid-cols-2 lg:grid-cols-[1.5fr_.7fr_.7fr_.8fr]"><div><LogoMark light /><p className="mt-6 max-w-xs text-sm leading-7 text-white/45">Innovative solutions for stronger structures. Designed for the way life unfolds.</p><div className="mt-6 flex gap-2"><IconButton label="Instagram" href="#contact"><Instagram size={16} /></IconButton><IconButton label="LinkedIn" href="#contact"><Linkedin size={16} /></IconButton><IconButton label="YouTube" href="#contact"><Youtube size={16} /></IconButton></div></div><div><p className="text-[10px] font-bold uppercase tracking-[0.2em] text-accent-300">Explore</p><div className="mt-5 flex flex-col gap-3">{navItems.map((item) => <a key={item.href} href={item.href} className="w-fit text-sm text-white/50 transition hover:text-white">{item.label}</a>)}</div></div><div><p className="text-[10px] font-bold uppercase tracking-[0.2em] text-accent-300">Services</p><div className="mt-5 flex flex-col gap-3"><span className="text-sm text-white/50">Turnkey homes</span><span className="text-sm text-white/50">Modern villas</span><span className="text-sm text-white/50">Interior craft</span><span className="text-sm text-white/50">Project care</span></div></div><div><p className="text-[10px] font-bold uppercase tracking-[0.2em] text-accent-300">Start a conversation</p><a href="mailto:kvijayaganesh1@gmail.com" className="mt-5 block text-sm text-white/50 transition hover:text-white">kvijayaganesh1@gmail.com</a><a href="tel:+919113264011" className="mt-3 block text-sm text-white/50 transition hover:text-white">+91 91132 64011</a><a href="#contact" className="mt-6 inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.16em] text-white">Get directions <ArrowUpRight size={14} className="text-accent-300" /></a></div></div><div className="flex flex-col justify-between gap-4 pt-6 text-[10px] uppercase tracking-[0.15em] text-white/35 sm:flex-row"><span>© 2026 Sathya Constructions. All rights reserved.</span><span>Built with intent in Bengaluru.</span></div></div></footer>

      <div className="fixed bottom-5 left-4 z-40 flex flex-col gap-2">
        <IconButton label="WhatsApp Sathya Constructions" href="https://wa.me/919113264011?text=Hello%20Sathya%20Constructions%2C%20I%20would%20like%20to%20discuss%20a%20project."><MessageCircle size={18} /></IconButton>
        <IconButton label="Call Sathya Constructions" href="tel:+919113264011"><Phone size={17} /></IconButton>
        <IconButton label="Email Sathya Constructions" href="mailto:kvijayaganesh1@gmail.com"><Mail size={17} /></IconButton>
      </div>
      <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-3"><div className={`w-[min(350px,calc(100vw-2rem))] origin-bottom-right overflow-hidden rounded-[1.5rem] bg-white shadow-2xl transition duration-300 ${chatOpen ? 'scale-100 opacity-100' : 'pointer-events-none scale-90 opacity-0'}`}><div className="flex items-center justify-between bg-ink px-5 py-4 text-white"><div><p className="text-[10px] font-bold uppercase tracking-[0.18em] text-accent-300">Your assistance</p><p className="mt-1 text-sm text-white/60">Ask us anything about your build.</p></div><button onClick={() => setChatOpen(false)} aria-label="Close assistant"><X size={17} /></button></div><div className="max-h-64 space-y-3 overflow-y-auto p-4">{chatMessages.map((message, index) => <div key={`${message.text}-${index}`} className={`flex ${message.from === 'user' ? 'justify-end' : 'justify-start'}`}><p className={`max-w-[85%] rounded-2xl px-3 py-2 text-xs leading-5 ${message.from === 'user' ? 'bg-primary-700 text-white' : 'bg-paper text-ink-soft'}`}>{message.text}</p></div>)}</div><div className="flex gap-2 overflow-x-auto px-4 pb-3"><button onClick={() => setChatInput('What services do you offer?')} className="shrink-0 rounded-full border border-ink/10 px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-ink-soft">Services</button><button onClick={() => setChatInput('How do I get a quote?')} className="shrink-0 rounded-full border border-ink/10 px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-ink-soft">Get a quote</button><button onClick={() => setChatInput('How long does it take?')} className="shrink-0 rounded-full border border-ink/10 px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-ink-soft">Timeline</button></div><form onSubmit={handleChatSubmit} className="flex gap-2 border-t border-ink/5 p-3"><input value={chatInput} onChange={(event) => setChatInput(event.target.value)} placeholder="Type your question..." className="min-w-0 flex-1 bg-paper px-3 py-2 text-xs outline-none" /><button className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary-700 text-white" aria-label="Send message"><ArrowUpRight size={15} /></button></form></div><button onClick={() => setChatOpen(!chatOpen)} className="group flex items-center gap-3 rounded-full bg-accent-500 py-3 pl-4 pr-3 text-[10px] font-bold uppercase tracking-[0.18em] text-ink shadow-xl shadow-accent-500/25 transition hover:-translate-y-1"><span>{chatOpen ? 'Close' : 'Your assistance'}</span><span className="flex h-8 w-8 items-center justify-center rounded-full bg-ink text-white">{chatOpen ? <X size={15} /> : <MessageCircle size={15} />}</span></button></div>

      {selectedService && <div className="fixed inset-0 z-[80] flex items-center justify-center bg-ink/70 p-5 backdrop-blur-sm" onClick={() => setSelectedService(null)}><div className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-[2rem] bg-white" onClick={(event) => event.stopPropagation()}><button onClick={() => setSelectedService(null)} className="absolute right-5 top-5 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/80 text-ink shadow-lg" aria-label="Close service details"><X size={18} /></button><ArchitecturalVisual variant={selectedService.visual} className="h-56 sm:h-72" /><div className="p-7 sm:p-10"><p className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary-700">Sathya / {selectedService.number}</p><h2 className="mt-3 font-display text-3xl text-ink">{selectedService.title}</h2><p className="mt-5 max-w-lg text-sm leading-7 text-ink-soft">{selectedService.detail}</p><div className="mt-8 grid gap-3 sm:grid-cols-2"><div className="flex items-center gap-3 text-sm text-ink-soft"><CircleCheck size={17} className="text-success" /> Clear scope and budget</div><div className="flex items-center gap-3 text-sm text-ink-soft"><CircleCheck size={17} className="text-success" /> Senior project oversight</div><div className="flex items-center gap-3 text-sm text-ink-soft"><CircleCheck size={17} className="text-success" /> Material guidance</div><div className="flex items-center gap-3 text-sm text-ink-soft"><CircleCheck size={17} className="text-success" /> Thoughtful handover</div></div><Button href="#contact" className="mt-8" >Talk about this service</Button></div></div></div>}
    </div>
  );
}

export default App;
