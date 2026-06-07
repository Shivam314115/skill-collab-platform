import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowRight,
  Bot,
  Github,
  Instagram,
  Laptop,
  Linkedin,
  Lock,
  Network,
  Rocket,
  ShieldCheck,
  Users,
} from 'lucide-react';
import { AtlasButton, AtlasCard, BrandLockup, PatternArt } from '../components/common/AgileUI';

const processCards = [
  {
    icon: Bot,
    title: 'AI matching',
    copy: 'Surface teammates with the skills your sprint needs.',
    tone: 'bg-[#2f7b5e]',
  },
  {
    icon: Network,
    title: 'connect',
    copy: 'Collaborate with verified professionals without noise.',
    tone: 'bg-[#3fbe8c]',
    active: true,
  },
  {
    icon: Rocket,
    title: 'launch',
    copy: 'Turn side projects into real-world products faster.',
    tone: 'bg-[#2d6b55]',
  },
];

const steps = [
  { icon: Laptop, title: 'create a new project', bg: 'bg-[#192332]' },
  { icon: Users, title: 'collaborate', bg: 'bg-[#8a2f6d]' },
  { icon: Rocket, title: 'Build', bg: 'bg-[#d8d8d8]', dark: true },
];

const features = [
  {
    title: 'Community Driven',
    copy: 'Ship with developers, designers, and builders matched around shared outcomes.',
    visual: 'brand',
  },
  {
    title: 'Hire freelancers',
    copy: 'Find makers with verified skill trails and project-ready profiles.',
    visual: 'screen',
  },
  {
    title: 'Secure & Private',
    copy: 'Your data and projects are protected with workspace-first privacy.',
    visual: 'security',
  },
];

