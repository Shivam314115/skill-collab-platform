import React from 'react';

export default function FormInput({ label, type, name, placeholder, value, onChange, error, containerClassName = '' }) {
    return (
        <div className={containerClassName}>
            {label && <label className="text-white text-opacity-90 font-semibold mb-2 block">{label}</label>}
            <input
                type={type}
                name={name}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                className={`w-full bg-[#303030] rounded-xl p-3 text-gray-300 placeholder-gray-500/50 focus:outline-none focus:ring-2 ${error ? 'ring-2 ring-red-500' : 'focus:ring-[#36B083]'}`}
            />
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        </div>
    );
}