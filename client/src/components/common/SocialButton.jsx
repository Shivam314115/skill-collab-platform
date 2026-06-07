import React from 'react';

export default function SocialButton({ icon, text, onClick }) {
    return (
        <button
            onClick={onClick}
            className="flex w-full items-center justify-center rounded-xl border border-white/5 bg-[#303030] p-3 font-extrabold text-white transition hover:bg-[#3a3a3a]"
        >
            {icon}
            <span className="ml-3">{text}</span>
        </button>
    );
}