function FeatureVisual({ type }) {
  if (type === 'brand') {
    return (
      <div className="flex h-28 items-center justify-center rounded-xl bg-[#111]">
        <BrandLockup size="sm" to={null} />
      </div>
    );
  }

  if (type === 'screen') {
    return (
      <div className="relative h-28 overflow-hidden rounded-xl bg-[#22182a]">
        <div className="absolute bottom-3 left-4 h-14 w-16 rounded bg-[#a4b8a5] shadow-2xl" />
        <div className="absolute bottom-6 left-7 h-7 w-10 rounded-sm bg-[#1d2b25]" />
        <div className="absolute bottom-0 right-7 h-20 w-14 rounded-t-full bg-[#121212]" />
        <div className="absolute right-4 top-4 h-10 w-10 rounded-full bg-[#eec0c3]/70" />
      </div>
    );
  }

  return (
    <div className="relative flex h-28 items-center justify-center overflow-hidden rounded-xl bg-[#4f0010]">
      <div className="grid grid-cols-5 gap-2 opacity-80">
        {Array.from({ length: 25 }).map((_, index) => (
          <span key={index} className="h-2 w-2 rounded-full bg-[#3fbe8c]" />
        ))}
      </div>
    </div>
  );
}

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <main className="min-h-screen bg-[#1f1f1f] text-white">
      <header className="sticky top-0 z-30 border-b border-white/10 bg-[#1f1f1f]/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
          <BrandLockup size="sm" />
          <nav className="hidden items-center gap-8 text-xs font-bold text-[#d6d6d6] md:flex">
            <a href="#reviews" className="transition hover:text-white">Reviews</a>
            <a href="#discover" className="transition hover:text-white">Discover</a>
            <a href="#about" className="transition hover:text-white">About</a>
          </nav>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => navigate('/login')}
              className="hidden rounded-lg px-3 py-2 text-xs font-bold text-white transition hover:bg-white/5 sm:inline-flex"
            >
              Login
            </button>
            <AtlasButton onClick={() => navigate('/signup')} showIcon={false} className="min-h-9 rounded-xl px-4 py-2 text-xs">
              get started
            </AtlasButton>
          </div>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-5 pb-16 pt-8">
        <AtlasCard className="grid gap-8 p-7 md:grid-cols-[1.2fr_0.9fr] md:p-10 lg:p-12">
          <div className="flex flex-col justify-between gap-10">
            <div>
              <h1 className="max-w-2xl text-4xl font-black leading-[0.98] text-white md:text-6xl">
                Built on Skills, Driven by Collaboration
              </h1>
              <p className="mt-5 max-w-xl text-lg font-extrabold leading-snug text-[#d7d7d7]">
                Skip the noise, verify talent, find your crew, and ship projects that matter
              </p>
            </div>
            <AtlasButton onClick={() => navigate('/signup')} className="w-fit px-8">
              Build Together
            </AtlasButton>
          </div>
          <PatternArt className="min-h-72 md:min-h-96" />
        </AtlasCard>
      </section>

      <section id="reviews" className="mx-auto max-w-4xl px-5 py-12">
        <AtlasCard className="mx-auto grid max-w-2xl grid-cols-1 gap-4 p-5 sm:grid-cols-3">
          {processCards.map(({ icon: Icon, title, copy, tone, active }) => (
            <article
              key={title}
              className={`min-h-48 rounded-2xl p-5 text-center shadow-[0_12px_24px_rgba(0,0,0,0.24)] ${tone} ${active ? 'scale-105 shadow-[#3fbe8c]/20' : ''}`}
            >
              <Icon className="mx-auto mb-4 h-9 w-9 text-white" />
              <h2 className="text-xl font-black leading-none text-white">{title}</h2>
              <p className="mt-5 text-[10px] font-semibold leading-relaxed text-white/70">{copy}</p>
            </article>
          ))}
          <div className="col-span-full flex justify-center gap-1 pt-1">
            {[0, 1, 2].map((dot) => (
              <span key={dot} className={`h-1.5 w-1.5 rounded-full ${dot === 1 ? 'bg-white' : 'bg-white/30'}`} />
            ))}
          </div>
        </AtlasCard>
      </section>

      <section id="discover" className="mx-auto max-w-6xl px-5 py-16">
        <h2 className="mb-10 text-3xl font-black">How it works?</h2>
        <div className="grid gap-7 md:grid-cols-3">
          {steps.map(({ icon: Icon, title, bg, dark }) => (
            <article key={title} className="text-center">
              <div className={`flex aspect-[16/9] items-center justify-center rounded-sm ${bg}`}>
                <Icon className={`h-16 w-16 ${dark ? 'text-[#1e1e1e]' : 'text-white'}`} />
              </div>
              <h3 className="mt-5 text-xs font-black">{title}</h3>
            </article>
          ))}
        </div>
      </section>

      <section id="about" className="mx-auto max-w-6xl px-5 py-16">
        <h2 className="mb-10 text-3xl font-black">Features</h2>
        <div className="grid gap-8 md:grid-cols-3">
          {features.map((feature) => (
            <article key={feature.title} className="rounded-2xl bg-[#2c2c2c] p-4 shadow-[8px_10px_0_rgba(0,0,0,0.18)]">
              <FeatureVisual type={feature.visual} />
              <h3 className="mt-5 text-sm font-black">{feature.title}</h3>
              <p className="mt-2 text-[11px] font-semibold leading-relaxed text-[#bdbdbd]">{feature.copy}</p>
            </article>
          ))}
        </div>
      </section>

      <footer className="mx-auto max-w-7xl px-5 pb-5 pt-16">
        <div className="rounded-xl bg-[#2b2b2b] px-6 py-5">
          <div className="flex flex-col justify-between gap-5 border-b border-white/25 pb-4 md:flex-row md:items-center">
            <div className="flex items-center gap-4">
              <span className="text-xs font-black">Follow us</span>
              <Github className="h-4 w-4 text-[#d7d7d7]" />
              <Instagram className="h-4 w-4 text-[#d7d7d7]" />
              <Linkedin className="h-4 w-4 text-[#d7d7d7]" />
              <ShieldCheck className="h-4 w-4 text-[#d7d7d7]" />
            </div>
            <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs font-bold text-white">
              <a href="#about">Terms of Services</a>
              <a href="#about">Privacy Policy</a>
              <a href="#about">Accessibility</a>
              <a href="#about">Cookie Settings</a>
              <a href="#about">Legal Notice</a>
              <a href="#about">FAQ</a>
            </div>
          </div>
          <div className="flex items-center justify-between pt-4 text-xs font-bold text-white">
            <span>(c) 2026 Agile Atlas</span>
            <Lock className="h-4 w-4 text-[#3fbe8c]" />
          </div>
        </div>
      </footer>
    </main>
  );
}
