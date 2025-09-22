import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { HomeIcon, ProjectsIcon, DiscoverIcon, ChatIcon, SupportIcon, SettingsIcon } from '../components/Icons';

export default function Sidebar() {
    const navItemClasses = "flex items-center justify-center w-12 h-12 my-1 rounded-lg transition-colors";
    const activeClasses = "bg-zinc-700 text-white";
    const inactiveClasses = "text-gray-400 hover:bg-zinc-800 hover:text-white";

    return (
        <aside className="w-20 bg-[#212121] p-4 flex flex-col items-center justify-between">
            <div>
                <Link to="/dashboard" className="mb-8 block">
                    <div className="w-12 h-12 bg-gray-200 rounded-full relative"><div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-zinc-900 rounded-full w-5 h-6"></div></div>
                </Link>
                <nav className="flex flex-col items-center space-y-2">
                    <NavLink to="/dashboard" end title="Dashboard" className={({ isActive }) => `${navItemClasses} ${isActive ? activeClasses : inactiveClasses}`}><HomeIcon /></NavLink>
                    <NavLink to="/dashboard/projects" title="Projects" className={({ isActive }) => `${navItemClasses} ${isActive ? activeClasses : inactiveClasses}`}><ProjectsIcon /></NavLink>
                    <NavLink to="/dashboard/discover" title="Discover" className={({ isActive }) => `${navItemClasses} ${isActive ? activeClasses : inactiveClasses}`}><DiscoverIcon /></NavLink>
                    <NavLink to="/dashboard/chat" title="Chat" className={({ isActive }) => `${navItemClasses} ${isActive ? activeClasses : inactiveClasses}`}><ChatIcon /></NavLink>
                </nav>
            </div>
            <div className="flex flex-col items-center space-y-2">
                <Link to="/dashboard/support" title="Support" className={`${navItemClasses} ${inactiveClasses}`}><SupportIcon /></Link>
                <Link to="/dashboard/settings" title="Settings" className={`${navItemClasses} ${inactiveClasses}`}><SettingsIcon /></Link>
            </div>
        </aside>
    );
}