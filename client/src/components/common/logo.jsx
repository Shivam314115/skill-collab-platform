import React from 'react';
import { Link } from 'react-router-dom';

export default function Logo({ size = 'large' }) {
    return (
        <div className="flex items-center">
            <Link to="/" className="flex items-center cursor-pointer">
                <div className="relative">
                    <div className={`bg-gray-200 rounded-full ${size === 'large' ? 'w-20 h-20 md:w-28 md:h-28' : 'w-16 h-16'}`}></div>
                    <div className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-zinc-900 rounded-full ${size === 'large' ? 'w-8 h-10 md:w-10 md:h-12' : 'w-6 h-8'}`}></div>
                </div>
                <h1 className={`font-bold text-white ml-4 font-poppins ${size === 'large' ? 'text-4xl md:text-6xl' : 'text-3xl'}`}>AgileAtlas</h1>
            </Link>
        </div>
    );
}