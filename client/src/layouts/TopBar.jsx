import React from 'react';
import { SearchIcon, NotificationsIcon, MoonIcon } from '../components/Icons';
import ProfileDropdown from '../components/dashboard/ProfileDropdown';
import NotificationsDropdown from '../components/dashboard/NotificationsDropdown';

export default function TopBar({ title, searchQuery, setSearchQuery, setIsNotifOpen, isNotifOpen }) {
    return (
        <header className="flex items-center justify-between p-4 bg-[#212121] border-b border-zinc-700">
            <h1 className="text-2xl font-bold text-white">{title}</h1>
            <div className="flex items-center space-x-4">
                <div className="relative w-72">
                    <SearchIcon />
                    <input type="text" placeholder="Search Projects, Profiles etc..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full bg-[#2C2C2C] text-gray-300 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#36B083]" />
                </div>
                <div className="relative">
                    <button onClick={() => setIsNotifOpen(prev => !prev)} className="p-2 rounded-full hover:bg-zinc-700 relative">
                        <NotificationsIcon />
                        <span className="absolute top-1 right-1 block h-2.5 w-2.5 rounded-full bg-red-500 ring-2 ring-[#212121]"></span>
                    </button>
                    {isNotifOpen && <NotificationsDropdown setIsOpen={setIsNotifOpen} />}
                </div>
                <button className="p-2 rounded-full hover:bg-zinc-700" title="Toggle Theme"><MoonIcon /></button>
                <ProfileDropdown />
            </div>
        </header>
    );
}