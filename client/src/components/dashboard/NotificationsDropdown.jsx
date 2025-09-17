import React from 'react';
import { mockNotifications } from '../../api/mockData';

export default function NotificationsDropdown({ setIsOpen }) {
    return (
        <div className="absolute right-0 mt-2 w-72 bg-[#303030] rounded-lg shadow-lg py-1 z-50">
            <div className="px-4 py-2 border-b border-zinc-600">
                <p className="text-sm font-semibold text-white">Notifications</p>
            </div>
            <div className="max-h-60 overflow-y-auto">
                {mockNotifications.map(notif => (
                    <div key={notif.id} className="px-4 py-3 text-sm text-gray-200 hover:bg-zinc-700 border-b border-zinc-700/50">
                        {notif.text}
                    </div>
                ))}
            </div>
        </div>
    );
}