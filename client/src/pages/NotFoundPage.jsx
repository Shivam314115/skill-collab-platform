import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { BrandLockup, PageFrame, PatternArt } from '../components/common/AgileUI';

export default function NotFoundPage() {
  return (
    <PageFrame className="flex items-center justify-center p-5">
      <div className="grid w-full max-w-6xl items-center gap-10 lg:grid-cols-[1fr_0.85fr]">
        <section>
          <BrandLockup size="md" className="mb-12" />
          <p className="text-sm font-black uppercase tracking-[0.18em] text-[#3fbe8c]">404</p>
          <h1 className="mt-4 text-5xl font-black leading-none text-white md:text-7xl">Page Not Found</h1>
          <p className="mt-5 max-w-lg text-lg font-semibold leading-relaxed text-[#aaa]">
            The page you are looking for does not exist or has been moved.
          </p>
          <Link
            to="/"
            className="mt-8 inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-[#3fbe8c] px-5 py-2.5 text-sm font-extrabold text-[#111] transition hover:bg-[#62d4a5]"
          >
            <ArrowLeft className="h-4 w-4" />
            Go Back Home
          </Link>
        </section>
        <PatternArt className="hidden aspect-square lg:block" />
      </div>
    </PageFrame>
  );
}
