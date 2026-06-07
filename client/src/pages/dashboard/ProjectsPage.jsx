import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Briefcase, DollarSign, Filter, Search, UserCheck } from 'lucide-react';
import { getAllProjects } from '../../lib/api';
import { AtlasButton, AtlasCard, AtlasTag, PageFrame, PageHeader } from '../../components/common/AgileUI';

const mockProjects = [
  { id: 1, name: 'AI-Powered Web App', progress: 78, status: 'Active', members: 4, budget: 25000, type: 'Full-Stack Development', requiredSkills: ['React', 'Python', 'Machine Learning'], skillsVerified: 85 },
  { id: 2, name: 'Mobile E-commerce Platform', progress: 45, status: 'Recruiting', members: 2, budget: 18000, type: 'Mobile Development', requiredSkills: ['React Native', 'Node.js', 'MongoDB'], skillsVerified: 60 },
  { id: 3, name: 'Blockchain Voting System', progress: 92, status: 'Active', members: 6, budget: 42000, type: 'Blockchain', requiredSkills: ['Solidity', 'Web3', 'Security'], skillsVerified: 95 },
  { id: 4, name: 'Data Analytics Dashboard', progress: 60, status: 'Active', members: 3, budget: 30000, type: 'Data Science', requiredSkills: ['D3.js', 'PostgreSQL', 'ETL'], skillsVerified: 75 },
];

const mapProject = (project) => ({
  id: project.id,
  name: project.title || project.name,
  progress: project.progress ?? Math.floor(Math.random() * 40 + 40),
  status: project.status === 'SEEKING_COLLABORATORS' ? 'Recruiting' : project.status || 'Active',
  members: project.collaboratorIds?.size ?? project.collaboratorIds?.length ?? project.members ?? 1,
  budget: project.budget ?? 20000,
  type: project.category || project.type || 'Development',
  requiredSkills: project.requiredSkills ? [...project.requiredSkills] : [],
  skillsVerified: project.skillsVerified ?? 70,
});

function ProjectCard({ project, onClick }) {
  return (
    <button type="button" onClick={onClick} className="group h-full text-left">
      <AtlasCard className="flex h-full flex-col p-5 transition group-hover:-translate-y-1 group-hover:bg-[#303030]">
        <div className="mb-5 flex items-start justify-between gap-4">
          <div className="flex min-w-0 items-center gap-3">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#3fbe8c] text-sm font-black text-[#111]">
              {project.name.split(' ').map((word) => word[0]).join('').slice(0, 2)}
            </div>
            <div className="min-w-0">
              <h3 className="truncate text-lg font-black text-white">{project.name}</h3>
              <p className="truncate text-xs font-bold text-[#999]">{project.type} - {project.members} collaborators</p>
            </div>
          </div>
          <AtlasTag className={project.status === 'Active' ? '' : 'bg-[#463119] text-[#f2b35d]'}>
            {project.status}
          </AtlasTag>
        </div>

        <div className="mb-5">
          <div className="mb-2 flex justify-between text-xs font-black text-[#a9a9a9]">
            <span>Build progress</span>
            <span>{project.progress}%</span>
          </div>
          <div className="h-2 rounded-full bg-[#3a3a3a]">
            <div className="h-2 rounded-full bg-[#3fbe8c]" style={{ width: `${project.progress}%` }} />
          </div>
        </div>

        <div className="mb-6 flex flex-wrap gap-2">
          {(project.requiredSkills || []).slice(0, 4).map((skill) => (
            <AtlasTag key={skill}>{skill}</AtlasTag>
          ))}
          {(!project.requiredSkills || project.requiredSkills.length === 0) ? <AtlasTag>Open skill brief</AtlasTag> : null}
        </div>

        <div className="mt-auto grid grid-cols-2 gap-3 border-t border-white/10 pt-4 text-xs font-bold text-[#a6a6a6]">
          <span className="flex items-center gap-1">
            <DollarSign className="h-4 w-4 text-[#3fbe8c]" />
            ${(project.budget / 1000).toFixed(0)}K budget
          </span>
          <span className="flex items-center gap-1 justify-self-end text-[#67dba9]">
            <UserCheck className="h-4 w-4" />
            {project.skillsVerified}% verified
          </span>
        </div>
      </AtlasCard>
    </button>
  );
}

export default function ProjectsPage() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [projects, setProjects] = useState(mockProjects);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      try {
        const data = await getAllProjects();
        if (!mounted) return;
        if (data?.length) setProjects(data.map(mapProject));
      } catch (error) {
        console.error('Failed to load projects, using sample data:', error);
      } finally {
        if (mounted) setLoading(false);
      }
    };
    load();
    return () => {
      mounted = false;
    };
  }, []);

  const filteredProjects = useMemo(
    () => projects.filter((project) => project.name.toLowerCase().includes(searchQuery.toLowerCase())),
    [projects, searchQuery]
  );

  return (
    <PageFrame className="p-4 md:p-7">
      <PageHeader
        eyebrow="Discover builds"
        title="Projects"
        description="Browse active collaboration rooms, skill briefs, and launch-ready teams."
      >
        <div className="relative w-full sm:w-80">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#777]" />
          <input
            type="text"
            placeholder="Search projects"
            className="atlas-input pl-11"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <AtlasButton variant="ghost" showIcon icon={Filter}>
          Filter
        </AtlasButton>
      </PageHeader>

      {loading ? <div className="py-12 text-center font-bold text-[#999]">Loading projects...</div> : null}

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
        {filteredProjects.map((project) => (
          <ProjectCard key={project.id} project={project} onClick={() => navigate(`/dashboard/projects/${project.id}`)} />
        ))}
      </div>

      {!loading && filteredProjects.length === 0 ? (
        <AtlasCard className="mt-8 p-10 text-center">
          <Briefcase className="mx-auto mb-4 h-10 w-10 text-[#3fbe8c]" />
          <p className="text-lg font-black">No projects found.</p>
          <p className="mt-2 text-sm font-semibold text-[#999]">Try adjusting your search query.</p>
        </AtlasCard>
      ) : null}
    </PageFrame>
  );
}
