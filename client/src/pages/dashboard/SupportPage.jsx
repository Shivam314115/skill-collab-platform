import React, { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import FormInput from '../../components/common/FormInput';

export default function SettingsPage() {
    const [activeTab, setActiveTab] = useState('profile');
    const tabs = ['profile', 'account', 'notifications'];
    const { user } = useAuth();
    
    const renderContent = () => {
        switch (activeTab) {
            case 'profile':
                return (
                    <div>
                        <h2 className="text-2xl font-bold text-white mb-6">Profile Settings</h2>
                        <div className="space-y-6">
                            <FormInput label="Full Name" type="text" name="name" defaultValue={user.name} />
                            <FormInput label="Role / Title" type="text" name="role" defaultValue={user.role} />
                            <div>
                                <label className="text-white text-opacity-90 font-semibold mb-2 block">Bio</label>
                                <textarea rows="4" className="w-full bg-[#303030] rounded-xl p-3 text-gray-300 focus:outline-none focus:ring-2 focus:ring-[#36B083]" defaultValue={user.bio}></textarea>
                            </div>
                            <button className="bg-[#36B083] text-zinc-900 font-bold py-2 px-6 rounded-lg hover:bg-green-500 transition-colors">Save Changes</button>
                        </div>
                    </div>
                );
            case 'account':
                return (
                    <div>
                        <h2 className="text-2xl font-bold text-white mb-6">Account Settings</h2>
                        <div className="space-y-6">
                           <FormInput label="Email Address" type="email" name="email" defaultValue={`${user.name.split(' ')[0].toLowerCase()}@example.com`} />
                           <button className="bg-zinc-700 font-semibold py-2 px-4 rounded-lg hover:bg-zinc-600">Change Password</button>
                        </div>
                    </div>
                );
            case 'notifications':
                return (
                    <div>
                        <h2 className="text-2xl font-bold text-white mb-6">Notification Settings</h2>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between p-4 bg-[#303030] rounded-lg">
                                <p>Email me for new messages</p>
                                <input type="checkbox" className="h-5 w-5 rounded-sm bg-zinc-600 border-zinc-500 text-green-500 focus:ring-green-600" defaultChecked />
                            </div>
                            <div className="flex items-center justify-between p-4 bg-[#303030] rounded-lg">
                                <p>Email me for project invites</p>
                                <input type="checkbox" className="h-5 w-5 rounded-sm bg-zinc-600 border-zinc-500 text-green-500 focus:ring-green-600" defaultChecked />
                            </div>
                        </div>
                    </div>
                );
            default: return null;
        }
    }

    return (
        <div className="p-8">
            <div className="flex flex-col md:flex-row gap-8 bg-[#212121] rounded-lg border border-zinc-700 p-6">
                <div className="md:w-1/4">
                    <h2 className="font-bold text-xl text-white mb-4">Settings</h2>
                    <nav className="space-y-1">
                        {tabs.map(tab => (
                            <button key={tab} onClick={() => setActiveTab(tab)} className={`w-full text-left px-4 py-2 rounded-lg font-semibold ${activeTab === tab ? 'bg-zinc-700 text-white' : 'text-gray-400 hover:bg-zinc-800 hover:text-white'}`}>
                                {tab.charAt(0).toUpperCase() + tab.slice(1)}
                            </button>
                        ))}
                    </nav>
                </div>
                <div className="flex-1 border-t md:border-t-0 md:border-l border-zinc-700 md:pl-8 pt-6 md:pt-0">
                    {renderContent()}
                </div>
            </div>
        </div>
    );
}