import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { mockProjects } from '../../api/mockData';

export default function ProjectDetailPage() {
    const { projectId } = useParams();
    const project = mockProjects.find(p => p.id === parseInt(projectId));

    // Handle case where project is not found
    if (!project) {
        return (
            <div className="p-8">
                <Link to="/dashboard/projects" className="text-gray-400 hover:text-white mb-4 inline-block">&larr; Back to Projects</Link>
                <h1 className="text-3xl font-bold text-white">Project Not Found</h1>
            </div>
        )
    }

    return (
        <div className="p-8">
            <Link to="/dashboard/projects" className="text-gray-400 hover:text-white mb-4 inline-block">&larr; Back to Projects</Link>
            <h1 className="text-3xl font-bold text-white">{project.name}</h1>
            <p className="text-gray-300 mt-2 max-w-2xl">{project.description}</p>
            <h2 className="text-2xl font-bold text-white mt-8 mb-4">Team Members</h2>
            {/* TODO: List members here */}
            <h2 className="text-2xl font-bold text-white mt-8 mb-4">Tasks</h2>
            {/* TODO: List tasks here */}
        </div>
    );
}