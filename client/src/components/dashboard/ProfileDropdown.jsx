import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

export default function ProfileDropdown() {
    const [isOpen, setIsOpen] = useState(false);
    const { logout, user } = useAuth();
    const name = user?.fullName || user?.name || 'Builder';
    const avatar = user?.avatar || name.split(' ').map((part) => part[0]).join('').slice(0, 2).toUpperCase();

    return (
        <div className="relative">
            <button onClick={() => setIsOpen(!isOpen)} className="flex h-10 w-10 items-center justify-center rounded-full bg-[#303030] hover:bg-[#3a3a3a]">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#3fbe8c] text-xs font-black text-[#111]">{avatar}</div>
            </button>
            {isOpen && (
                <div className="absolute right-0 z-50 mt-2 w-52 rounded-2xl border border-white/10 bg-[#303030] py-2 shadow-xl">
                    <div className="border-b border-white/10 px-4 py-3">
                        <p className="text-sm font-black text-white">{name}</p>
                        <p className="text-xs font-semibold text-[#999]">{user?.role || 'Collaborator'}</p>
                    </div>
                    <Link to="/dashboard/settings" onClick={() => setIsOpen(false)} className="block w-full px-4 py-2 text-left text-sm font-bold text-white hover:bg-[#3a3a3a]">Settings</Link>
                    <Link to="/profile/edit" onClick={() => setIsOpen(false)} className="block px-4 py-2 text-sm font-bold text-white hover:bg-[#3a3a3a]">Edit profile</Link>
                    <button onClick={logout} className="block w-full px-4 py-2 text-left text-sm font-bold text-white hover:bg-[#3a3a3a]">Logout</button>
                </div>
            )}
        </div>
    );
}
