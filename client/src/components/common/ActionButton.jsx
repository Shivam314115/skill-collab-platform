import React from 'react';

export default function ActionButton({
    text,
    type = 'button',
    icon: Icon,
    className = '',
    containerClassName = '',
    ...props
}) {
    return (
        <div className={`flex justify-center ${containerClassName}`}>
            <button
                type={type}
                className={`inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-[#3fbe8c] px-5 py-2.5 text-sm font-extrabold text-[#111] shadow-[inset_0_-2px_0_rgba(0,0,0,0.18)] transition hover:bg-[#62d4a5] focus:outline-none focus:ring-2 focus:ring-[#3fbe8c]/70 disabled:cursor-not-allowed disabled:opacity-60 md:w-80 ${className}`}
                {...props}
            >
                {Icon ? <Icon className="h-4 w-4" /> : null}
                {text}
            </button>
        </div>
    );
}
