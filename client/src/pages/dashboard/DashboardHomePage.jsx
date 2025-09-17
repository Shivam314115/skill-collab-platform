import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { mockProjects, mockTasks, mockTimeline } from '../../api/mockData';
import { PlusIcon, DiscoverIcon } from '../../components/Icons';

export default function DashboardHomePage() {
    const { user } = useAuth();

    return (
        <div className="p-8 space-y-8">
            <div className="bg-[#212121] p-6 rounded-2xl border border-zinc-700">
                <h1 className="text-3xl font-bold">Welcome back, {user.name.split(' ')[0]}!</h1>
                <p className="text-gray-400 mt-1">Ready to build something amazing today?</p>
                <div className="flex gap-4 mt-4">
                    <button className="flex items-center gap-2 bg-[#36B083] text-zinc-900 font-bold py-2 px-4 rounded-lg hover:bg-green-500 transition-colors">
                        <PlusIcon/> Create Project
                    </button>
                    <Link to="/dashboard/discover" className="flex items-center gap-2 bg-zinc-700 font-semibold py-2 px-4 rounded-lg hover:bg-zinc-600 transition-colors">
                        <DiscoverIcon/> Discover
                    </Link>
                </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                    <div className="bg-[#212121] p-6 rounded-2xl">
                        <h2 className="text-xl font-bold text-white mb-4">Ongoing Projects</h2>
                        <div className="space-y-3">
                            {mockProjects.filter(p => p.members.includes(user.id) && p.status === 'Ongoing').map(project => (
                                <Link to={`/dashboard/projects/${project.id}`} key={project.id} className="block bg-white/10 p-4 rounded-lg cursor-pointer hover:bg-white/20 transition-transform hover:scale-[1.02]">
                                   <p className="font-semibold text-white">{project.name}</p>
                                </Link>
                            ))}
                        </div>
                    </div>
                    <div className="bg-[#212121] p-6 rounded-2xl">
                        <h2 className="text-xl font-bold text-white mb-4">My Tasks</h2>
                        <div className="space-y-3">
                            {mockTasks.filter(t => t.user === user.id).map(task => (
                                <div key={task.id} className="bg-white/10 p-4 rounded-lg flex justify-between items-center">
                                    <div className="flex items-center gap-3">
                                        <input type="checkbox" defaultChecked={task.completed} className="h-5 w-5 rounded-sm bg-zinc-600 border-zinc-500 text-green-500 focus:ring-green-600" />
                                        <p className={`text-white ${task.completed ? 'line-through text-gray-400' : ''}`}>{task.text}</p>
                                    </div>
                                    <Link to={`/dashboard/projects/${task.projectId}`} className="text-xs text-gray-300 bg-zinc-600 px-2 py-1 rounded-full hover:underline">{task.project}</Link>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="lg:col-span-1">
                    <div className="bg-[#212121] p-6 rounded-2xl h-full">
                        <h2 className="text-xl font-bold text-white mb-4">Timeline Activities</h2>
                        <div className="space-y-4">
                            {mockTimeline.map(item => (
                                <div key={item.id} className="border-b border-white/10 pb-3 last:border-b-0">
                                    <p className="text-sm text-white">
                                        <span className="font-bold">{item.user}</span> {item.action} <span className="font-bold">{item.target}</span>
                                    </p>
                                    <p className="text-xs text-gray-300 mt-1">{item.time}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}