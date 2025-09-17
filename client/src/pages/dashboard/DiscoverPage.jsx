import React from 'react';
import { useOutletContext } from 'react-router-dom';
import { mockProjects } from '../../api/mockData';
import ProjectCard from '../../components/dashboard/ProjectCard';

export default function DiscoverPage() {
    const { searchQuery } = useOutletContext();
    
    const filteredProjects = mockProjects.filter(project =>
        project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    return (
        <div className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredProjects.map(project => (
                    <ProjectCard key={project.id} project={project} />
                ))}
            </div>
        </div>
    );
}