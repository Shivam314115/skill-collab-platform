import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

export default function ProfileDropdown() {
    const [isOpen, setIsOpen] = useState(false);
    const { logout, user } = useAuth();

    return (
        <div className="relative">
            <button onClick={() => setIsOpen(!isOpen)} className="w-10 h-10 bg-[#2C2C2C] rounded-full flex items-center justify-center hover:bg-zinc-700">
                <div className="w-8 h-8 rounded-full bg-zinc-600 flex items-center justify-center text-white font-bold">{user.avatar}</div>
            </button>
            {isOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-[#303030] rounded-lg shadow-lg py-1 z-50">
                    <div className="px-4 py-2 border-b border-zinc-600">
                        <p className="text-sm font-semibold text-white">{user.name}</p>
                        <p className="text-xs text-gray-400">{user.role}</p>
                    </div>
                    <Link to="/dashboard/settings" onClick={() => setIsOpen(false)} className="block w-full text-left px-4 py-2 text-sm text-white hover:bg-zinc-700">Settings</Link>
                    <button onClick={logout} className="block w-full text-left px-4 py-2 text-sm text-white hover:bg-zinc-700">Logout</button>
                </div>
            )}
        </div>
    );
}