import React from 'react';

export default function SocialButton({ icon, text, onClick }) {
    return (
        <button onClick={onClick} className="w-full bg-[#303030] rounded-xl p-3 flex items-center justify-center text-white font-semibold hover:bg-zinc-700 transition-colors">
            {icon}
            <span className="ml-3">{text}</span>
        </button>
    );
}