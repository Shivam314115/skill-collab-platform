import React from 'react';
import { mockUsers } from '../../api/mockData';
import { HeartIcon, StarIcon } from '../Icons';

export default function ProjectCard({ project }) {
    const author = mockUsers.find(u => u.id === project.authorId);

    return (
        <div className="bg-[#212121] border border-zinc-700 rounded-lg overflow-hidden transition-transform hover:-translate-y-1">
            <div className="p-5">
                <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-zinc-600 flex-shrink-0 flex items-center justify-center text-white font-bold">{author.avatar}</div>
                    <div>
                        <h3 className="font-bold text-white text-lg leading-tight">{project.name}</h3>
                        <p className="text-sm text-gray-400">by {author.name}</p>
                    </div>
                </div>
                <p className="text-sm text-gray-300 mb-4 h-10 line-clamp-2">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.slice(0, 3).map(tag => (
                        <span key={tag} className="text-xs bg-zinc-700 px-2 py-1 rounded-full font-medium">{tag}</span>
                    ))}
                </div>
            </div>
            <div className="px-5 py-3 bg-[#2C2C2C] border-t border-zinc-700 flex justify-between items-center">
                <div className="flex items-center gap-4">
                    <button className="flex items-center gap-1.5 text-gray-400 hover:text-red-500 transition-colors"> <HeartIcon/> <span className="font-medium text-sm">{project.likes}</span> </button>
                    <div className="flex items-center gap-1.5 text-gray-400"> <StarIcon /> <span className="font-medium text-sm">{project.rating.toFixed(1)}</span> </div>
                </div>
                <button onClick={() => alert(`Requesting to join ${project.name}...`)} className="bg-[#36B083] text-zinc-900 font-bold py-1.5 px-4 rounded-lg hover:bg-green-500 text-sm transition-colors">
                    Request to Join
                </button>
            </div>
        </div>
    );
}