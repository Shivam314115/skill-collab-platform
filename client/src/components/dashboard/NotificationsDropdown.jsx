import React, { useEffect, useState } from 'react';
import { getUserNotifications } from '../../lib/api';
import { useAuth } from '../../hooks/useAuth';

export default function NotificationsDropdown({ setIsOpen }) {
    const { currentUser } = useAuth();
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let mounted = true;
        const fetchNotifications = async () => {
            if (!currentUser?.id) return;
            try {
                setLoading(true);
                const data = await getUserNotifications(currentUser.id);
                if (mounted && data) {
                    setNotifications(data);
                }
            } catch (error) {
                console.error('Failed to fetch notifications:', error);
            } finally {
                if (mounted) setLoading(false);
            }
        };

        fetchNotifications();
        return () => {
            mounted = false;
        };
    }, [currentUser?.id]);

    return (
        <div className="absolute right-0 mt-2 w-72 bg-[#303030] rounded-lg shadow-lg py-1 z-50">
            <div className="px-4 py-2 border-b border-zinc-600">
                <p className="text-sm font-semibold text-white">Notifications</p>
            </div>
            <div className="max-h-60 overflow-y-auto">
                {loading ? (
                    <div className="px-4 py-3 text-sm text-gray-400">Loading...</div>
                ) : notifications.length > 0 ? (
                    notifications.map(notif => (
                        <div key={notif.id} className="px-4 py-3 text-sm text-gray-200 hover:bg-zinc-700 border-b border-zinc-700/50">
                            {notif.message || notif.text || 'Notification received'}
                        </div>
                    ))
                ) : (
                    <div className="px-4 py-3 text-sm text-gray-400">No new notifications</div>
                )}
            </div>
        </div>
    );
}
