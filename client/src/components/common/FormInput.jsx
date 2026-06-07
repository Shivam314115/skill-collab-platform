import React from 'react';

export default function FormInput({
    label,
    type = 'text',
    name,
    placeholder,
    value,
    onChange,
    error,
    containerClassName = '',
    icon: Icon,
    ...props
}) {
    return (
        <div className={containerClassName}>
            {label && <label className="atlas-label">{label}</label>}
            <div className="relative">
                {Icon ? <Icon className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#777]" /> : null}
                <input
                    type={type}
                    name={name}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    className={`atlas-input ${Icon ? 'pl-11' : ''} ${error ? 'border-red-500 ring-2 ring-red-500/20' : ''}`}
                    {...props}
                />
            </div>
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        </div>
    );
}
