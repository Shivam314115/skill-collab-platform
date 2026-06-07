import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export function BrandMark({ size = 'md', className = '' }) {
  const sizes = {
    sm: 'h-7 w-7',
    md: 'h-10 w-10',
    lg: 'h-16 w-16',
    xl: 'h-28 w-28',
  };

  return (
    <span
      className={`relative inline-flex shrink-0 items-center justify-center rounded-full bg-[#e8e8e8] ${sizes[size] || sizes.md} ${className}`}
      aria-hidden="true"
    >
      <span className="absolute h-[44%] w-[34%] rounded-full bg-[#1f1f1f]" />
    </span>
  );
}

export function BrandLockup({ size = 'md', to = '/', className = '' }) {
  const textSizes = {
    sm: 'text-sm',
    md: 'text-lg',
    lg: 'text-3xl',
    xl: 'text-6xl',
  };

  const markSize = size === 'xl' ? 'xl' : size === 'lg' ? 'lg' : size === 'sm' ? 'sm' : 'md';
  const content = (
    <>
      <BrandMark size={markSize} />
      <span className={`font-black tracking-normal text-white ${textSizes[size] || textSizes.md}`}>
        AgileAtlas
      </span>
    </>
  );

  if (!to) {
    return <div className={`inline-flex items-center gap-3 ${className}`}>{content}</div>;
  }

  return (
    <Link to={to} className={`inline-flex items-center gap-3 ${className}`}>
      {content}
    </Link>
  );
}

export function PatternArt({ variant = 'pattern', className = '' }) {
  const src = variant === 'portrait' ? '/images/agile-portrait.png' : '/images/agile-pattern.png';
  const alt = variant === 'portrait' ? 'Green geometric professional portrait' : 'Green geometric collaboration pattern';

  return (
    <div className={`overflow-hidden rounded-[2rem] bg-[#2d2d2d] ${className}`}>
      <img src={src} alt={alt} className="h-full w-full object-cover" />
    </div>
  );
}

export function AtlasButton({
  children,
  className = '',
  variant = 'primary',
  icon: Icon = ArrowRight,
  showIcon = true,
  ...props
}) {
  const variants = {
    primary: 'bg-[#3fbe8c] text-[#111] hover:bg-[#62d4a5] shadow-[inset_0_-2px_0_rgba(0,0,0,0.18)]',
    ghost: 'bg-[#303030] text-white hover:bg-[#3a3a3a] border border-white/5',
    outline: 'bg-transparent text-white hover:bg-white/5 border border-white/15',
  };

  return (
    <button
      className={`inline-flex min-h-11 items-center justify-center gap-2 rounded-xl px-5 py-2.5 text-sm font-extrabold transition focus:outline-none focus:ring-2 focus:ring-[#3fbe8c]/70 disabled:cursor-not-allowed disabled:opacity-60 ${variants[variant] || variants.primary} ${className}`}
      {...props}
    >
      <span>{children}</span>
      {showIcon && Icon ? <Icon className="h-4 w-4" /> : null}
    </button>
  );
}

export function AtlasCard({ children, className = '' }) {
  return (
    <section className={`rounded-2xl border border-white/5 bg-[#2b2b2b] shadow-[0_18px_42px_rgba(0,0,0,0.22)] ${className}`}>
      {children}
    </section>
  );
}

export function PageFrame({ children, className = '' }) {
  return (
    <main className={`min-h-screen bg-[#1f1f1f] text-white ${className}`}>
      {children}
    </main>
  );
}

export function PageHeader({ eyebrow, title, description, children, className = '' }) {
  return (
    <div className={`mb-8 flex flex-col gap-5 rounded-2xl border border-white/5 bg-[#292929] p-6 md:flex-row md:items-end md:justify-between ${className}`}>
      <div>
        {eyebrow ? <p className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-[#49c795]">{eyebrow}</p> : null}
        <h1 className="text-3xl font-black leading-tight text-white md:text-4xl">{title}</h1>
        {description ? <p className="mt-2 max-w-2xl text-sm font-medium text-[#a6a6a6] md:text-base">{description}</p> : null}
      </div>
      {children ? <div className="flex shrink-0 flex-wrap items-center gap-3">{children}</div> : null}
    </div>
  );
}

export function AtlasInput({ className = '', ...props }) {
  return (
    <input
      className={`w-full rounded-xl border border-white/5 bg-[#303030] px-4 py-3 text-sm font-semibold text-white outline-none placeholder:text-[#6d6d6d] focus:border-[#3fbe8c] focus:ring-2 focus:ring-[#3fbe8c]/20 ${className}`}
      {...props}
    />
  );
}

export function AtlasTag({ children, className = '' }) {
  return (
    <span className={`inline-flex items-center rounded-full bg-[#173d2d] px-3 py-1 text-xs font-extrabold text-[#67dba9] ${className}`}>
      {children}
    </span>
  );
}

export function StatPill({ label, value, className = '' }) {
  return (
    <div className={`rounded-2xl bg-[#242424] p-4 ${className}`}>
      <p className="text-2xl font-black text-white">{value}</p>
      <p className="mt-1 text-xs font-bold uppercase tracking-[0.12em] text-[#8d8d8d]">{label}</p>
    </div>
  );
}

export function AuthShell({ children, eyebrow = '', artVariant = 'portrait' }) {
  return (
    <main className="min-h-screen bg-[#1f1f1f] px-5 py-7 text-white">
      {eyebrow ? <p className="mx-auto max-w-7xl text-sm font-semibold text-[#747474]">{eyebrow}</p> : null}
      <div className="mx-auto grid min-h-[calc(100vh-5rem)] max-w-7xl items-center gap-12 lg:grid-cols-[1fr_0.95fr]">
        <section className="mx-auto w-full max-w-xl py-10 lg:py-0">
          {children}
        </section>
        <PatternArt variant={artVariant} className="hidden aspect-square max-h-[760px] w-full lg:block" />
      </div>
    </main>
  );
}
