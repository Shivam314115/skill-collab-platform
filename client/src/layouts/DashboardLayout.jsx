import React, { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import TopBar from './TopBar';

export default function DashboardLayout() {
    const location = useLocation();
    const [pageTitle, setPageTitle] = useState("Dashboard");
    const [searchQuery, setSearchQuery] = useState("");
    const [isNotifOpen, setIsNotifOpen] = useState(false);

    useEffect(() => {
        const pathParts = location.pathname.split('/');
        const currentPath = pathParts[2] || 'dashboard';
        const title = currentPath.charAt(0).toUpperCase() + currentPath.slice(1);
        setPageTitle(title);
        if (currentPath !== 'discover') {
            setSearchQuery("");
        }
    }, [location]);

    return (
        <div className="flex h-screen bg-[#2C2C2C] text-white">
            <Sidebar />
            <main className="flex-1 flex flex-col">
                <TopBar
                    title={pageTitle}
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                    setIsNotifOpen={setIsNotifOpen}
                    isNotifOpen={isNotifOpen}
                />
                <div className="flex-1 overflow-y-auto">
                    <Outlet context={{ searchQuery }} />
                </div>
            </main>
        </div>
    );
}