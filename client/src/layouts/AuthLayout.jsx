import React from 'react';
import { Outlet } from 'react-router-dom';
import { PatternArt } from '../components/common/AgileUI';

export default function AuthLayout({ children }) {
    return (
        <main className="min-h-screen bg-[#1f1f1f] px-5 py-7 text-white">
            <div className="mx-auto grid min-h-[calc(100vh-3.5rem)] max-w-7xl items-center gap-12 lg:grid-cols-[1fr_0.95fr]">
                <section className="mx-auto w-full max-w-2xl py-10 lg:py-0">
                    {children || <Outlet />}
                </section>
                <PatternArt variant="portrait" className="hidden aspect-square max-h-[760px] w-full lg:block" />
            </div>
        </main>
    );
}
