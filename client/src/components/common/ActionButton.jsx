import React from 'react';

export default function ActionButton({ text, type = 'button' }) {
    return (
        <div className="flex justify-center">
            <button type={type} className="w-full md:w-80 bg-[#36B083] rounded-2xl py-2.5 text-zinc-900 font-bold text-lg shadow-inner shadow-black/20 hover:bg-green-500 transition-colors">
                {text}
            </button>
        </div>
    );
}