import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../components/common/Logo';

export default function NotFoundPage() {
    return (
        <main className="bg-[#212121] min-h-screen flex flex-col items-center justify-center text-white text-center p-8">
            <Logo size="large" />
            <h1 className="text-6xl md:text-9xl font-bold text-gray-400 mt-12">404</h1>
            <h2 className="text-2xl md:text-4xl font-semibold mt-4">Page Not Found</h2>
            <p className="text-gray-300 mt-2 max-w-md">
                Sorry, the page you are looking for does not exist or has been moved.
            </p>
            <Link 
                to="/" 
                className="mt-8 bg-[#36B083] text-zinc-900 font-bold py-3 px-6 rounded-lg hover:bg-green-500 transition-colors"
            >
                &larr; Go Back Home
            </Link>
        </main>
    );
}