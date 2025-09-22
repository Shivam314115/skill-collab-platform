import React from 'react';
import { Outlet } from 'react-router-dom';

export default function AuthLayout() {
    return (
        <main className="bg-[#212121] min-h-screen font-sans flex flex-col lg:flex-row items-center justify-center relative">
            <div className="w-full max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-center p-4">
                <Outlet />
                <div className="hidden lg:block lg:w-1/2 p-8">
                    <img src="https://placehold.co/563x743/36B083/212121?text=AgileAtlas" alt="Agile Atlas" className="rounded-3xl object-cover w-full h-full" />
                </div>
            </div>
        </main>
    );
}