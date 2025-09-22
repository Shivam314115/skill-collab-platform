import React from 'react';
import { Link } from 'react-router-dom';
import { mockProjects, mockUsers } from '../../api/mockData';

export default function ProjectsPage() {
    return (
        <div className="p-8">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-white">Projects</h1>
                <button className="bg-[#36B083] text-zinc-900 font-bold py-2 px-4 rounded-lg hover:bg-green-500 transition-colors">Create New Project</button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {mockProjects.map(p => (
                    <Link to={`/dashboard/projects/${p.id}`} key={p.id} className="block bg-[#212121] p-6 rounded-lg hover:scale-105 transition-transform">
                        <h3 className="text-xl font-bold text-white">{p.name}</h3>
                        <p className="text-gray-400 mt-2 text-sm">{p.description}</p>
                        <div className="flex items-center -space-x-2 mt-4">
                            {p.members.map(id => <div key={id} className="w-8 h-8 rounded-full bg-zinc-600 flex items-center justify-center text-white font-bold ring-2 ring-[#212121]">{mockUsers.find(u => u.id === id).avatar}</div>)}
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}